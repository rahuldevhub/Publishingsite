import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";

export async function GET() {
  if (!(await getAdminSession())) return unauthorized();
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("lead_captures")
    .select("id, name, email, phone, source, source_slug, created_at")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
