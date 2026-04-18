import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 comments per 15 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(`comment:${ip}`, 5)) {
    return NextResponse.json(
      { error: "Too many submissions. Try again later." },
      { status: 429 }
    );
  }

  const supabase = createServerClient();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { litspace_post_id, author_name, author_email, content } = body as Record<string, string>;

  if (!litspace_post_id || !author_name?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: litspace_post_id, author_name, content" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("comments").insert({
    litspace_post_id,
    author_name: author_name.trim(),
    author_email: author_email?.trim() || null,
    content: content.trim(),
    approved: true,
  });

  if (error) {
    console.error("[comment API] Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
  }

  // Send notification email to the post's author
  console.log('Comment inserted, fetching post for:', litspace_post_id);
  const { data: post, error: postError } = await supabase
    .from("litspace_posts")
    .select("writer_name, writer_email, title, slug")
    .eq("id", litspace_post_id)
    .single();
  console.log('Post fetched for notification:', post, postError);

  if (post?.writer_email) {
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
        from: "Ritera Publishing <connect.ritera@gmail.com>",
        to: post.writer_email,
        subject: `Someone commented on your work — "${post.title}"`,
        html: `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 620px; margin: 0 auto; background: #0d0d0d; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

  <!-- Header -->
  <div style="background: linear-gradient(160deg, #1c1506 0%, #2d1f04 40%, #1a1200 100%); padding: 40px 48px 32px; text-align: center; border-bottom: 1px solid #c9a84c44;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; display: inline-block; margin-bottom: 20px;" />
    <div style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #e8c96a); padding: 6px 20px; border-radius: 50px; margin-bottom: 0;">
      <span style="font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #1a0f00; text-transform: uppercase; font-family: Arial, sans-serif;">💬 New Comment</span>
    </div>
  </div>

  <!-- Body -->
  <div style="padding: 40px 48px 36px; background: #111111;">
    <p style="font-size: 17px; color: #e8e0d0; margin: 0 0 16px;">
      Hey <strong style="color: #e8c96a;">${post.writer_name}</strong>,
    </p>
    <p style="font-size: 15px; color: #c8bfa8; line-height: 1.8; margin: 0 0 28px;">
      Someone just left a comment on your work <strong style="color: #ffffff;">"${post.title}"</strong> on LitSpace.
    </p>

    <!-- Comment Box -->
    <div style="background: #0d0d0d; border-left: 3px solid #c9a84c; border-radius: 0 8px 8px 0; padding: 20px 24px; margin-bottom: 32px;">
      <p style="font-size: 13px; color: #c9a84c; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin: 0 0 10px; font-family: Arial, sans-serif;">${author_name.trim()} said</p>
      <p style="font-size: 16px; color: #e8e0d0; line-height: 1.8; margin: 0; font-style: italic;">"${content.trim()}"</p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 36px;">
      <a href="https://riterapublishing.com/litspace/${post.slug}"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #a8732a); color: #0d0800; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; font-family: Arial, sans-serif;">
        View &amp; Reply on LitSpace →
      </a>
    </div>

    <p style="font-size: 14px; color: #7a6a4a; line-height: 1.8; margin: 0;">
      Your words are resonating. Keep writing.<br/>
      <strong style="color: #e8e0d0;">Team Ritera</strong><br/>
      <span style="color: #c9a84c; font-size: 13px; font-family: Arial, sans-serif;">LitSpace · Ritera Publishing</span>
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #080808; padding: 18px 48px; text-align: center; border-top: 1px solid #1a1a1a;">
    <p style="color: #3a3a3a; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
      Ritera Publishing · Tamil Nadu, India ·
      <a href="https://riterapublishing.com" style="color: #c9a84c; text-decoration: none;">riterapublishing.com</a>
    </p>
  </div>
</div>`,
      });
    } catch (err) {
      console.error("Comment notification email failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
