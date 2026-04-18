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
  <div style="background: #0d0d0d; border: 1px solid #c9a84c33; border-radius: 12px; padding: 28px 28px 24px; margin-bottom: 16px;">

    <!-- Post title -->
    <p style="font-size: 17px; font-weight: 700; color: #ffffff; margin: 0 0 6px;">
      <a href="https://riterapublishing.com/litspace/${p.slug}" style="color: #ffffff; text-decoration: none;">"${p.title}"</a>
    </p>
    <p style="font-size: 12px; color: #4a4a3a; margin: 0 0 20px; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">This week's performance</p>

    <!-- Stats row -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #1e1e1e; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="text-align: center; padding: 18px 12px; border-right: 1px solid #1e1e1e; width: 33%;">
          <p style="font-size: 30px; font-weight: 800; color: #c9a84c; margin: 0 0 4px;">${p.weekLikes}</p>
          <p style="font-size: 10px; color: #5a5a4a; margin: 0; font-family: Arial, sans-serif; letter-spacing: 1.5px; text-transform: uppercase;">Likes this week</p>
        </td>
        <td style="text-align: center; padding: 18px 12px; border-right: 1px solid #1e1e1e; width: 33%;">
          <p style="font-size: 30px; font-weight: 800; color: #c9a84c; margin: 0 0 4px;">${p.weekComments}</p>
          <p style="font-size: 10px; color: #5a5a4a; margin: 0; font-family: Arial, sans-serif; letter-spacing: 1.5px; text-transform: uppercase;">Comments this week</p>
        </td>
        <td style="text-align: center; padding: 18px 12px; width: 33%;">
          <p style="font-size: 30px; font-weight: 800; color: #e8e0d0; margin: 0 0 4px;">${p.totalLikes}</p>
          <p style="font-size: 10px; color: #5a5a4a; margin: 0; font-family: Arial, sans-serif; letter-spacing: 1.5px; text-transform: uppercase;">Total likes</p>
        </td>
      </tr>
    </table>

    <!-- View link -->
    <div style="text-align: right; margin-top: 14px;">
      <a href="https://riterapublishing.com/litspace/${p.slug}" style="font-size: 13px; color: #c9a84c; text-decoration: none; font-family: Arial, sans-serif; font-weight: 700;">View your work →</a>
    </div>
  </div>`
        )
        .join("\n");

      await transporter.sendMail({
        from: "Ritera Publishing <connect.ritera@gmail.com>",
        to: author.writer_email,
        subject: "Your LitSpace week in review 📖",
        html: `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 660px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

  <!-- Hero -->
  <div style="background: linear-gradient(160deg, #1c1506 0%, #2d1f04 40%, #1a1200 100%); padding: 52px 48px 40px; text-align: center; border-bottom: 1px solid #c9a84c44;">
    <img src="https://riterapublishing.com/logo.png" alt="Ritera Publishing" style="height: 44px; display: inline-block; margin-bottom: 24px;" />
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #e8c96a); padding: 7px 24px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 4px; color: #1a0f00; text-transform: uppercase; font-family: Arial, sans-serif;">📖 Weekly Digest</span>
    </div>
    <h1 style="font-size: 34px; font-weight: 800; color: #ffffff; margin: 0 0 10px; line-height: 1.2;">
      Your week on <span style="color: #c9a84c;">LitSpace</span>
    </h1>
    <p style="color: #7a6a4a; font-size: 14px; margin: 0; font-family: Arial, sans-serif; letter-spacing: 1px;">${dateRange}</p>
  </div>

  <!-- Body -->
  <div style="padding: 44px 48px 36px; background: #111111;">

    <p style="font-size: 18px; color: #f0ede6; margin: 0 0 8px;">
      Hey <strong style="color: #e8c96a;">${author.writer_name}</strong>,
    </p>
    <p style="font-size: 15px; color: #9a9080; line-height: 1.8; margin: 0 0 12px;">
      Every week your work stays on LitSpace, it keeps finding new readers. Here's your proof it's working.
    </p>

    <!-- Motivational pull quote -->
    <div style="border-left: 3px solid #c9a84c; padding: 4px 0 4px 20px; margin: 0 0 36px;">
      <p style="font-size: 15px; color: #c9a84c; font-style: italic; margin: 0; line-height: 1.7;">"The best writers don't wait for an audience — they build one, word by word."</p>
    </div>

    <!-- Posts stats — injected dynamically -->
    ${postsHtml}

    <!-- Growth message -->
    <div style="background: #0d0d0d; border: 1px solid #c9a84c22; border-radius: 10px; padding: 24px 28px; margin-bottom: 32px;">
      <p style="font-size: 11px; letter-spacing: 4px; color: #c9a84c; text-transform: uppercase; margin: 0 0 14px; font-weight: 800; font-family: Arial, sans-serif;">Keep the momentum going</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #1e1e1e; vertical-align: top;">
            <span style="color: #c9a84c; margin-right: 10px;">✦</span>
            <span style="color: #b8bfb0; font-size: 14px; line-height: 1.7;">Share your published link on social media — every share brings new readers directly to your work.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #1e1e1e; vertical-align: top;">
            <span style="color: #c9a84c; margin-right: 10px;">✦</span>
            <span style="color: #b8bfb0; font-size: 14px; line-height: 1.7;">Submit another piece — writers with multiple works get 3x more engagement on LitSpace.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;">
            <span style="color: #c9a84c; margin-right: 10px;">✦</span>
            <span style="color: #b8bfb0; font-size: 14px; line-height: 1.7;">Ready to publish a full book? Ritera Publishing offers end-to-end publishing with 100% royalties.</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA buttons -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="https://riterapublishing.com/litspace"
         style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #a8732a); color: #0d0800; padding: 15px 36px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 800; font-family: Arial, sans-serif; margin: 0 6px 10px;">
        Visit LitSpace →
      </a>
      <a href="https://riterapublishing.com/litspace/submit"
         style="display: inline-block; background: #1a1a1a; border: 1px solid #c9a84c44; color: #c9a84c; padding: 15px 36px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 800; font-family: Arial, sans-serif; margin: 0 6px 10px;">
        Submit New Work →
      </a>
    </div>

    <!-- Social -->
    <div style="text-align: center; margin-bottom: 36px;">
      <p style="font-size: 13px; color: #4a4a3a; margin: 0 0 14px; font-family: Arial, sans-serif;">Follow us for writing tips, features & announcements</p>
      <table align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 0 6px;">
            <a href="https://www.instagram.com/ritera_publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #c9a84c; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">📸 Instagram</a>
          </td>
          <td style="padding: 0 6px;">
            <a href="https://www.linkedin.com/company/ritera-publishing" style="display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #c9a84c; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; font-family: Arial, sans-serif;">💼 LinkedIn</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Sign off -->
    <p style="font-size: 14px; color: #7a6a4a; line-height: 1.9; margin: 0;">
      Keep writing. People are reading.<br/>
      <strong style="color: #f0ede6; font-size: 16px;">Team Ritera</strong><br/>
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
