import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 12;

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  writer_name: string;
  created_at: string;
  featured: boolean;
  category: { name: string; slug: string } | null;
};

type Category = { id: string; name: string; slug: string };

export const metadata: Metadata = {
  title: "All Writeups | LitSpace — Ritera Publishing",
  description:
    "Browse every poem, short story, essay and article shared by the LitSpace community on Ritera Publishing.",
  openGraph: {
    title: "All Writeups | LitSpace — Ritera Publishing",
    description:
      "Browse every poem, short story, essay and article shared by the LitSpace community on Ritera Publishing.",
    url: `${SITE_URL}/litspace/category`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/home/hero-library.webp`, width: 1200, height: 630, alt: "Ritera Publishing" }],
  },
  twitter: {
    card: "summary",
    title: "All Writeups | LitSpace — Ritera Publishing",
    images: [`${SITE_URL}/images/home/hero-library.webp`],
  },
  alternates: { canonical: `${SITE_URL}/litspace/category` },
};

export default async function LitspaceAllCategoriesPage({ searchParams }: PageProps) {
  const supabase = createServerClient();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const [{ data: allCategories }, { data: allPostCategoryIds }] = await Promise.all([
    supabase.from("litspace_categories").select("id, name, slug").order("name"),
    supabase.from("litspace_posts").select("category_id").eq("approved", true),
  ]);

  const { data: posts, count } = await supabase
    .from("litspace_posts")
    .select(
      "id, title, slug, excerpt, writer_name, created_at, featured, category:litspace_categories(name, slug)",
      { count: "exact" }
    )
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  const typedPosts = (posts ?? []) as unknown as Post[];
  const typedCategories = (allCategories ?? []) as Category[];
  const totalPages = Math.ceil((count ?? 0) / POSTS_PER_PAGE);

  const countMap =
    allPostCategoryIds?.reduce(
      (acc, p) => {
        if (p.category_id) acc[p.category_id] = (acc[p.category_id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) ?? {};

  const totalPosts = allPostCategoryIds?.length ?? 0;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "LitSpace", item: "https://riterapublishing.com/litspace" },
      { "@type": "ListItem", position: 3, name: "All Writeups", item: `${SITE_URL}/litspace/category` },
    ],
  };

  return (
    <>
      {/* JSON-LD — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="bg-white">
      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <ol className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li><Link href="/litspace" className="hover:text-gray-900 transition-colors">LitSpace</Link></li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium" aria-current="page">All Writeups</li>
        </ol>
      </nav>

      {/* ── Header ── */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            LitSpace · Category
          </p>
          <h1 className="text-4xl font-bold text-white">All Writeups</h1>
          <p className="mt-2 text-gray-400 text-sm">
            {count ?? 0} {count === 1 ? "writeup" : "writeups"}
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-10">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Browse Categories
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/litspace/category"
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-sm bg-gray-900 text-white transition-colors group"
                    >
                      <span className="font-medium">All Writeups</span>
                      <span className="text-xs text-gray-300">{totalPosts}</span>
                    </Link>
                  </li>
                  {typedCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/litspace/category/${cat.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors group"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-600">
                          {countMap[cat.id] ?? 0}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-white text-sm mb-2">Share Your Story</h2>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Submit your own writing to be published on LitSpace.
                </p>
                <Link
                  href="/litspace/submit"
                  className="block text-center bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Submit Now →
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Posts ── */}
          <div className="lg:col-span-3">
            {typedPosts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm mb-4">No posts yet.</p>
                <Link href="/litspace" className="text-sm font-medium text-gray-900 underline underline-offset-2">
                  Back to LitSpace
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {typedPosts.map((post) => {
                    const cat = post.category as { name: string; slug: string } | null;
                    const preview = post.excerpt
                      ? post.excerpt.slice(0, 100) + (post.excerpt.length > 100 ? "…" : "")
                      : null;
                    return (
                      <article
                        key={post.id}
                        className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col"
                      >
                        {cat && (
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            {cat.name}
                          </span>
                        )}
                        <Link href={`/litspace/${post.slug}`} className="flex-1 flex flex-col">
                          <h2 className="font-bold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h2>
                          {preview && (
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                              {preview}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                            <span className="font-medium">{post.writer_name}</span>
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                  <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Link
                        href={`/litspace/category?page=${page - 1}`}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        ← Previous
                      </Link>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={`/litspace/category?page=${p}`}
                          aria-current={p === page ? "page" : undefined}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                            p === page
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                    {page < totalPages && (
                      <Link
                        href={`/litspace/category?page=${page + 1}`}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Next →
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
