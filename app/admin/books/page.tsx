import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import BookActions from "./BookActions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; featured?: string }>;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { genre, featured } = await searchParams;

  // Fetch distinct genres for filter dropdown
  const { data: allBooks } = await supabase.from("books").select("genre");
  const genres = [...new Set(allBooks?.map((b) => b.genre).filter(Boolean))].sort();

  // Build query with author join
  let query = supabase
    .from("books")
    .select("id, title, slug, cover_image, genre, format, featured, published_date, author:authors(id, name)")
    .order("created_at", { ascending: false });

  if (genre) query = query.eq("genre", genre);
  if (featured === "true") query = query.eq("featured", true);
  if (featured === "false") query = query.eq("featured", false);

  const { data: books, error } = await query;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Books</h1>
          </div>
          <Link
            href="/admin/books/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add New Book
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <form method="GET" className="flex items-center gap-3 mb-6">
          <select name="genre" defaultValue={genre ?? ""} className={selectClass}>
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select name="featured" defaultValue={featured ?? ""} className={selectClass}>
            <option value="">All Books</option>
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Filter
          </button>
          {(genre || featured) && (
            <Link
              href="/admin/books"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load books: {error.message}
          </div>
        )}

        {!books?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No books found.</p>
            <Link href="/admin/books/new" className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-2">
              Add your first book
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Cover</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Author</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Genre</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Format</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Featured</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((book) => {
                  const author = book.author as unknown as { name: string } | null;
                  return (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        {book.cover_image ? (
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-10 h-14 object-cover rounded shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-14 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-900 max-w-xs">
                        <div className="truncate">{book.title}</div>
                      </td>
                      <td className="px-6 py-3 text-gray-600">{author?.name ?? "—"}</td>
                      <td className="px-6 py-3 text-gray-600">{book.genre}</td>
                      <td className="px-6 py-3 text-gray-600">{book.format}</td>
                      <td className="px-6 py-3">
                        {book.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <BookActions id={book.id} title={book.title} />
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
