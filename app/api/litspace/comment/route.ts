import { NextRequest, NextResponse } from "next/server";
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

  return NextResponse.json({ success: true });
}
