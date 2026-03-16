import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(request: NextRequest) {
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
  const { postId } = await request.json();
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

  return NextResponse.json({ liked: !existing, count: count ?? 0 });
}
