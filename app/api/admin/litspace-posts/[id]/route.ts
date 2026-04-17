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
  console.log('PATCH body:', { id, approved: body.approved });
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("litspace_posts")
    .update({ approved: body.approved })
    .eq("id", id)
    .select("writer_email, writer_name, title, slug")
    .single();

  console.log('Updated post:', data, 'Error:', error);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Only send email when approving
  if (body.approved === true && data?.writer_email) {
    const { writer_email, writer_name, title, slug } = data;
    console.log('Gmail user:', process.env.GMAIL_USER ? 'SET' : 'NOT SET');
    console.log('Sending email to:', writer_email);
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
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 680px; margin: 0 auto; background: #0d0d0d; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

  <!-- Hero -->
  <div style="background: linear-gradient(160deg, #1c1506 0%, #2d1f04 40%, #1a1200 100%); padding: 56px 48px 44px; text-align: center; border-bottom: 1px solid #c9a84c44;">

    <!-- Logo centered -->
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 48px; display: inline-block;" />
    </div>

    <!-- Published badge -->
    <div style="text-align: center; margin-bottom: 28px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #e8c96a); padding: 7px 24px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 4px; color: #1a0f00; text-transform: uppercase;">✦ Published ✦</span>
    </div>

    <!-- Headline -->
    <h1 style="font-size: 42px; font-weight: 800; margin: 0 0 12px; line-height: 1.15; color: #ffffff; letter-spacing: -0.5px;">
      You're now a<br/>
      <span style="color: #c9a84c;">published author.</span>
    </h1>
    <p style="color: #7a6a4a; font-size: 15px; margin: 0; letter-spacing: 2px; font-style: italic;">Let that sink in for a moment.</p>
  </div>

  <!-- Body -->
  <div style="padding: 48px 48px 40px; background: #111111;">

    <p style="font-size: 18px; color: #e8e0d0; line-height: 1.7; margin: 0 0 18px;">
      Hey <strong style="color: #e8c96a;">${writer_name}</strong>,
    </p>

    <p style="font-size: 16px; color: #c8bfa8; line-height: 1.9; margin: 0 0 16px;">
      Your work <strong style="color: #ffffff;">"${title}"</strong> has been reviewed by our editorial team and is now <strong style="color: #c9a84c;">live on LitSpace</strong> — Ritera Publishing's curated literary community, read by writers, poets, and readers from around the world.
    </p>

    <p style="font-size: 15px; color: #9a9080; line-height: 1.9; margin: 0 0 36px;">
      This isn't just a post. This is your voice reaching people you've never met — and that's worth celebrating.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 0 0 44px;">
      <a href="https://riterapublishing.com/litspace/${slug}"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #a8732a); color: #0d0800; padding: 18px 48px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; font-family: Arial, sans-serif;">
        Read &amp; Share Your Work →
      </a>
      <p style="color: #555; font-size: 12px; margin: 14px 0 0; font-family: Arial, sans-serif;">Copy the link and share it everywhere 🔗</p>
    </div>

    <!-- Why This Matters — single column table for email safety -->
    <div style="background: #0d0d0d; border: 1px solid #c9a84c33; border-radius: 12px; padding: 32px 32px 24px; margin-bottom: 36px;">
      <p style="font-size: 11px; letter-spacing: 4px; color: #c9a84c; text-transform: uppercase; margin: 0 0 20px; font-weight: 800; font-family: Arial, sans-serif;">Why This Matters</p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; vertical-align: top;">
            <span style="color: #c9a84c; font-size: 18px; margin-right: 12px;">✦</span>
            <span style="color: #c8bfa8; font-size: 14px; line-height: 1.7;">Your work is now discoverable by readers, writers, and industry professionals globally.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; vertical-align: top;">
            <span style="color: #c9a84c; font-size: 18px; margin-right: 12px;">✦</span>
            <span style="color: #c8bfa8; font-size: 14px; line-height: 1.7;">LitSpace is built by Ritera Publishing — helping Indian authors publish and distribute books worldwide.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; vertical-align: top;">
            <span style="color: #c9a84c; font-size: 18px; margin-right: 12px;">✦</span>
            <span style="color: #c8bfa8; font-size: 14px; line-height: 1.7;">Every great author started with one published piece. This is yours.</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Share Section -->
    <div style="text-align: center; background: #0a0a0a; border-radius: 12px; padding: 28px 24px; margin-bottom: 36px; border: 1px solid #1e1e1e;">
      <p style="font-size: 16px; color: #e8e0d0; margin: 0 0 6px; font-weight: 700;">📢 Share it. Post it. Be proud of it.</p>
      <p style="font-size: 14px; color: #7a6a4a; margin: 0 0 20px; font-family: Arial, sans-serif;">Tag us and let the world know you're published.</p>
      <table align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 0 8px;">
            <a href="https://www.instagram.com/ritera.publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #e8e0d0; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">
              📸 Instagram
            </a>
          </td>
          <td style="padding: 0 8px;">
            <a href="https://www.linkedin.com/company/ritera-publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #e8e0d0; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">
              💼 LinkedIn
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Sign off -->
    <p style="font-size: 15px; color: #9a9080; line-height: 1.9; margin: 0;">
      Warmly,<br/>
      <strong style="color: #e8e0d0; font-size: 17px;">Team Ritera</strong><br/>
      <span style="color: #c9a84c; font-size: 13px; letter-spacing: 1px; font-family: Arial, sans-serif;">LitSpace · Ritera Publishing</span>
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #080808; padding: 20px 48px; text-align: center; border-top: 1px solid #1a1a1a;">
    <p style="color: #3a3a3a; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
      Ritera Publishing · Tamil Nadu, India ·
      <a href="https://riterapublishing.com" style="color: #c9a84c; text-decoration: none;">riterapublishing.com</a>
    </p>
  </div>

</div>`,
      });
      console.log('Email sent successfully');
    } catch (err) {
      console.error('Email error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
