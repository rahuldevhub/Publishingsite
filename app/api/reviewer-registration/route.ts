import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";

/** Escape HTML special characters to prevent HTML injection in email content. */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone } = body as { name?: string; email?: string; phone?: string };

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const safeName  = esc(name.trim());
  const safeEmail = esc(email.trim());
  const safePhone = phone?.trim() ? esc(phone.trim()) : "Not provided";

  // Send email notification
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "riterapublishing@gmail.com",
      subject: `New Reviewer Registration — ${safeName}`,
      html: `
        <h2>New Reviewer Registration</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><em>Submitted from the reviewer page</em></p>
      `,
    });
  } catch (emailErr) {
    console.error("Email send failed:", emailErr);
    // Don't block the response — still save to Supabase
  }

  // Save to Supabase
  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from("reviewer_registrations")
      .insert({ name: name.trim(), email: email.trim(), phone: phone?.trim() || null });

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
    }
  } catch (dbErr) {
    console.error("Supabase error:", dbErr);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
