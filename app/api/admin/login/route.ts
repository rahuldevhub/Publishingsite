import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/admin-session";
import { anonymizeIp, getTrustedClientIp } from "@/lib/contact-security";

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 415 });
    }
    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > 4_096) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 413 });
    }
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > 4_096) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 413 });
    }
    const body = (() => {
      try {
        return JSON.parse(rawBody) as unknown;
      } catch {
        return null;
      }
    })();
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { username, password } = body as {
      username?: string;
      password?: string;
    };

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      username.length > 254 ||
      !password ||
      password.length > 256
    ) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const requestId = randomUUID();
    const ipHash = anonymizeIp(getTrustedClientIp(request.headers));
    const { data: allowed, error: rateError } = await supabase.rpc("check_admin_login_attempt", {
      p_ip_hash: ipHash,
      p_request_id: requestId,
    });
    if (rateError) {
      console.error("[admin/login] rate-limit gate failed", { requestId, code: rateError.code });
      return NextResponse.json({ error: "Login is temporarily unavailable" }, { status: 503 });
    }
    if (!allowed) {
      console.warn("[admin/login] rate limited", { requestId, source: ipHash.slice(0, 12) });
      return NextResponse.json(
        { error: "Too many login attempts. Try again in 15 minutes." },
        { status: 429, headers: { "Retry-After": "900", "Cache-Control": "no-store" } },
      );
    }

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
    console.error("[admin/login] Unexpected error", {
      type: err instanceof Error ? err.name : "UnknownError",
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
