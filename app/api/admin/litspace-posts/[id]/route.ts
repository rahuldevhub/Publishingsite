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
<div style="font-family: 'Georgia', serif; max-width: 620px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">

  <!-- Hero Banner -->
  <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2410 50%, #1a1a1a 100%); padding: 48px 40px 36px; text-align: center; border-bottom: 1px solid #c9a84c33;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; margin-bottom: 28px;" />
    <div style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #f0d080); padding: 6px 20px; border-radius: 50px; margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #0a0a0a; text-transform: uppercase;">Published</span>
    </div>
    <h1 style="font-size: 36px; font-weight: 700; margin: 0 0 8px; line-height: 1.2; color: #ffffff;">You're now a<br/><span style="background: linear-gradient(135deg, #c9a84c, #f0d080); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">published author.</span></h1>
    <p style="color: #888; font-size: 14px; margin: 12px 0 0; letter-spacing: 1px;">Let that sink in for a moment.</p>
  </div>

  <!-- Main Content -->
  <div style="padding: 40px 40px 32px;">
    <p style="font-size: 17px; color: #e0e0e0; line-height: 1.8; margin: 0 0 20px;">
      Hey <strong style="color: #f0d080;">${writer_name}</strong>,
    </p>
    <p style="font-size: 16px; color: #cccccc; line-height: 1.9; margin: 0 0 20px;">
      Your work <strong style="color: #ffffff;">"${title}"</strong> has been reviewed by our editorial team and is now <strong style="color: #c9a84c;">live on LitSpace</strong> — Ritera Publishing's curated literary community, read by writers, poets, and readers from around the world.
    </p>
    <p style="font-size: 15px; color: #aaaaaa; line-height: 1.8; margin: 0 0 32px;">
      This isn't just a post. This is your voice reaching people you've never met — and that's worth celebrating.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 0 0 40px;">
      <a href="https://riterapublishing.com/litspace/${slug}"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #b5873a); color: #0a0a0a; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.5px;">
        Read &amp; Share Your Work →
      </a>
      <p style="color: #666; font-size: 12px; margin: 12px 0 0;">Share this link with everyone you know 🔗</p>
    </div>

    <!-- Flex Section -->
    <div style="background: #111111; border: 1px solid #c9a84c33; border-radius: 10px; padding: 28px 28px 24px; margin-bottom: 32px;">
      <p style="font-size: 11px; letter-spacing: 3px; color: #c9a84c; text-transform: uppercase; margin: 0 0 16px; font-weight: 700;">Why this matters</p>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #c9a84c; font-size: 16px; margin-top: 2px;">✦</span>
          <p style="margin: 0; color: #cccccc; font-size: 14px; line-height: 1.7;">Your work is now discoverable by readers, writers, and industry professionals globally.</p>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #c9a84c; font-size: 16px; margin-top: 2px;">✦</span>
          <p style="margin: 0; color: #cccccc; font-size: 14px; line-height: 1.7;">LitSpace is built by Ritera Publishing — the platform helping Indian authors publish and distribute books worldwide.</p>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #c9a84c; font-size: 16px; margin-top: 2px;">✦</span>
          <p style="margin: 0; color: #cccccc; font-size: 14px; line-height: 1.7;">Every great author started with one published piece. This is yours.</p>
        </div>
      </div>
    </div>

    <!-- Share CTA -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="color: #aaaaaa; font-size: 14px; line-height: 1.8; margin: 0 0 20px;">
        📢 <strong style="color: #ffffff;">Share it. Post it. Be proud of it.</strong><br/>
        Tag us and let the world know you're published.
      </p>
      <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <a href="https://www.instagram.com/ritera.publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
          📸 Instagram
        </a>
        <a href="https://www.linkedin.com/company/ritera-publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
          💼 LinkedIn
        </a>
      </div>
    </div>

    <!-- Sign off -->
    <p style="font-size: 15px; color: #aaaaaa; line-height: 1.8; margin: 0;">
      Warmly,<br/>
      <strong style="color: #ffffff; font-size: 16px;">Team Ritera</strong><br/>
      <span style="color: #c9a84c; font-size: 13px; letter-spacing: 1px;">LitSpace · Ritera Publishing</span>
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #060606; padding: 20px 40px; text-align: center; border-top: 1px solid #1a1a1a;">
    <p style="color: #444; font-size: 12px; margin: 0;">
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
