import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import BooksTable from "./BooksTableClient";

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; featured?: string }>;
}) {
  const supabase = createServerClient();
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
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

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
          <BooksTable initialBooks={books as any} />
        )}
      </main>
    </div>
  );
}
