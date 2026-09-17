import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";
import { blogContentToPlainText, prepareBlogContentForStorage } from "@/lib/blog-content";

export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) return unauthorized();
  const body = await request.json();
  const content = prepareBlogContentForStorage(body.content);
  if (!blogContentToPlainText(content).trim()) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").insert({ ...body, content });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
