import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();
  const { error } = await supabase.from("case_studies").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const supabase = createServerClient();
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
