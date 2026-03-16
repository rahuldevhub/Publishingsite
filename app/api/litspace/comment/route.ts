import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
