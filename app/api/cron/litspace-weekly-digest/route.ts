import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dateRange = `${formatDate(weekAgo)} – ${formatDate(now)}`;

  // Fetch all approved posts with a writer_email
  const { data: posts, error: postsError } = await supabase
    .from("litspace_posts")
    .select("id, title, slug, writer_name, writer_email")
    .eq("approved", true)
    .not("writer_email", "is", null);

  if (postsError) {
    console.error("[weekly-digest] Failed to fetch posts:", postsError);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }

  if (!posts || posts.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  // Fetch stats for all posts in parallel
  const statsResults = await Promise.all(
    posts.map(async (post) => {
      const [{ count: weekLikes }, { count: weekComments }, { count: totalLikes }] =
        await Promise.all([
          supabase
            .from("post_likes")
            .select("*", { count: "exact", head: true })
            .eq("litspace_post_id", post.id)
            .gte("created_at", weekAgo.toISOString()),
          supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("litspace_post_id", post.id)
            .eq("approved", true)
            .gte("created_at", weekAgo.toISOString()),
          supabase
            .from("post_likes")
            .select("*", { count: "exact", head: true })
            .eq("litspace_post_id", post.id),
        ]);

      return {
        ...post,
        weekLikes: weekLikes ?? 0,
        weekComments: weekComments ?? 0,
        totalLikes: totalLikes ?? 0,
      };
    })
  );

  // Filter out posts with zero activity this week
  const activePosts = statsResults.filter(
    (p) => p.weekLikes > 0 || p.weekComments > 0
  );

  if (activePosts.length === 0) {
    return NextResponse.json({ sent: 0, reason: "No activity this week" });
  }

  // Group by writer_email
  const byAuthor = new Map<
    string,
    {
      writer_name: string;
      writer_email: string;
      posts: typeof activePosts;
    }
  >();

  for (const post of activePosts) {
    const email = post.writer_email as string;
    if (!byAuthor.has(email)) {
      byAuthor.set(email, {
        writer_name: post.writer_name,
        writer_email: email,
        posts: [],
      });
    }
    byAuthor.get(email)!.posts.push(post);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let sent = 0;
  let failed = 0;

  for (const author of byAuthor.values()) {
    try {
      const postsHtml = author.posts
        .map(
          (p) => `
  <div style="background: #0d0d0d; border: 1px solid #c9a84c33; border-radius: 10px; padding: 24px 28px; margin-bottom: 16px;">
    <p style="font-size: 16px; font-weight: 700; color: #ffffff; margin: 0 0 16px;">
      <a href="https://riterapublishing.com/litspace/${p.slug}" style="color: #ffffff; text-decoration: none;">"${p.title}"</a>
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="text-align: center; padding: 8px;">
          <p style="font-size: 24px; font-weight: 800; color: #c9a84c; margin: 0;">${p.weekLikes}</p>
          <p style="font-size: 11px; color: #7a6a4a; margin: 4px 0 0; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">Likes this week</p>
        </td>
        <td style="text-align: center; padding: 8px; border-left: 1px solid #1e1e1e;">
          <p style="font-size: 24px; font-weight: 800; color: #c9a84c; margin: 0;">${p.weekComments}</p>
          <p style="font-size: 11px; color: #7a6a4a; margin: 4px 0 0; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">Comments this week</p>
        </td>
        <td style="text-align: center; padding: 8px; border-left: 1px solid #1e1e1e;">
          <p style="font-size: 24px; font-weight: 800; color: #e8e0d0; margin: 0;">${p.totalLikes}</p>
          <p style="font-size: 11px; color: #7a6a4a; margin: 4px 0 0; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">Total likes</p>
        </td>
      </tr>
    </table>
  </div>`
        )
        .join("\n");

      await transporter.sendMail({
        from: "Ritera Publishing <connect.ritera@gmail.com>",
        to: author.writer_email,
        subject: "Your LitSpace week in review 📖",
        html: `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 620px; margin: 0 auto; background: #0d0d0d; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

  <!-- Header -->
  <div style="background: linear-gradient(160deg, #1c1506 0%, #2d1f04 40%, #1a1200 100%); padding: 40px 48px 32px; text-align: center; border-bottom: 1px solid #c9a84c44;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; display: inline-block; margin-bottom: 20px;" />
    <div style="text-align: center;">
      <span style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #e8c96a); padding: 6px 20px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #1a0f00; text-transform: uppercase; font-family: Arial, sans-serif;">📖 Weekly Digest</span>
    </div>
    <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin: 20px 0 8px;">Your week on LitSpace</h1>
    <p style="color: #7a6a4a; font-size: 14px; margin: 0; font-family: Arial, sans-serif;">${dateRange}</p>
  </div>

  <!-- Body -->
  <div style="padding: 40px 48px 36px; background: #111111;">
    <p style="font-size: 17px; color: #e8e0d0; margin: 0 0 8px;">
      Hey <strong style="color: #e8c96a;">${author.writer_name}</strong>,
    </p>
    <p style="font-size: 15px; color: #9a9080; line-height: 1.8; margin: 0 0 32px;">
      Here's how your work performed on LitSpace this week.
    </p>

    ${postsHtml}

    <!-- CTA -->
    <div style="text-align: center; margin: 36px 0;">
      <a href="https://riterapublishing.com/litspace"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #a8732a); color: #0d0800; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 800; font-family: Arial, sans-serif;">
        Visit LitSpace →
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

      sent++;
    } catch (err) {
      console.error(
        `[weekly-digest] Email failed for ${author.writer_email}:`,
        err
      );
      failed++;
    }
  }

  return NextResponse.json({ sent, failed });
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
