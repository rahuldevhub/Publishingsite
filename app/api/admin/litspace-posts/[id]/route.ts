import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("litspace_posts")
    .update({ approved: body.approved })
    .eq("id", id)
    .select("writer_email, writer_name, title, slug")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Only send email when approving
  if (body.approved === true && data?.writer_email) {
    const { writer_email, writer_name, title, slug } = data;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: "Ritera Publishing <riterapublishing@gmail.com>",
        to: writer_email,
        subject: "Your work has been published on LitSpace 🎉",
        html: `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #fff;">
  <div style="text-align: center; margin-bottom: 32px;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 48px;" />
  </div>
  <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 8px;">Congratulations, ${writer_name}! 🎉</h2>
  <p style="color: #444; font-size: 16px; line-height: 1.7;">
    Your submission <strong>"${title}"</strong> has been reviewed and successfully published on <strong>LitSpace</strong> — Ritera Publishing's creative community.
  </p>
  <div style="text-align: center; margin: 32px 0;">
    <a href="https://riterapublishing.com/litspace/${slug}"
       style="background: #1a1a1a; color: #fff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-size: 15px; font-weight: 600;">
      View &amp; Share Your Work →
    </a>
  </div>
  <p style="color: #666; font-size: 14px; line-height: 1.6;">
    Share your published work with your friends, family, and followers. We're proud to showcase your writing on our platform.
  </p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="color: #999; font-size: 12px; text-align: center;">
    Ritera Publishing · Tamil Nadu, India · <a href="https://riterapublishing.com" style="color: #999;">riterapublishing.com</a>
  </p>
</div>`,
      });
    } catch (err) {
      console.error("Approval email failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
