import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";
import { blogContentToPlainText, prepareBlogContentForStorage } from "@/lib/blog-content";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase.from("blog_posts").select().eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const body = await request.json();
  const content = prepareBlogContentForStorage(body.content);
  if (!blogContentToPlainText(content).trim()) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").update({ ...body, content }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
