import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { name, email, phone } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

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
      subject: `New Reviewer Registration — ${name}`,
      html: `
        <h2>New Reviewer Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
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
      .insert({ name, email, phone: phone || null });

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
