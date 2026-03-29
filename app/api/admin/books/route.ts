import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession, unauthorized } from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) return unauthorized();
  const body = await request.json();
  const supabase = createServerClient();
  const { error } = await supabase.from("books").insert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
