import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import CaseStudyActions from "./CaseStudyActions";

export default async function AdminCaseStudiesPage() {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { data: caseStudies, error } = await supabase
    .from("case_studies")
    .select("id, title, slug, author_name, book_title, category, featured, published, created_at")
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
            <h1 className="text-lg font-semibold text-gray-900">Case Studies</h1>
          </div>
          <Link
            href="/admin/case-studies/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add Case Study
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load case studies: {error.message}
          </div>
        )}

        {!caseStudies?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No case studies yet.</p>
            <Link href="/admin/case-studies/new" className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-2">
              Add your first case study
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Author</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900 max-w-xs">
                      <div className="truncate">{cs.title}</div>
                      <div className="text-xs text-gray-400 truncate">{cs.slug}</div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      <div>{cs.author_name}</div>
                      {cs.book_title && <div className="text-xs text-gray-400 italic truncate max-w-[160px]">{cs.book_title}</div>}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{cs.category ?? "—"}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {cs.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Published</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Draft</span>
                        )}
                        {cs.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <CaseStudyActions id={cs.id} title={cs.title} />
                    </td>
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
