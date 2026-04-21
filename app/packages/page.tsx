import { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import CustomBuilder from "./CustomBuilder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Publishing Packages & Pricing | Ritera Publishing",
  description:
    "Ritera Publishing offers 6 self-publishing packages starting at ₹8,999, ranging from Essential to Exclusive. Each package includes professional editing, cover design, ISBN registration, and global distribution. Authors keep 100% of royalties across all tiers.",
  openGraph: {
    title: "Self-Publishing Packages | Ritera Publishing",
    description:
      "Professional self-publishing packages from ₹8,999. 100% royalties, expert editing, cover design, and distribution support.",
    url: `${SITE_URL}/packages`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishing Packages | Ritera Publishing",
    description: "6 self-publishing packages from ₹8,999 to ₹1,19,999. 100% royalties.",
  },
  alternates: { canonical: `${SITE_URL}/packages` },
};

// ── Package + Feature Data ────────────────────────────────────────────────────

type Val = true | false | "add-on" | string;

const PACKAGES = [
  { id: "essential",  name: "Essential",  price: 11999,   popular: false, badge: "" },
  { id: "standard",  name: "Standard",   price: 18999,  popular: false, badge: "" },
  { id: "advanced",  name: "Advanced",   price: 32999,  popular: true,  badge: "Most Popular" },
  { id: "elite",     name: "Elite",      price: 54999,  popular: false, badge: "" },
  { id: "premium",   name: "Premium",    price: 84999,  popular: false, badge: "" },
  { id: "exclusive", name: "Exclusive",  price: 119999, popular: false, badge: "Best Value" },
];

