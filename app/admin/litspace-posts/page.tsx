import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import LitspaceActions from "./LitspaceActions";

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

export default async function LitspacePostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string }>;
}) {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { category, status } = await searchParams;

  const { data: categories } = await supabase
    .from("litspace_categories")
    .select("id, name")
    .order("name");

  let query = supabase
    .from("litspace_posts")
    .select("id, title, writer_name, approved, featured, created_at, category:litspace_categories(id, name)")
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category_id", category);
  if (status === "approved") query = query.eq("approved", true);
  if (status === "pending") query = query.eq("approved", false);

  const { data: posts, error } = await query;

  const pendingCount = posts?.filter((p) => !p.approved).length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Litspace Posts</h1>
            {pendingCount > 0 && (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </div>
          <Link
            href="/admin/litspace-posts/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add New Post
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <form method="GET" className="flex items-center gap-3 mb-6">
          <select name="category" defaultValue={category ?? ""} className={selectClass}>
            <option value="">All Categories</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="status" defaultValue={status ?? ""} className={selectClass}>
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Filter
          </button>
          {(category || status) && (
            <Link
              href="/admin/litspace-posts"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load posts: {error.message}
          </div>
        )}

        {!posts?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No litspace posts found.</p>
            <Link href="/admin/litspace-posts/new" className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-2">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Writer</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Featured</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => {
                  const cat = post.category as unknown as { name: string } | null;
                  return (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                        <div className="truncate">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{post.writer_name}</td>
                      <td className="px-6 py-4 text-gray-600">{cat?.name ?? "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {post.approved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {post.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <LitspaceActions id={post.id} title={post.title} approved={post.approved} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
