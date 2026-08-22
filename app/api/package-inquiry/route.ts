import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendSubmissionNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(`package-inquiry:${ip}`, 5)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { name, email, phone, message, selected_services } = await req.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }
    if (!Array.isArray(selected_services) || selected_services.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one service." },
        { status: 400 }
      );
    }

    const sanitized = {
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 200),
      phone: String(phone).trim().slice(0, 20),
      message: message ? String(message).trim().slice(0, 2000) : null,
      selected_services: selected_services.map((s) => String(s)),
    };

    const supabase = createServerClient();
    const { error } = await supabase.from("package_inquiries").insert(sanitized);

    if (error) {
      console.error("[package-inquiry API] Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
    }

    await sendSubmissionNotification("PACKAGE");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
