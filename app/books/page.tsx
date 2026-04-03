import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";
const BOOKS_PER_PAGE = 16;

export const metadata: Metadata = {
  title: "Books | Ritera Publishing — Discover Our Published Collection",
  description:
    "Explore the complete catalogue of books published by Ritera Publishing. Fiction, poetry, non-fiction, and more — authored by talented Indian writers.",
  openGraph: {
    title: "Books by Ritera Publishing",
    description: "Discover our curated collection of books across genres, authored by talented Indian writers.",
    url: `${SITE_URL}/books`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Books | Ritera Publishing",
    description: "Explore our curated collection of published books.",
  },
  alternates: { canonical: `${SITE_URL}/books` },
};

type PageProps = {
  searchParams: Promise<{
    genre?: string;
    format?: string;
    language?: string;
    sort?: string;
    q?: string;
    page?: string;
  }>;
};

type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image: string | null;
  genre: string;
  format: string;
  language: string;
  featured: boolean;
  created_at: string;
  author: { id: string; name: string; slug: string } | null;
};

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

export default async function BooksPage({ searchParams }: PageProps) {
  const supabase = createServerClient();
  const { genre, format, language, sort, q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * BOOKS_PER_PAGE;
  const to = from + BOOKS_PER_PAGE - 1;

  // Fetch filter option values from all books
  const { data: allBooks } = await supabase.from("books").select("genre, format, language");
  const genres = [...new Set((allBooks ?? []).map((b) => b.genre).filter(Boolean))].sort() as string[];
  const formats = [...new Set((allBooks ?? []).map((b) => b.format).filter(Boolean))].sort() as string[];
  const languages = [...new Set((allBooks ?? []).map((b) => b.language).filter(Boolean))].sort() as string[];

  // Build filtered + sorted query
  let query = supabase
    .from("books")
    .select(
      "id, title, subtitle, slug, cover_image, genre, format, language, featured, created_at, author:authors(id, name, slug)",
      { count: "exact" }
    );

  if (genre) query = query.eq("genre", genre);
  if (format) query = query.eq("format", format);
  if (language) query = query.eq("language", language);
  if (q) query = query.ilike("title", `%${q}%`);

  const sortMap: Record<string, { col: string; asc: boolean }> = {
    latest: { col: "created_at", asc: false },
    oldest: { col: "created_at", asc: true },
    title_az: { col: "title", asc: true },
    title_za: { col: "title", asc: false },
  };

  if (!sort || sort === "display") {
    // Default: respect admin-defined display_order
    query = query
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })
      .range(from, to);
  } else {
    const { col, asc } = sortMap[sort] ?? sortMap.latest;
    query = query.order(col, { ascending: asc }).range(from, to);
  }

  const { data: books, count } = await query;
  const typedBooks = (books ?? []) as unknown as Book[];
  const totalPages = Math.ceil((count ?? 0) / BOOKS_PER_PAGE);

  const hasFilters = genre || format || language || q;

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Ritera Publishing
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-3xl text-white">
            Discover Our Published Books
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
            A curated collection of novels, stories, poems, and ideas from talented authors published through our self-publishing platform. Every book represents a journey discover what’s possible when you publish your book in India and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {genres.slice(0, 5).map((g) => (
              <Link
                key={g}
                href={`/books?genre=${encodeURIComponent(g)}`}
                className="px-4 py-1.5 rounded-full border border-gray-600 text-sm text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Sort Bar ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <form method="GET" className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search books…"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {genres.length > 1 && (
              <select name="genre" defaultValue={genre ?? ""} className={selectClass}>
                <option value="">All Genres</option>
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            )}
            {formats.length > 1 && (
              <select name="format" defaultValue={format ?? ""} className={selectClass}>
                <option value="">All Formats</option>
                {formats.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            )}
            {languages.length > 1 && (
              <select name="language" defaultValue={language ?? ""} className={selectClass}>
                <option value="">All Languages</option>
                {languages.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            )}

            <select name="sort" defaultValue={sort ?? "display"} className={selectClass}>
              <option value="display">Featured Order</option>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title_az">Title A–Z</option>
              <option value="title_za">Title Z–A</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Apply
            </button>
            {hasFilters && (
              <Link href="/books" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Clear
              </Link>
            )}
          </form>
        </div>
      </div>

      {/* ── Books Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            {count ?? 0} {(count ?? 0) === 1 ? "book" : "books"}
            {q && <span> matching &ldquo;{q}&rdquo;</span>}
          </p>
        </div>

        {typedBooks.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-200">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No books found</h2>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term.</p>
            <Link href="/books" className="text-sm font-medium text-gray-900 underline underline-offset-2">
              View all books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {typedBooks.map((book) => {
              const author = book.author as { name: string; slug: string } | null;
              return (
                <article key={book.id} className="group flex flex-col">
                  {/* Cover */}
                  <Link href={`/books/${book.slug}`} className="block relative aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                    {book.cover_image ? (
                      <Image
                        src={book.cover_image}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                      />
                    ) : (
                      <img src="https://placehold.co/400x600" alt="Placeholder Image" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {book.featured && (
                      <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {book.genre}
                    </span>
                    <Link href={`/books/${book.slug}`}>
                      <h2 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors mb-1">
                        {book.title}
                      </h2>
                    </Link>
                    {author && (
                      <p className="text-xs text-gray-500 mb-2">by {author.name}</p>
                    )}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {book.format}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {book.language}
                      </span>
                    </div>
                    <Link
                      href={`/books/${book.slug}`}
                      className="mt-auto text-center text-xs font-semibold text-gray-900 border border-gray-900 px-3 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/books?${new URLSearchParams({ ...(genre && { genre }), ...(format && { format }), ...(language && { language }), ...(sort && { sort }), ...(q && { q }), page: String(page - 1) })}`}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </Link>
            )}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/books?${new URLSearchParams({ ...(genre && { genre }), ...(format && { format }), ...(language && { language }), ...(sort && { sort }), ...(q && { q }), page: String(p) })}`}
                  aria-current={p === page ? "page" : undefined}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
            {page < totalPages && (
              <Link
                href={`/books?${new URLSearchParams({ ...(genre && { genre }), ...(format && { format }), ...(language && { language }), ...(sort && { sort }), ...(q && { q }), page: String(page + 1) })}`}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
