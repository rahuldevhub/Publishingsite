import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(str: string, max: number) {
  if (!str) return "—";
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export default async function ContactEnquiriesPage() {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  await supabase
    .from("admin_section_views")
    .update({ last_viewed_at: new Date().toISOString() })
    .eq("section_key", "contact_enquiries");

  const { data: enquiries, error } = await supabase
    .from("contact_enquiries")
    .select("id, name, email, phone, message, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Contact Enquiries</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load enquiries: {error.message}
          </div>
        )}

        {enquiries?.length ? (
          <p className="mb-4 text-sm text-gray-500">{enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"}</p>
        ) : null}

        {!enquiries?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No enquiries yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Phone</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Message</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-gray-600">{row.email}</td>
                    <td className="px-6 py-4 text-gray-600">{row.phone ?? <span className="text-gray-400">—</span>}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">
                      <span title={row.message}>{truncate(row.message, 80)}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{formatDate(row.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
