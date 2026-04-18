import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(request: NextRequest) {
  const supabase = createServerClient();
  const postId = request.nextUrl.searchParams.get("postId");
  if (!postId) return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const ip = getIp(request);

  const [{ count }, { data: existing }] = await Promise.all([
    supabase
      .from("post_likes")
      .select("id", { count: "exact", head: true })
      .eq("litspace_post_id", postId),
    supabase
      .from("post_likes")
      .select("id")
      .eq("litspace_post_id", postId)
      .eq("ip_address", ip)
      .maybeSingle(),
  ]);

  return NextResponse.json({ liked: !!existing, count: count ?? 0 });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { postId } = await request.json();
  console.log('Post ID received:', postId);
  if (!postId) return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const ip = getIp(request);

  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("litspace_post_id", postId)
    .eq("ip_address", ip)
    .maybeSingle();

  if (existing) {
    await supabase.from("post_likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("post_likes").insert({ litspace_post_id: postId, ip_address: ip });
  }

  const { count } = await supabase
    .from("post_likes")
    .select("id", { count: "exact", head: true })
    .eq("litspace_post_id", postId);

  const likeCount = count ?? 0;
  console.log('Like count:', likeCount, 'Should email:', likeCount === 1 || likeCount % 5 === 0, 'existing:', existing);

  // Send email notification on new likes only (not unlikes), on 1st and every 5th
  if (!existing && (likeCount === 1 || likeCount % 5 === 0)) {
    const { data: post, error: postError } = await supabase
      .from("litspace_posts")
      .select("writer_name, writer_email, title, slug")
      .eq("id", postId)
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

      const bodyParagraph =
        likeCount === 1
          ? `Your work <strong style="color: #ffffff;">"${post.title}"</strong> just got its <strong style="color: #c9a84c;">first like</strong> on LitSpace. Someone out there read your words and felt something. That's what writing is for.`
          : `<strong style="color: #c9a84c; font-size: 22px;">${likeCount} people</strong> have liked your work <strong style="color: #ffffff;">"${post.title}"</strong> on LitSpace. Your words are travelling further than you think.`;

      const subject =
        likeCount === 1
          ? `Your first like on LitSpace 🎉 — "${post.title}"`
          : `${likeCount} people have liked your work on LitSpace ❤️`;

      try {
        await transporter.sendMail({
          from: "Ritera Publishing <connect.ritera@gmail.com>",
          to: post.writer_email,
          subject,
          html: `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 620px; margin: 0 auto; background: #0d0d0d; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

  <!-- Header -->
  <div style="background: linear-gradient(160deg, #1c1506 0%, #2d1f04 40%, #1a1200 100%); padding: 40px 48px 32px; text-align: center; border-bottom: 1px solid #c9a84c44;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; display: inline-block; margin-bottom: 20px;" />
    <div style="text-align: center;">
      <span style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #e8c96a); padding: 6px 20px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #1a0f00; text-transform: uppercase; font-family: Arial, sans-serif;">❤️ New Like</span>
    </div>
  </div>

  <!-- Body -->
  <div style="padding: 40px 48px 36px; background: #111111;">
    <p style="font-size: 17px; color: #e8e0d0; margin: 0 0 16px;">
      Hey <strong style="color: #e8c96a;">${post.writer_name}</strong>,
    </p>
    <p style="font-size: 15px; color: #c8bfa8; line-height: 1.8; margin: 0 0 24px;">
      ${bodyParagraph}
    </p>

    <!-- Like count display -->
    <div style="background: #0d0d0d; border: 1px solid #c9a84c33; border-radius: 10px; padding: 24px; text-align: center; margin-bottom: 32px;">
      <p style="font-size: 40px; margin: 0 0 4px;">❤️</p>
      <p style="font-size: 28px; font-weight: 800; color: #c9a84c; margin: 0 0 4px;">${likeCount}</p>
      <p style="font-size: 13px; color: #7a6a4a; margin: 0; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">Total Likes</p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 36px;">
      <a href="https://riterapublishing.com/litspace/${post.slug}"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #a8732a); color: #0d0800; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; font-family: Arial, sans-serif;">
        See Your Work on LitSpace →
      </a>
    </div>

    <p style="font-size: 14px; color: #7a6a4a; line-height: 1.8; margin: 0;">
      Keep writing. People are reading.<br/>
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
        console.error("Like notification email failed:", err);
      }
    }
  }

  return NextResponse.json({ liked: !existing, count: likeCount });
}
