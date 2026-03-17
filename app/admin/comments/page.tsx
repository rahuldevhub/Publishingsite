import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import CommentActions from "./CommentActions";

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { status } = await searchParams;

  let query = supabase
    .from("comments")
    .select(
      "id, author_name, content, approved, created_at, post:litspace_posts!litspace_post_id(id, title)"
    )
    .order("created_at", { ascending: false });

  if (status === "approved") query = query.eq("approved", true);
  if (status === "pending") query = query.eq("approved", false);

  const { data: comments, error } = await query;

  const pendingCount = comments?.filter((c) => !c.approved).length ?? 0;

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
            <h1 className="text-lg font-semibold text-gray-900">Comments</h1>
            {pendingCount > 0 && (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <form method="GET" className="flex items-center gap-3 mb-6">
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
          {status && (
            <Link
              href="/admin/comments"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load comments: {error.message}
          </div>
        )}

        {!comments?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No comments found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Post</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Author</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Comment</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comments.map((comment) => {
                  const post = comment.post as unknown as { id: string; title: string } | null;
                  const preview = comment.content.length > 80
                    ? comment.content.slice(0, 80) + "…"
                    : comment.content;

                  return (
                    <tr key={comment.id} className="hover:bg-gray-50 transition-colors align-top">
                      <td className="px-6 py-4 max-w-[180px]">
                        {post ? (
                          <Link
                            href={`/admin/litspace-posts/${post.id}/edit`}
                            className="text-gray-900 font-medium hover:underline truncate block"
                            title={post.title}
                          >
                            {post.title.length > 40
                              ? post.title.slice(0, 40) + "…"
                              : post.title}
                          </Link>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                        {comment.author_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs">
                        <CommentActions
                          id={comment.id}
                          authorName={comment.author_name}
                          content={comment.content}
                          approved={comment.approved}
                          preview={preview}
                          renderInline
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            comment.approved
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {comment.approved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(comment.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <CommentActions
                          id={comment.id}
                          authorName={comment.author_name}
                          content={comment.content}
                          approved={comment.approved}
                          preview={preview}
                          renderActions
                        />
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
