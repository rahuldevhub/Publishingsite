import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";
import { SITE_URL as SITE } from "@/lib/site";

// Refresh regularly without giving every crawler request a different sitemap.
export const revalidate = 3600;

function realDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function datedRoute(
  url: string,
  value: string | null | undefined,
  priority: number,
): MetadataRoute.Sitemap[number] {
  const lastModified = realDate(value);
  return {
    url,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: "monthly",
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  // Submit original, commercially useful pages that we want Google to
  // prioritise. Thin archives, author profiles, vacancies and UGC stay
  // accessible through the site but no longer consume sitemap crawl budget.
  const [books, blog, caseStudies] = await Promise.all([
    supabase.from("books").select("slug, updated_at"),
    supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true),
    supabase.from("case_studies").select("slug, updated_at").eq("published", true),
  ]);

  // Static pages deliberately omit lastModified: there is no trustworthy
  // persisted edit date for them. A false current date is worse than no date.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE}/packages`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE}/case-studies`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE}/books`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE}/aboutus`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE}/people-behind-ritera`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE}/litspace`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${SITE}/contact`, priority: 0.5, changeFrequency: "yearly" },
  ];

  const bookRoutes: MetadataRoute.Sitemap = (books.data ?? [])
    .filter((book) => Boolean(book.slug))
    .map((book) => datedRoute(`${SITE}/books/${book.slug}`, book.updated_at, 0.7));

  const blogRoutes: MetadataRoute.Sitemap = (blog.data ?? [])
    .filter((post) => Boolean(post.slug))
    .map((post) => datedRoute(`${SITE}/blog/${post.slug}`, post.updated_at, 0.8));

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudies.data ?? [])
    .filter((study) => Boolean(study.slug))
    .map((study) => datedRoute(`${SITE}/case-studies/${study.slug}`, study.updated_at, 0.8));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...bookRoutes];
}
