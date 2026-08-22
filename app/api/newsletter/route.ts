import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendSubmissionNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(`newsletter:${ip}`, 10)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase().slice(0, 200) });

    if (error) {
      // Already subscribed — treat as a soft success, don't re-notify.
      if (error.code === "23505") {
        return NextResponse.json({ success: true });
      }
      console.error("[newsletter API] Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
    }

    await sendSubmissionNotification("NEWSLETTER");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
