import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";
import HeroSection from "@/app/components/hero/HeroSection";
import HeroStatsBand from "@/app/components/hero/HeroStatsBand";
import HomePricingSection from "@/app/components/HomePricingSection";
import EditorialAboutSection from "@/app/components/EditorialAboutSection";
import { SITE_STATS } from "@/lib/stats";
import { HOMEPAGE_PILLARS } from "@/lib/internal-links";

// Below-fold components — lazy-loaded to reduce initial JS bundle
const BooksCarousel = dynamic(() => import("@/app/components/BooksCarousel"), { ssr: true });
const FAQSection    = dynamic(() => import("@/app/components/FAQSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/app/components/TestimonialsSection"), { ssr: true });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Self Publishing Company in India | Ritera Publishing",
  description:
    "Publish your book in India with Ritera Publishing — professional editing, cover design, ISBN registration, and Amazon distribution across 160+ countries. Keep 100% of your royalties.",
  openGraph: {
    title: "Self Publishing Company in India | Ritera Publishing",
    description:
      "India's trusted self-publishing platform — 4,000+ books published, professional editing, ISBN registration, Amazon & global distribution, and 100% royalties for first-time and experienced authors.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/home/hero-library.webp`,
        width: 1200,
        height: 630,
        alt: "Ritera Publishing — Self Publishing Company in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self Publishing Company in India | Ritera Publishing",
    description:
      "4,000+ books published. Professional editing, ISBN & Amazon distribution. 100% royalties. Start your author journey today.",
    images: [`${SITE_URL}/images/home/hero-library.webp`],
  },
  alternates: { canonical: SITE_URL },
};

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "Submit Your Manuscript",
    desc: "Share your manuscript with us. Our publishing experts will review it and recommend the right publishing path.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Choose Your Publishing Package",
    desc: "Select the package that fits your goals, timeline, and budget. Transparent pricing with no hidden charges.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Professional Editing & Design",
    desc: "We edit, format, and design your book to meet global publishing standards for print and eBook.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Publish Worldwide",
    desc: "Your book is published across leading bookstores worldwide while you retain 100% of your royalties.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I publish my book in India as a first-time author?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Publishing your first book in India is a four-step process with Ritera. Submit your manuscript, our editorial team responds within 12 days with a personalised plan. Choose a package starting at ₹11,999 that includes editing, cover design, ISBN registration, and Amazon distribution. We handle formatting for print and e-book, then distribute to Amazon, Flipkart, Apple Books, and 40,000+ stores worldwide. You retain full copyright and 100% of your royalties from the first sale.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best self publishing services in India for new authors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best self-publishing services in India offer professional manuscript editing, custom cover design, ISBN registration included in the package price, global distribution to Amazon and 40,000+ stores, and 100% royalties — not a revenue split. Ritera Publishing provides all of these with a 4.9/5 author rating across 120+ reviews, plus free consultation before you commit to any package.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to publish a book in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ritera Publishing's self-publishing packages start at ₹11,999 (approx. $149 USD) for the First-Time Author package, which covers professional editing, cover design, ISBN registration, and Amazon distribution as a one-time payment with no hidden fees. The Global Author package is ₹32,999 and adds distribution across 160+ countries. The Marketing Focused package at ₹84,999 includes Amazon advertising and a dedicated marketing team. You keep 100% of your royalties on all sales.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need ISBN registration to publish my book in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, an ISBN is essential for publishing and selling your book in India and globally. Every Ritera Publishing package includes ISBN registration at no extra cost. The ISBN enables your book to be listed on Amazon, Flipkart, Apple Books, and library catalogues worldwide, with accurate sales tracking and royalty accounting. Our team handles the entire registration process on your behalf.",
      },
    },
    {
      "@type": "Question",
      name: "Can I publish my book in India and sell it worldwide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ritera Publishing distributes your book to 40,000+ stores across 160+ countries, including Amazon India, Amazon US, Amazon UK, Apple Books, Barnes & Noble, Kobo, Flipkart, and Google Play Books. Both print-on-demand paperback and e-book formats are available. You retain full copyright and earn 100% of your royalties on every sale, whether in India or internationally.",
      },
    },
    {
      "@type": "Question",
      name: "Do I keep the rights to my book when I self-publish with Ritera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you retain full copyright and all intellectual property rights to your book when you publish with Ritera. We are a service provider, not a publisher acquiring your rights. You can revise future editions, sell translation rights, license your work, and take it to any other platform — without our approval. You also earn 100% of your royalties with no revenue sharing.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Self-Publish a Book in India with Ritera Publishing",
  description:
    "A step-by-step guide to publishing your book in India through Ritera Publishing's professional self-publishing platform.",
  totalTime: "PT30D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Submit Your Manuscript",
      text: "Share your manuscript and our editorial team responds within 12 days with a personalised publishing plan tailored to your goals.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Your Publishing Package",
      text: "Select a self-publishing package from ₹11,999. Every plan includes professional editing, cover design, ISBN registration, and Amazon distribution — one-time payment, no hidden fees.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Professional Editing, Formatting & Cover Design",
      text: "Our editors refine your manuscript and our designers craft a professional cover. We deliver a publishing-ready file for print and e-book formats.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Publish & Distribute Globally",
      text: "Your book goes live on Amazon, Apple Books, Flipkart, and 40,000+ stores across 160+ countries. You earn 100% of your royalties from day one.",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Self-Publishing Services in India",
  provider: {
    "@type": "Organization",
    "@id": "https://riterapublishing.com/#organization",
  },
  serviceType: "Book Publishing",
  areaServed: "IN",
  description:
    "Complete self-publishing services in India including professional manuscript editing, cover design, ISBN registration, print and e-book formatting, and global distribution through Amazon, Flipkart, and 40,000+ stores. Authors retain 100% of their royalties.",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "11999",
    description: "First-Time Author self-publishing package — editing, cover design, ISBN, Amazon distribution",
    availability: "https://schema.org/InStock",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="bg-white overflow-x-hidden">

        {/* ── 1. HERO ── */}
        <HeroSection />

        {/* ── 2. STATS + DISTRIBUTION ── */}
        <HeroStatsBand />

        {/* ── 3. EDITORIAL ABOUT ── */}
        <EditorialAboutSection />

        {/* ── 7. BOOKS CAROUSEL ── */}
        <section className="bg-gradient-to-b from-white to-amber-50/30 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase mb-4">
                  Our Published Collection
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-5">
                  Stories We&apos;ve Helped Bring To{" "}
                  <span className="text-amber-500 italic">Life.</span>
                </h2>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed">
                  Every book you see here started as a dream.{" "}
                  <br className="hidden sm:block" />
                  Yours could be next.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <BooksCarousel />
            </FadeIn>

            {/* Desktop / tablet footer */}
            <FadeIn delay={120} className="hidden sm:block">
              <div className="mt-8 text-center">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  Your Book Belongs Here →
                </Link>
              </div>
            </FadeIn>

            {/* Mobile footer — single CTA */}
            <div className="sm:hidden">
              <FadeIn delay={120}>
                <Link
                  href="/books"
                  className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-base font-semibold text-white transition-all duration-200 ease-out hover:bg-gray-800 active:scale-[0.99] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  Your Book Belongs Here <span aria-hidden="true">→</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── 8. PACKAGES PREVIEW ── */}
        <HomePricingSection />

        {/* ── 5. HOW IT WORKS ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Simple Process
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Publishing Journey
              </h2>
              <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto">
                From manuscript to published book in four simple, guided steps.
              </p>
            </div>
          </FadeIn>

          {/* Desktop timeline */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {JOURNEY_STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100} className="relative flex flex-col items-center text-center px-4">
                {/* Step circle */}
                <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-6 shadow-sm relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-amber-400">
                    {step.icon}
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-500 tracking-widest mb-2">{step.num}</span>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>

          {/* Mobile stacked */}
          <div className="lg:hidden space-y-6">
            {JOURNEY_STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-amber-400 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-500 tracking-widest">{step.num}</span>
                    <h3 className="font-bold text-gray-900 mt-0.5 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="ml-7 mt-4 w-px h-6 bg-gray-200" />
                )}
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-md shadow-amber-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Get Your Publishing Plan →
            </Link>
          </FadeIn>
        </section>

        {/* ── PUBLISHING RESOURCES ── */}
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase mb-4">
                  Publishing Resources
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-gray-900 leading-tight mb-4">
                  Everything You Need to Publish, Explained.
                </h2>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed">
                  Free, in-depth guides written by our publishing team — start with the essentials.
                </p>
              </div>
            </FadeIn>

            {/* Tablet/desktop — unchanged grid layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOMEPAGE_PILLARS.map((guide, i) => (
                <FadeIn key={guide.slug} delay={i * 80}>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-900 hover:shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <span className="text-[11px] font-semibold tracking-widest text-amber-600 uppercase mb-3">
                      Guide {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-gray-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{guide.blurb}</p>
                    <span className="mt-4 text-sm font-semibold text-gray-900 group-hover:translate-x-0.5 transition-transform inline-block">
                      Read the guide →
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* Mobile-only — horizontal swipe carousel, next card peeks from the right */}
            <FadeIn className="sm:hidden -mx-6">
              <div
                className="flex gap-4 overflow-x-auto pl-6 pr-4 pb-2 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {HOMEPAGE_PILLARS.map((guide, i) => (
                  <Link
                    key={guide.slug}
                    href={`/blog/${guide.slug}`}
                    className="group flex h-full w-[80%] shrink-0 snap-start flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-900 hover:shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <span className="text-[11px] font-semibold tracking-widest text-amber-600 uppercase mb-3">
                      Guide {String(i + 1).padStart(2, "0")}
                    </span>
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
              <p className="mt-3 pl-6 text-xs font-medium text-gray-400" aria-hidden="true">
                Swipe to explore more guides →
              </p>
            </FadeIn>

            <FadeIn delay={160} className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors"
              >
                Browse all publishing guides →
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── 6. TESTIMONIALS ── */}
        <TestimonialsSection />

        

       

        {/* ── 10. LITSPACE CTA ── */}
        <section className="bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
                <span className="text-xs font-semibold text-gray-300 tracking-wide">LitSpace — Free Publishing</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-5">
                Want to Publish for Free?
              </h2>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Share your poetry, short stories, and articles on LitSpace, our community platform for emerging writers. 
              </p>
              <Link
                href="/litspace/submit"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Start Writing →
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection />

        {/* ── 12. FINAL CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]" />

          <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Ready to Bring Your
                <br />
                Story to Life?
              </h2>
              <p className="text-white/80 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join {SITE_STATS.happyAuthors.display} authors who chose Ritera to self-publish professionally in India and share their stories with the world.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Get Started Today →
                </Link>
                <a
                  href="https://wa.me/919488854787"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.886l6.217-1.45A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.773 9.773 0 01-5.136-1.453l-.368-.218-3.818.89.924-3.709-.24-.381A9.775 9.775 0 012.182 12C2.182 6.545 6.545 2.182 12 2.182c5.455 0 9.818 4.363 9.818 9.818 0 5.455-4.363 9.818-9.818 9.818z" />
                  </svg>
                  Talk to Us
                </a>
              </div>

              <p className="mt-8 text-white/60 text-xs">
                Free consultation · No commitment · Response within 24 hours
              </p>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
