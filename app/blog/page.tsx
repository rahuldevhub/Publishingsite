import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Blog — Insights, Tips & Publishing News",
  description:
    "Expert self-publishing tips for Indian authors — manuscript editing, cover design, ISBN guidance, and author success stories from Ritera Publishing.",
  openGraph: {
    title: "Ritera Publishing Blog",
    description:
      "Expert insights on self-publishing, author tips, industry trends, and creative inspiration.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritera Publishing Blog",
    description: "Expert insights on self-publishing, author tips, and industry trends.",
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  reading_time: number;
  created_at: string;
  category: { id: string; name: string; slug: string } | null;
  author: { name: string } | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const POSTS_PER_PAGE = 12;

type PageProps = { searchParams: Promise<{ page?: string }> };

export default async function BlogPage({ searchParams }: PageProps) {
  const supabase = createServerClient();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const [{ data: categories }, { data: posts, count }, { data: publishedPosts }] = await Promise.all([
    supabase.from("blog_categories").select("id, name, slug").order("name"),
    supabase
      .from("blog_posts")
      .select(
        "id, title, slug, excerpt, featured_image, reading_time, created_at, category:blog_categories(id, name, slug), author:authors(name)",
        { count: "exact" }
      )
      .eq("published", true)
      .order("created_at", { ascending: false })
      .range(from, to),
    supabase.from("blog_posts").select("category_id").eq("published", true),
  ]);

  const totalPages = Math.ceil((count ?? 0) / POSTS_PER_PAGE);

  // Count posts per category
  const countMap =
    publishedPosts?.reduce(
      (acc, p) => {
        if (p.category_id) acc[p.category_id] = (acc[p.category_id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) ?? {};

  const typedPosts = (posts ?? []) as unknown as Post[];
  const typedCategories = (categories ?? []) as Category[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://riterapublishing.com/blog" },
    ],
  };

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Ritera Publishing Blog
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-3xl">
            Stories, Insights &amp; Publishing News
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
            Expert advice for authors using self publishing services, insights into the publishing industry, literary inspiration, and practical guidance to help you publish your book in India and worldwide, all from the Ritera Publishing team.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {typedCategories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="px-4 py-2 rounded-full border border-gray-600 text-sm text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      {typedCategories.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {typedCategories.map((cat) => {
                const count = countMap[cat.id] ?? 0;
                return (
                  <Link
                    key={cat.id}
                    href={`/blog/category/${cat.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {count} {count === 1 ? "article" : "articles"}
                    </p>
                    <span className="mt-3 inline-block text-xs font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
                      Browse →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Latest Posts ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {page > 1 ? `All Articles — Page ${page}` : "Latest Articles"}
          </h2>
          {typeof count === "number" && count > 0 && (
            <p className="text-sm text-gray-400">{count} guides</p>
          )}
        </div>

        {typedPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">No posts published yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={page - 1 === 1 ? "/blog" : `/blog?page=${page - 1}`}
                    rel="prev"
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={p === 1 ? "/blog" : `/blog?page=${p}`}
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
                    href={`/blog?page=${page + 1}`}
                    rel="next"
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </main>
    </>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://placehold.co/600x400" alt="Placeholder Image" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800 mb-2 transition-colors"
          >
            {post.category.name}
          </Link>
        )}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span>{post.author?.name ?? "Ritera Publishing"}</span>
          <span className="flex items-center gap-3">
            <span>{formatDate(post.created_at)}</span>
            <span>{post.reading_time} min read</span>
          </span>
        </div>
      </div>
    </article>
  );
}
