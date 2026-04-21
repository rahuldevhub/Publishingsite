import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import DownloadButton from "@/app/components/DownloadButton";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

type PageProps = { params: Promise<{ slug: string }> };
type FaqItem = { question: string; answer: string };

// ── generateMetadata ──────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data: cs } = await supabase
    .from("case_studies")
    .select("title, meta_title, meta_description, keywords, author_name")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!cs) return { title: "Case Study Not Found" };

  const title = cs.meta_title || `${cs.title} | Ritera Publishing`;
  const description = cs.meta_description || "";
  const url = `${SITE_URL}/case-studies/${slug}`;

  return {
    title,
    description,
    keywords: cs.keywords || "self publishing success story India, Ritera Publishing",
    authors: [{ name: cs.author_name }],
    publisher: "Ritera Publishing",
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: cs.meta_title || cs.title,
      description,
      url,
      type: "article",
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: cs } = await supabase
    .from("case_studies")
    .select("id, title, slug, author_name, book_title, content, pdf_url, faq_data, keywords, meta_title, meta_description, created_at, updated_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!cs) notFound();

  const faqItems = (cs.faq_data as unknown as FaqItem[] | null) ?? null;

  // Related case studies
  const { data: related } = await supabase
    .from("case_studies")
    .select("id, title, slug, author_name")
    .eq("published", true)
    .neq("id", cs.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // JSON-LD
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    datePublished: cs.created_at,
    dateModified: cs.updated_at,
    author: { "@type": "Person", name: cs.author_name },
    publisher: { "@type": "Organization", name: "Ritera Publishing", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/case-studies/${slug}` },
  };

  const faqLd = faqItems && faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://riterapublishing.com/case-studies" },
      { "@type": "ListItem", position: 3, name: cs.title, item: `https://riterapublishing.com/case-studies/${cs.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {/* JSON-LD — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-white text-gray-900">
        {/* ── Breadcrumb ── */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <ol className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href="/case-studies" className="hover:text-gray-900 transition-colors">Case Studies</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">{cs.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
          {/* ── Top: Title + Author + Download CTA ── */}
          <header className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {cs.title}
            </h1>
            <p className="text-base text-gray-500 font-medium mb-1">{cs.author_name}</p>
            {cs.book_title && (
              <p className="text-sm text-gray-400 italic mb-8">{cs.book_title}</p>
            )}

            {cs.pdf_url && (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Download the Full Case Study (PDF)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Free — enter your name and email to get instant access.</p>
                </div>
                <DownloadButton pdfUrl={cs.pdf_url} sourceSlug={cs.slug} />
              </div>
            )}
          </header>

          {/* ── Content ── */}
          {cs.content && (
            <section className="mb-14">
              <div className="space-y-5">
                {cs.content.split(/\n\n+/).map((para: string, i: number) => {
                  if (para.startsWith("## ")) {
                    return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-2">{para.slice(3)}</h2>;
                  }
                  return <p key={i} className="text-gray-700 leading-relaxed text-lg">{para}</p>;
                })}
              </div>
            </section>
          )}

          {/* ── Bottom Download CTA ── */}
          {cs.pdf_url && (
            <section className="mb-14">
              <div className="p-8 bg-gray-900 rounded-2xl text-center">
                <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">Free Download</p>
                <h2 className="text-xl font-bold text-white mb-2">Get the Full Case Study PDF</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Take this story with you — printable, shareable, and free.
                </p>
                <div className="flex justify-center">
                  <DownloadButton pdfUrl={cs.pdf_url} sourceSlug={cs.slug} />
                </div>
              </div>
            </section>
          )}

          {/* ── FAQ ── */}
          {faqItems && faqItems.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Related case studies ── */}
        {related && related.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-6 py-14">
              <h2 className="text-xl font-bold text-gray-900 mb-6">More Success Stories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(related as unknown as Array<{ id: string; title: string; slug: string; author_name: string }>).map((r) => (
                  <Link
                    key={r.id}
                    href={`/case-studies/${r.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors mb-1">{r.title}</h3>
                    <p className="text-xs text-gray-500">{r.author_name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
