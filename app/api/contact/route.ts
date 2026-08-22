import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { sendSubmissionNotification } from "@/lib/notifications";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkRateLimit(`contact:${ip}`, 10)) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }

    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("contact_enquiries").insert({
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 20) : null,
      message: String(message).trim().slice(0, 2000),
    });

  if (error) {
  console.error("[contact API FULL ERROR]", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}

    await sendSubmissionNotification("CONTACT");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}