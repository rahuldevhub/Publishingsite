import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";
import { SITE_URL as SITE } from "@/lib/site";

// Force fresh data on every request — otherwise Next statically prerenders
// this route and caches the Supabase fetches indefinitely, producing a
// sitemap that goes stale across deploys instead of reflecting live content.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const [books, authors, litspace, blog, careers, caseStudies, blogCategories, litspaceCategories] = await Promise.all([
    supabase.from("books").select("slug, updated_at"),
    supabase.from("authors").select("slug, created_at"),
    supabase
      .from("litspace_posts")
      .select("slug, updated_at")
      .eq("approved", true),
    supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true),
    supabase.from("careers").select("slug, created_at").eq("status", "active"),
    supabase.from("case_studies").select("slug, updated_at").eq("published", true),
    supabase.from("blog_categories").select("slug"),
    supabase.from("litspace_categories").select("slug"),
  ]);

  const toDate = (v: string | null | undefined) =>
    v ? new Date(v) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE,                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/aboutus`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/packages`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/books`,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/litspace`,                     lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE}/litspace/submit`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/litspace/category`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.5 },
    { url: `${SITE}/blog`,                         lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE}/case-studies`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
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
    lastModified: toDate(a.created_at),
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
    lastModified: toDate(c.created_at),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudies.data ?? []).map((cs) => ({
    url: `${SITE}/case-studies/${cs.slug}`,
    lastModified: toDate(cs.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogCategoryRoutes: MetadataRoute.Sitemap = (blogCategories.data ?? []).map((c) => ({
    url: `${SITE}/blog/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const litspaceCategoryRoutes: MetadataRoute.Sitemap = (litspaceCategories.data ?? []).map((c) => ({
    url: `${SITE}/litspace/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...bookRoutes,
    ...authorRoutes,
    ...litspaceRoutes,
    ...blogRoutes,
    ...careerRoutes,
    ...caseStudyRoutes,
    ...blogCategoryRoutes,
    ...litspaceCategoryRoutes,
  ];
}
