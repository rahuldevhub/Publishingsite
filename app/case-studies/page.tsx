import { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Author Success Stories — Case Studies",
  description:
    "Read real stories of Indian authors who successfully self-published their books with Ritera. Learn about their journey and results.",
  keywords: "self publishing success stories India, author case studies, Ritera reviews, book publishing results",
  openGraph: {
    title: "Author Success Stories — Case Studies",
    description:
      "Real stories of Indian authors who self-published successfully with Ritera Publishing.",
    url: `${SITE_URL}/case-studies`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/home/hero-library.webp`, width: 1200, height: 630, alt: "Ritera Publishing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Author Success Stories — Case Studies",
    description:
      "Real stories of Indian authors who self-published successfully with Ritera Publishing.",
    images: [`${SITE_URL}/images/home/hero-library.webp`],
  },
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  content: string | null;
  created_at: string;
};

export default async function CaseStudiesPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("case_studies")
    .select("id, title, slug, author_name, content, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const caseStudies = (data ?? []) as unknown as CaseStudy[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://riterapublishing.com/case-studies" },
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
          <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase mb-4">
            Author Success Stories
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-3xl">
            Real Authors. Real Results.
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
            Discover how authors across India turned their manuscripts into published books with global reach — with Ritera Publishing.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {caseStudies.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-20">No case studies published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
            Ready to Write Your Own Story?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
            Every case study here started with a manuscript.
          </h2>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Submit your manuscript today and our editorial team will respond within 12 days with a personalised{" "}
            <Link href="/packages" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              self-publishing plan
            </Link>{" "}
            tailored to your book and goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/packages"
              className="bg-amber-400 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-300 transition-colors"
            >
              View Publishing Packages →
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-white font-medium px-8 py-3.5 rounded-xl hover:border-white transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const preview = cs.content?.trim().slice(0, 160) ?? "";

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/case-studies/${cs.slug}`}>
          <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
            {cs.title}
          </h2>
        </Link>
        <p className="text-sm font-medium text-gray-500 mb-3">{cs.author_name}</p>
        {preview && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-5">{preview}</p>
        )}
        <Link
          href={`/case-studies/${cs.slug}`}
          className="mt-auto text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors"
        >
          Read Case Study →
        </Link>
      </div>
    </article>
  );
}