const FEATURES: { category: string; label: string; highlight?: boolean; values: Val[] }[] = [
  // Publishing Essentials
  { category: "Publishing Essentials", label: "Dedicated Publishing Manager",      values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "ISBN Registration",                  values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Copyright Registration",             values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: " Royalty",           values: ["100%", "100%", "100%", "100%", "100%", "100%"] },
  { category: "Publishing Essentials", label: " Author Dashboard",          values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Indian Distribution",                values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "International Distribution",         values: [false, false, true, true, true, true] },
  { category: "Publishing Essentials", label: "E-Book Publishing",                  values: [false, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Certificate of Publication",         values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Digital Proof",         values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Author Copies",                      values: ["5", "5", "10", "15", "25", "50"] },
  { category: "Publishing Essentials", label: "Profit Payout",                      values: ["On demand", "On demand", "On demand", "On demand", "On demand", "On demand"] },
  { category: "Publishing Essentials", label: "Post Publishing Support",            values: [true, true, true, true, true, true] },
  // Design & Formatting
  { category: "Design & Formatting", label: "Cover Design",                         values: ["Basic", "Standard", "Premium", "Premium", "Premium", "Premium"] },
  { category: "Design & Formatting", label: "Interior Formatting",                  values: ["Basic", "Standard", "Premium", "Premium", "Premium", "Premium"] },
  { category: "Design & Formatting", label: "Design Samples",                      values: ["1", "1", "2", "3", "3", "3"] },
  { category: "Design & Formatting", label: "Design Revisions",                            values: ["1", "2", "3", "5", "Unlimited", "Unlimited"] },
  { category: "Design & Formatting", label: "Hardcover Edition",                    values: [false, false, false, false, true, true] },
  { category: "Design & Formatting", label: "Post Publishing Revision",          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },

  // Editing Services
  { category: "Editing Services",    label: "Beta Reading",                          values: [false, false, true, true, true, true] },
  { category: "Editing Services",    label: "Proofreading",                         values: [false, false, false, false, true, true] },
  { category: "Editing Services",    label: "Copy Editing",                          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Developmental Editing",                values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Rewriting",                          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Revision Rounds",                       values: ["1", "2", "3", "5", "Unlimited", "Unlimited"] },




  // Marketing & Promotion
  { category: "Marketing & Promotion", label: "Author Profile Page",                values: [true, true, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Author Website",                     values: [false, true, false, false, true, false] },
  { category: "Marketing & Promotion", label: "Book Reviews",                       values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Social Media Promotion",             values: [false, false, true, true, true ,true] },
  { category: "Marketing & Promotion", label: "Kindle Promotions",                  values: [false, false, true, true, true, true] },
  
  { category: "Marketing & Promotion", label: "Author Branding Kit",                values: [false, false, "Basic", "Strandard", "Premium" ,"Exclusive"] },
  { category: "Marketing & Promotion", label: "Author Awards",                      values: [false, false, false, true, true, true] },
  { category: "Marketing & Promotion", label: "Book Trailer",                       values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Prime Placement",             values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Sponsored Ads Setup ",        values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Sponsored Ads",              values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Amazon A+ Listing",              values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Book Launch Event",                  values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Press Release",                      values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },

  // Additional Services
  { category: "Additional Services", label: "Audio Book Production", highlight: true, values: [false, false, "add-on", "add-on", "add-on", true] },
  { category: "Additional Services", label: "Additional Copies",          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Additional Services", label: "Bulk Printing",  values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Additional Services", label: "Priority Support",                     values: [false, false, false, true, true, true] },
  { category: "Additional Services", label: "Dedicated Account Manager",            values: [false, false, false, false, true, true] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function renderVal(val: Val, popular: boolean) {
  if (val === true)
    return (
      <svg className={`w-5 h-5 mx-auto ${popular ? "text-amber-600" : "text-green-500"}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
      </svg>
    );
  if (val === false)
    return <span className="text-gray-300 text-base select-none">—</span>;
  if (val === "add-on")
    return (
      <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
        Add-on
      </span>
    );
  return <span className="text-sm font-semibold text-gray-800">{val}</span>;
}

// Group features by category
function groupFeatures(features: typeof FEATURES) {
  const map = new Map<string, typeof FEATURES>();
  for (const f of features) {
    if (!map.has(f.category)) map.set(f.category, []);
    map.get(f.category)!.push(f);
  }
  return map;
}

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

export default function PackagesPage() {
  const grouped = groupFeatures(FEATURES);

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
      <section id="packages" className="scroll-mt-8">
        <div className="max-w-[1400px] mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Compare All Packages</h2>
            <p className="mt-2 text-gray-500 text-sm">Scroll right on mobile to see all packages</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm" style={{ minWidth: "900px" }}>
              <thead>
                <tr>
                  {/* Corner cell */}
                  <th className="sticky left-0 top-0 z-30 bg-gray-50 border-b border-r border-gray-200 px-5 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide w-[200px] min-w-[200px]">
                    Features
                  </th>
                  {PACKAGES.map((pkg, i) => (
                    <th
                      key={pkg.id}
                      className={`sticky top-0 z-20 border-b border-gray-200 px-4 py-5 text-center min-w-[140px] ${
                        pkg.popular
                          ? "bg-amber-50 border-b-2 border-b-amber-400"
                          : "bg-gray-50"
                      } ${i < PACKAGES.length - 1 ? "border-r border-gray-200" : ""}`}
                    >
                      {pkg.popular && (
                        <span className="block bg-amber-500 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2 mx-auto w-fit">
                          ★ Most Popular
                        </span>
                      )}
                      {pkg.badge && !pkg.popular && (
                        <span className="block bg-gray-800 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2 mx-auto w-fit">
                          {pkg.badge}
                        </span>
                      )}
                      <div className={`font-bold text-base ${pkg.popular ? "text-amber-700" : "text-gray-900"}`}>
                        {pkg.name}
                      </div>
                      <div className={`text-xl font-black mt-1 ${pkg.popular ? "text-amber-600" : "text-gray-900"}`}>
                        {formatPrice(pkg.price)}
                      </div>
                      <Link
                        href="/contact"
                        className={`mt-3 inline-block text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                          pkg.popular
                            ? "bg-amber-500 text-white hover:bg-amber-600"
                            : "bg-gray-900 text-white hover:bg-gray-700"
                        }`}
                      >
                        Get Started
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Array.from(grouped.entries()).map(([category, rows]) => (
                  <Fragment key={category}>
                    {/* Category separator */}
                    <tr>
                      <td
                        colSpan={7}
                        className="sticky left-0 bg-gray-100 border-y border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-widest"
                      >
                        {category}
                      </td>
                    </tr>

                    {/* Feature rows */}
                    {rows.map((feature, rowIdx) => (
                      <tr
                        key={feature.label}
                        className={`${
                          feature.highlight
                            ? "bg-amber-50/60"
                            : rowIdx % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50/50"
                        } hover:bg-blue-50/30 transition-colors`}
                      >
                        {/* Feature name — sticky left */}
                        <td
                          className={`sticky left-0 z-10 border-r border-gray-100 px-5 py-3.5 font-medium text-gray-700 ${
                            feature.highlight
                              ? "bg-amber-50"
                              : rowIdx % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {feature.label}
                            {feature.highlight && (
                              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                🎧 Highlight
                              </span>
                            )}
                          </span>
                        </td>

                        {/* Package values */}
                        {feature.values.map((val, i) => (
                          <td
                            key={i}
                            className={`border-r border-gray-100 last:border-r-0 px-4 py-3.5 text-center ${
                              PACKAGES[i].popular
                                ? "bg-amber-50/70"
                                : ""
                            }`}
                          >
                            {renderVal(val, PACKAGES[i].popular)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}

                {/* Bottom CTA row */}
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td className="sticky left-0 bg-gray-50 px-5 py-5 text-sm font-bold text-gray-900">
                    Total Investment
                  </td>
                  {PACKAGES.map((pkg, i) => (
                    <td
                      key={pkg.id}
                      className={`px-4 py-5 text-center border-r border-gray-100 last:border-r-0 ${
                        pkg.popular ? "bg-amber-50" : ""
                      }`}
                    >
                      <div className={`text-lg font-black mb-3 ${pkg.popular ? "text-amber-600" : "text-gray-900"}`}>
                        {formatPrice(pkg.price)}
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-block text-xs font-bold px-5 py-2 rounded-xl transition-colors ${
                          pkg.popular
                            ? "bg-amber-500 text-white hover:bg-amber-600"
                            : i >= 3
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                        }`}
                      >
                        Choose {pkg.name}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            All prices are one-time fees. GST as applicable. Need a custom plan?{" "}
            <a href="#custom-builder" className="underline underline-offset-2 hover:text-gray-700">
              Build your own package →
            </a>
          </p>
        </div>
      </section>

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
                body: "Your book wil be available on Amazon, Flipkart, and 40000+ global platforms — reaching readers across India and worldwide.",
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

    </main>
    </>
  );
}
