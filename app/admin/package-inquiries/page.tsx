import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import PackageInquiriesClient from "./PackageInquiriesClient";

export default async function PackageInquiriesPage() {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  await supabase
    .from("admin_section_views")
    .update({ last_viewed_at: new Date().toISOString() })
    .eq("section_key", "package_inquiries");

  const { data: inquiries, error } = await supabase
    .from("package_inquiries")
    .select("id, name, email, phone, message, selected_services, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Package Inquiries</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load inquiries: {error.message}
          </div>
        )}
        <PackageInquiriesClient inquiries={inquiries ?? []} />
      </main>
    </div>
  );
}
