import { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { LitspacePixelPageView, SubmitWorkButton } from "./LitspacePixelEvents";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "LitSpace | Community Writing Platform — Ritera Publishing",
  description:
    "LitSpace is a community for poets, writers, and storytellers. Share your work, discover new voices, and connect with readers on Ritera Publishing's creative platform.",
  openGraph: {
    title: "LitSpace — Share Your Story with the World",
    description:
      "A community platform for poets, writers, and storytellers. Discover and share creative writing on LitSpace by Ritera Publishing.",
    url: `${SITE_URL}/litspace`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LitSpace | Community Writing Platform",
    description: "Discover poems, stories, and articles from writers across India.",
  },
  alternates: { canonical: `${SITE_URL}/litspace` },
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  writer_name: string;
  created_at: string;
  featured: boolean;
  category: { id: string; name: string; slug: string } | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default async function LitspacePage() {
  const supabase = createServerClient();
  const [
    { data: categories },
    { data: posts },
    { data: allPostCategoryIds },
    { data: trendingPosts },
  ] = await Promise.all([
    supabase.from("litspace_categories").select("id, name, slug").order("name"),
    supabase
      .from("litspace_posts")
      .select(
        "id, title, slug, excerpt, writer_name, created_at, featured, category:litspace_categories(id, name, slug)"
      )
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(12),
    supabase.from("litspace_posts").select("category_id").eq("approved", true),
    supabase
      .from("litspace_posts")
      .select("id, title, slug, writer_name, created_at, category:litspace_categories(name, slug)")
      .eq("approved", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const typedPosts = (posts ?? []) as unknown as Post[];
  const typedCategories = (categories ?? []) as Category[];
  const typedTrending = (trendingPosts ?? []) as unknown as Post[];

  // Count posts per category
  const countMap =
    allPostCategoryIds?.reduce(
      (acc, p) => {
        if (p.category_id) acc[p.category_id] = (acc[p.category_id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) ?? {};

  const totalPosts = allPostCategoryIds?.length ?? 0;

  const featuredPost = typedPosts.find((p) => p.featured) ?? null;
  const regularPosts = typedPosts.filter((p) => p !== featuredPost);

  return (
    <main className="bg-white pt-16">
      <LitspacePixelPageView />
      {/* ── Submit Banner ── */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-300">
            Writers are publishing free on Litspace right now — your story is next.
          </p>
          <Link
            href="/litspace/submit"
            className="shrink-0 bg-white text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Submit Now →
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Ritera Publishing · LitSpace
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-3xl text-white">
            Your writing deserves to be read.
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
            Post your poems, short stories and articles on a global publishing platform. Get your own author profile. Share your published work anywhere. Free forever.
          </p>
          <p className="mt-3 text-sm text-gray-500 italic">
            {totalPosts} writers already published · Free to join
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {typedCategories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/litspace/category/${cat.slug}`}
                className="px-4 py-1.5 rounded-full border border-gray-600 text-sm text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <SubmitWorkButton className="litspace-submit-btn w-full sm:w-auto rounded-full text-white font-semibold transition-colors">
              + Submit Your Work
            </SubmitWorkButton>
          </div>
        </div>
      </section>

      {/* ── Content Area ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-10">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8 space-y-8">

              {/* Categories */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Browse Categories
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/litspace"
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors group"
                    >
                      <span className="font-medium">All Writeups</span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-600">{totalPosts}</span>
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

              {/* Trending / Featured */}
              {typedTrending.length > 0 && (
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Featured Picks
                  </h2>
                  <ul className="space-y-4">
                    {typedTrending.map((post) => {
                      const cat = post.category as { name: string; slug: string } | null;
                      return (
                        <li key={post.id}>
                          <Link href={`/litspace/${post.slug}`} className="group block">
                            {cat && (
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {cat.name}
                              </span>
                            )}
                            <p className="mt-0.5 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">{post.writer_name}</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Submit CTA */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-white text-sm mb-2">Share Your Story</h2>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Have a poem, story, or article to share? Submit it for review and get published on LitSpace.
                </p>
                <SubmitWorkButton className="block text-center bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  Submit Your Work →
                </SubmitWorkButton>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="lg:col-span-3">

            {/* Featured Post */}
            {featuredPost && (() => {
              const cat = featuredPost.category as { name: string; slug: string } | null;
              return (
                <Link
                  href={`/litspace/${featuredPost.slug}`}
                  className="group block mb-10 bg-gray-900 rounded-2xl p-8 text-white hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold bg-white/10 text-white px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                    {cat && (
                      <span className="text-xs text-gray-400">{cat.name}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-snug mb-3 group-hover:text-gray-200 transition-colors">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    By {featuredPost.writer_name} · {formatDate(featuredPost.created_at)}
                  </p>
                </Link>
              );
            })()}

            {/* Posts Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Latest Writeups</h2>
              {typedCategories.length > 0 && (
                <div className="flex gap-2 overflow-x-auto lg:hidden pb-1">
                  {typedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/litspace/category/${cat.slug}`}
                      className="shrink-0 text-xs font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {regularPosts.length === 0 && !featuredPost ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm mb-4">No posts published yet.</p>
                <Link
                  href="/litspace/submit"
                  className="inline-block text-sm font-semibold text-gray-900 border border-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Be the first to submit →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {regularPosts.map((post) => {
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
                        <Link
                          href={`/litspace/category/${cat.slug}`}
                          className="text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800 mb-2 transition-colors self-start"
                        >
                          {cat.name}
                        </Link>
                      )}
                      <Link href={`/litspace/${post.slug}`} className="flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
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
            )}

            {/* View All link */}
            {typedPosts.length >= 12 && (
              <div className="mt-10 text-center">
                <Link
                  href="/litspace/category"
                  className="inline-block text-sm font-semibold text-gray-900 border border-gray-900 px-6 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors"
                >
                  View All Posts →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Submit Banner ── */}
      <section className="lg:hidden bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Share Your Story</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Have a poem, story, or article? Submit it for review and get published on LitSpace.
          </p>
          <SubmitWorkButton className="inline-block bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
            Submit Your Work →
          </SubmitWorkButton>
        </div>
      </section>
    </main>
  );
}
