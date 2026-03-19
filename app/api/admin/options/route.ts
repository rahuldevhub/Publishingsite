import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const types = request.nextUrl.searchParams.get("types")?.split(",") ?? [];
  const supabase = createServerClient();
  const result: Record<string, unknown[]> = {};

  await Promise.all(
    types.map(async (type) => {
      if (type === "authors") {
        const { data } = await supabase.from("authors").select("id, name").order("name");
        result.authors = data ?? [];
      } else if (type === "blog-categories") {
        const { data } = await supabase.from("blog_categories").select("id, name").order("name");
        result["blog-categories"] = data ?? [];
      } else if (type === "litspace-categories") {
        const { data } = await supabase.from("litspace_categories").select("id, name").order("name");
        result["litspace-categories"] = data ?? [];
      } else if (type === "employees") {
        const { data } = await supabase.from("employees").select("id, name, role").eq("active", true).order("name");
        result.employees = data ?? [];
      }
    })
  );

  return NextResponse.json(result);
}
