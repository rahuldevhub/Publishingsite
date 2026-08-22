import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";

const ALLOWED_BUCKETS = ["images"];

export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const bucket = (formData.get("bucket") as string | null) ?? "images";
  const folder = (formData.get("folder") as string | null) ?? "uploads";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: "Invalid storage bucket" }, { status: 400 });
  }

  const supabase = createServerClient();

  const ext = file.name.split(".").pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, arrayBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
