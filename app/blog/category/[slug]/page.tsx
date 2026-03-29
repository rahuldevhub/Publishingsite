import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";
const POSTS_PER_PAGE = 12;

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { slug } = await params;
  const { data: category } = await supabase
    .from("blog_categories")
    .select("name, slug")
    .eq("slug", slug)
    .single();

  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} | Ritera Publishing Blog`;
  const description = `Browse all articles about ${category.name} from the Ritera Publishing blog.`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/blog/category/${slug}`, type: "website" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `${SITE_URL}/blog/category/${slug}` },
  };
}

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  reading_time: number;
  created_at: string;
  author: { name: string } | null;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const supabase = createServerClient();
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data: category } = await supabase
    .from("blog_categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  const { data: posts, count } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, reading_time, created_at, author:authors(name)", {
      count: "exact",
    })
    .eq("published", true)
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  const typedPosts = (posts ?? []) as unknown as Post[];
  const totalPages = Math.ceil((count ?? 0) / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <ol className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-gray-900 font-medium" aria-current="page">{category.name}</li>
        </ol>
      </nav>

      {/* ── Category Header ── */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Category</p>
          <h1 className="text-4xl font-bold">{category.name}</h1>
          <p className="mt-2 text-gray-400 text-sm">
            {count ?? 0} {count === 1 ? "article" : "articles"}
          </p>
        </div>
      </header>

      {/* ── Posts Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {typedPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No posts in this category yet.</p>
            <Link href="/blog" className="text-sm font-medium text-gray-900 underline underline-offset-2">
              Back to all posts
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <img src="https://placehold.co/600x400" alt="Placeholder Image" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                  </Link>

                  <div className="flex flex-col flex-1 p-5">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                      <span>{post.author?.name ?? "Ritera Publishing"}</span>
                      <span className="flex items-center gap-3">
                        <span>{formatDate(post.created_at)}</span>
                        <span>{post.reading_time} min read</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/blog/category/${slug}?page=${page - 1}`}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog/category/${slug}?page=${p}`}
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
                    href={`/blog/category/${slug}?page=${page + 1}`}
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
  );
}
