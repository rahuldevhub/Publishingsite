import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const [books, authors, litspace, blog, careers] = await Promise.all([
    supabase.from("books").select("slug, updated_at").eq("published", true),
    supabase.from("authors").select("slug, updated_at"),
    supabase
      .from("litspace_posts")
      .select("slug, updated_at")
      .eq("status", "published"),
    supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true),
    supabase.from("careers").select("slug, updated_at").eq("active", true),
  ]);

  const toDate = (v: string | null | undefined) =>
    v ? new Date(v) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE,                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/aboutus`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/packages`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/books`,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/authors`,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE}/litspace`,                     lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE}/blog`,                         lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE}/careers`,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE}/contact`,                      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE}/people-behind-ritera`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/privacy-policy`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/terms-of-service`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const bookRoutes: MetadataRoute.Sitemap = (books.data ?? []).map((b) => ({
    url: `${SITE}/books/${b.slug}`,
    lastModified: toDate(b.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const authorRoutes: MetadataRoute.Sitemap = (authors.data ?? []).map((a) => ({
    url: `${SITE}/authors/${a.slug}`,
    lastModified: toDate(a.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const litspaceRoutes: MetadataRoute.Sitemap = (litspace.data ?? []).map((p) => ({
    url: `${SITE}/litspace/${p.slug}`,
    lastModified: toDate(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blog.data ?? []).map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: toDate(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const careerRoutes: MetadataRoute.Sitemap = (careers.data ?? []).map((c) => ({
    url: `${SITE}/careers/${c.slug}`,
    lastModified: toDate(c.updated_at),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...bookRoutes,
    ...authorRoutes,
    ...litspaceRoutes,
    ...blogRoutes,
    ...careerRoutes,
  ];
}
