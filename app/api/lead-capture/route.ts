import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(`lead-${ip}`, 10)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { name, email, phone, source, source_slug } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const sanitized = {
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 20) : null,
      source: source || "case_study",
      source_slug: source_slug || null,
    };

    const supabase = createServerClient();
    const { error } = await supabase.from("lead_captures").insert(sanitized);

    if (error) {
      return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
