import { Metadata } from "next";
import Link from "next/link";
import CustomBuilder from "./CustomBuilder";
import PackagesComparisonTable from "./PackagesComparisonTable";
import { PACKAGES_RESOURCES } from "@/lib/internal-links";
import { SITE_URL } from "@/lib/site";


export const metadata: Metadata = {
  title: "Publishing Packages & Pricing",
  description:
    "Starting ₹11,999 for Indian authors. International pricing available in USD. All packages include 100% royalties, professional editing, cover design, and global distribution.",
  openGraph: {
    title: "Self-Publishing Packages | Ritera Publishing",
    description:
      "Publishing packages starting ₹11,999. 100% royalties, expert editing, cover design, and global distribution support.",
    url: `${SITE_URL}/packages`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/home/hero-library.webp`, width: 1200, height: 630, alt: "Ritera Publishing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishing Packages | Ritera Publishing",
    description: "Publishing packages starting ₹11,999. 100% royalties, professional editing, cover design, and global distribution.",
    images: [`${SITE_URL}/images/home/hero-library.webp`],
  },
  alternates: { canonical: `${SITE_URL}/packages` },
};

// ── Package names for JSON-LD schema ─────────────────────────────────────────

const PACKAGES = [
  { id: "essential",  name: "Essential" },
  { id: "standard",  name: "Standard" },
  { id: "advanced",  name: "Advanced" },
  { id: "elite",     name: "Elite" },
  { id: "premium",   name: "Premium" },
  { id: "exclusive", name: "Exclusive" },
];

const FAQ_ITEMS = [
  {
    q: "How do I choose the right book publishing package in India?",
    a: "Choose a package based on your needs — editing, design, and distribution. The right book publishing package in India should match your goals and budget.",
  },
  {
    q: "Are there affordable options for book publishing in India?",
    a: "Yes, many platforms offer affordable book publishing in India with flexible pricing based on the services you select.",
  },
  {
    q: "Does a publishing package include book printing and distribution?",
    a: "Most packages include book printing and publishing in India, along with online distribution across major platforms.",
  },
  {
    q: "Will I get help with e-book publishing in a package?",
    a: "Yes, many packages include e-book publishing services, allowing your book to reach readers on digital platforms worldwide.",
  },
  {
    q: "Do publishing packages include manuscript editing and formatting?",
    a: "Yes, most professional packages include manuscript editing services and formatting to prepare your book for publishing.",
  },
];

// ── Schema ───────────────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Self-Publishing Services",
  provider: {
    "@type": "Organization",
    "@id": "https://riterapublishing.com/#organization",
    name: "Ritera Publishing",
  },
  areaServed: "IN",
  description:
    "End-to-end self-publishing services including manuscript editing, book cover design, interior formatting, ISBN registration, and global distribution through major platforms.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Publishing Packages",
    itemListElement: PACKAGES.map((pkg) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${pkg.name} Publishing Package`,
      },
    })),
  },
};

// ── Page ─────────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
    { "@type": "ListItem", position: 2, name: "Packages", item: "https://riterapublishing.com/packages" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PackagesPage() {
  return (
    <>
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Self-Publishing Packages
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white max-w-4xl mx-auto">
            Ritera&apos;s Packages — Crafted for Every Author
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From first-time author publishing in India to experienced writers looking to scale, we offer flexible self publishing packages tailored to your goals. 
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages"
              className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Compare Packages
            </a>
            <a
              href="#custom-builder"
              className="border border-gray-600 text-white font-medium px-8 py-3.5 rounded-xl hover:border-white transition-colors"
            >
              Build Custom Package
            </a>
          </div>
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { stat: "24/7", label: "Expert Support" },
              { stat: "100%", label: "Author Royalties" },
              { stat: "160+", label: "Countries Reached" },
              { stat: "4.9/5", label: "Author Satisfaction" },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <div className="text-3xl font-bold text-white">{item.stat}</div>
                <div className="text-sm text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <PackagesComparisonTable />

      {/* ── Why Choose Ritera ── */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Ritera?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                title: "Complete Publishing Support",
                body: "From manuscript to marketplace — we handle every step: editing, design, formatting, distribution, and beyond.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
                  </svg>
                ),
                title: "100% Royalties to You",
                body: "Every rupee your book earns is yours. No revenue sharing, no hidden cuts. You write it, you own it, you keep it all.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
                  </svg>
                ),
                title: "International Distribution",
                body: "Your book will be available on Amazon, Flipkart, and 40000+ global platforms — reaching readers across India and worldwide.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
                title: "Personalised Author Care",
                body: "A dedicated publishing manager works with you from day one. You're never just a ticket number — you're a partner.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publishing Resources ── */}
      <section className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              Before You Decide
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Understand What Goes Into Your Book
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Every package covers these essentials. Read the guides to see exactly what each stage
              involves before you choose.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES_RESOURCES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-900 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-gray-700 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{guide.blurb}</p>
                <span className="mt-4 text-sm font-semibold text-gray-900 group-hover:translate-x-0.5 transition-transform inline-block">
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Package Builder ── */}
      <section id="custom-builder" className="scroll-mt-8">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Need Something Different? Build Your Own Package
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Select only the services you need, and we&apos;ll create a custom quote tailored to your book and budget.
            </p>
          </div>
          <CustomBuilder />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            Not Sure Which Package Is Right for You?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            You can customize your package, or reach out to us for a free consultation call. Our publishing experts will guide you through every step of the journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#custom-builder"
              className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Customize Your Package
            </a>
            <a
              href="tel:+919488854787"
              className="flex items-center gap-2.5 border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call +91-94888-54787
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                <span>{item.q}</span>
                <svg
                  className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-block bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Contact Our Team →
          </Link>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
            See the Results
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Not sure what to expect? Let our authors show you.
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
            Read real publishing journeys from authors across India — from first manuscript to global bookshelf.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm"
            >
              Read Author Case Studies →
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-colors text-sm"
            >
              Browse Published Books →
            </Link>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
