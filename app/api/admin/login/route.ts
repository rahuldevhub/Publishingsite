import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/admin-session";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit by IP: 5 attempts per 15 minutes
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(`login:${ip}`)) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { username, password } = body as {
      username?: string;
      password?: string;
    };

    if (!username?.trim() || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, username, name, password")
      .eq("username", username.trim())
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(admin.id, admin.name);
    return NextResponse.json({ success: true, name: admin.name });
  } catch (err) {
    console.error("[admin/login] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
