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
        subject: `💬 "${post.title}" just got a comment on LitSpace`,
        html: `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; background: #0a0f0a; border-radius: 16px; overflow: hidden; border: 1px solid #1a3a1a;">

  <!-- Hero -->
  <div style="background: linear-gradient(160deg, #061a08 0%, #0d2e10 50%, #061a08 100%); padding: 48px 48px 36px; text-align: center; border-bottom: 1px solid #2d6a3044;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; display: inline-block; margin-bottom: 24px;" />
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #2d9e4f, #4eca70); padding: 7px 24px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 4px; color: #061a08; text-transform: uppercase; font-family: Arial, sans-serif;">💬 Your Words Landed</span>
    </div>
    <h1 style="font-size: 36px; font-weight: 800; margin: 0 0 10px; line-height: 1.2; color: #f0ede6;">
      Someone just felt<br/>
      <span style="color: #4eca70;">what you wrote.</span>
    </h1>
    <p style="color: #4a6e4e; font-size: 14px; margin: 0; letter-spacing: 1.5px; font-style: italic; font-family: Arial, sans-serif;">That's not nothing. That's everything.</p>
  </div>

  <!-- Body -->
  <div style="padding: 44px 48px 36px; background: #0d130d;">

    <p style="font-size: 18px; color: #f0ede6; margin: 0 0 16px;">
      Hey <strong style="color: #4eca70;">${post.writer_name}</strong>,
    </p>

    <p style="font-size: 15px; color: #b8c8b0; line-height: 1.9; margin: 0 0 28px;">
      Your work <strong style="color: #f0ede6;">"${post.title}"</strong> on LitSpace just got a new comment. A real person stopped, read your words, and felt moved enough to respond. That's rare. That's yours.
    </p>

    <!-- Comment Block -->
    <div style="background: #061a08; border: 1px solid #2d6a3066; border-left: 4px solid #4eca70; border-radius: 0 10px 10px 0; padding: 24px 28px; margin-bottom: 12px;">
      <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #4eca70; font-weight: 800; margin: 0 0 12px; font-family: Arial, sans-serif;">${author_name.trim()} wrote</p>
      <p style="font-size: 18px; color: #f0ede6; line-height: 1.7; margin: 0; font-style: italic;">"${content.trim()}"</p>
    </div>

    <p style="font-size: 13px; color: #3a5a3e; margin: 0 0 36px; font-family: Arial, sans-serif;">on LitSpace · Ritera Publishing</p>

    <!-- Momentum section -->
    <div style="background: #061a08; border: 1px solid #2d6a3033; border-radius: 10px; padding: 28px 28px 24px; margin-bottom: 32px;">
      <p style="font-size: 11px; letter-spacing: 4px; color: #4eca70; text-transform: uppercase; margin: 0 0 16px; font-weight: 800; font-family: Arial, sans-serif;">Why this moment matters</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1a2e1a; vertical-align: top;">
            <span style="color: #4eca70; font-size: 16px; margin-right: 10px;">✦</span>
            <span style="color: #b8c8b0; font-size: 14px; line-height: 1.7;">Every comment is proof your writing is travelling beyond your screen — into real people's minds.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1a2e1a; vertical-align: top;">
            <span style="color: #4eca70; font-size: 16px; margin-right: 10px;">✦</span>
            <span style="color: #b8c8b0; font-size: 14px; line-height: 1.7;">Writers who get comments get noticed. Share your work now while the momentum is building.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; vertical-align: top;">
            <span style="color: #4eca70; font-size: 16px; margin-right: 10px;">✦</span>
            <span style="color: #b8c8b0; font-size: 14px; line-height: 1.7;">LitSpace is free, forever. Your words deserve to be read by thousands — not just one.</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="font-size: 15px; color: #f0ede6; font-weight: 700; margin: 0 0 6px;">📢 Share it while it's alive.</p>
      <p style="font-size: 13px; color: #4a6e4e; margin: 0 0 20px; font-family: Arial, sans-serif;">The best time to share your work is right now.</p>
      <a href="https://riterapublishing.com/litspace/${post.slug}"
         style="display: inline-block; background: linear-gradient(135deg, #2d9e4f, #1d7a3a); color: #f0ede6; padding: 16px 44px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; font-family: Arial, sans-serif;">
        Read &amp; Share Your Work →
      </a>
    </div>

    <!-- Social -->
    <div style="text-align: center; margin-bottom: 36px;">
      <p style="font-size: 13px; color: #4a6e4e; margin: 0 0 16px; font-family: Arial, sans-serif;">Tag us when you share — we'll amplify it.</p>
      <table align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 0 8px;">
            <a href="https://www.instagram.com/ritera_publishing" style="display: inline-block; background: #0d1f0d; border: 1px solid #2d6a30; color: #4eca70; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">
              📸 Instagram
            </a>
          </td>
          <td style="padding: 0 8px;">
            <a href="https://www.linkedin.com/company/ritera-publishing" style="display: inline-block; background: #0d1f0d; border: 1px solid #2d6a30; color: #4eca70; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">
              💼 LinkedIn
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Sign off -->
    <p style="font-size: 14px; color: #4a6e4e; line-height: 1.9; margin: 0;">
      Keep writing. The world is reading.<br/>
      <strong style="color: #f0ede6; font-size: 16px;">Team Ritera</strong><br/>
      <span style="color: #4eca70; font-size: 13px; font-family: Arial, sans-serif;">LitSpace · Ritera Publishing</span>
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #050d05; padding: 18px 48px; text-align: center; border-top: 1px solid #1a2e1a;">
    <p style="color: #2a3e2a; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
      Ritera Publishing · Tamil Nadu, India ·
      <a href="https://riterapublishing.com" style="color: #2d9e4f; text-decoration: none;">riterapublishing.com</a>
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
