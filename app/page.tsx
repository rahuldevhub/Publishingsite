import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";
import HeroBentoGrid, { HeroBentoGridMobile } from "@/app/components/HeroBentoGrid";

// Below-fold components — lazy-loaded to reduce initial JS bundle
const BooksCarousel = dynamic(() => import("@/app/components/BooksCarousel"), { ssr: true });
const CounterStats  = dynamic(() => import("@/app/aboutus/CounterStats"), { ssr: true });
const FAQSection    = dynamic(() => import("@/app/components/FAQSection"), { ssr: true });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Ritera Publishing — Self-Publish Your Book in India",
  description:
    "Ritera Publishing helps Indian authors self-publish professionally. 500+ books published, 100% royalties, global distribution to 50+ countries. Start your publishing journey today.",
  openGraph: {
    title: "Ritera Publishing — Empower Your Story",
    description:
      "Transform your manuscript into a globally distributed book. 100% royalties, professional editing, cover design, and marketing support for Indian authors.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritera Publishing — Self-Publish with Confidence",
    description: "500+ books published. 100% royalties. Global distribution. Start today.",
  },
  alternates: { canonical: SITE_URL },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ritera Publishing",
  url: SITE_URL,
  description:
    "Ritera Publishing is a self-publishing platform helping Indian authors publish professionally with 100% royalties and global distribution.",
  sameAs: ["https://instagram.com/riterapublishing"],
};

const STATS_BAR = [
  { value: "100%", label: "Author Royalties" },
  { value: "", suffix: " Tailored", label: " Publishing Timeline" },
  { value: "160+", label: "Countries Reached" },
  { value: "40000+", label: "Online Stores" },

  { value: "4.9/5", label: "Author Satisfaction" },
];

const SERVICES = [
  {
    title: "Fast Publishing",
    desc: "From manuscript to global shelves in just 30 days. Our self-publishing services in India move at your pace. No delays, no chasing updates.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Global Distribution",
    desc: "Your book on Amazon, Flipkart, and in 160+ countries through our book printing and publishing network, because great stories belong everywhere.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "100% Royalties",
    desc: "Every rupee you earn is yours. Built for authors who choose self-publishing in India with complete transparency and no hidden fees.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Professional Editing",
    desc: "From proofreading to developmental editing, our experts provide manuscript editing services to make your book publish-ready and polished.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    title: "Marketing Support",
    desc: "Strategic campaigns, Amazon Ads, and branding support to help you publish your book in India and reach the right readers globally..",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    title: "24/7 Author Support",
    desc: "Email, WhatsApp, and phone support, ideal for first-time authors publishing in India, so you’re never alone in your journey.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "Submit Manuscript",
    desc: "Upload your manuscript. Our team reviews and guides you step-by-step.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Choose Package",
    desc: "Select a publishing plan that fits your goals and budget.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Design & Edit",
    desc: "We edit, format, and design a professional book ready to publish.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Publish & Distribute",
    desc: "Your book goes live globally across major platforms and marketplaces.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: "Emma Stone",
    role: "Author of Sanctum.",
    quote:
      "I was nervous about self-publishing — I didn't know where to start. Ritera held my hand through every step and never made me feel like just another client. Seeing my book in readers' hands across three continents still feels surreal.",
    initials: "EM",
  },
  {
    name: "Saran Raj",
    role: "Author of Someday Perhaps & Twined Echoes",
    quote:
      "Having published internationally, I had a clear benchmark for what good publishing looks like. Ritera met it. The process was structured, the communication was professional, and the distribution reach was genuinely impressive. A self-publishing house that understands what serious authors need.",
    initials: "SR",
  },
  {
    name: "Ananya Gupta",
    role: "Author, Poetry of the Heart",
    quote:
      "Their marketing strategies really helped my book reach a wider audience. The Instagram campaigns and Amazon ads were expertly managed. I felt like I had a whole team behind me.",
    initials: "AG",
  },
];

const PACKAGES = [
  {
    name: "Essential",
    price: "₹11,999",
    highlight: false,
    features: [
      "ISBN & Copyright Registration",
      "Amazon & Flipkart Distribution",
      "Basic Cover Design",
      "100% Royalties",
    ],
  },
  {
    name: "Advanced",
    price: "₹32,999",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Essential",
      "Professional Editing & Proofreading",
      "Premium Custom Cover Design",
      "Social Media Promotion",
    ],
  },
  {
    name: "Premium",
    price: "₹84,999",
    highlight: false,
    features: [
      "Everything in Advanced",
      "International Distribution (160+ countries)",
      "Amazon Ads Management",
      "Dedicated Account Manager",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <main className="bg-white overflow-x-hidden">

        {/* ── 1. HERO ── */}
        <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
          {/* Background texture layers */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(251,191,36,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(99,102,241,0.08),transparent)]" />

          {/* Floating decorative shapes */}
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-white/5" />
          <div className="absolute top-32 right-32 w-48 h-48 rounded-full border border-amber-400/10" />
          <div className="absolute bottom-16 left-16 w-40 h-40 rounded-full border border-white/5" />

          {/* ── Right: Bento grid — desktop only, absolute positioned ── */}
          <div className="absolute inset-0 hidden lg:flex pointer-events-none">
            {/* Left spacer — matches the left content column */}
            <div className="flex-1" />
            {/* Right grid panel — fills right half, vertically centered */}
            <div className="w-[52%] flex items-center pointer-events-auto" style={{paddingTop: '104px', paddingBottom: '64px', paddingRight: '40px', paddingLeft: '56px'}}>
              <HeroBentoGrid />
            </div>
          </div>

          {/* ── Left: text content — vertically centered ── */}
          {/* pointer-events-none on the full-width wrappers so the right-half empty space
              doesn't block mouse events on the absolute-positioned bento grid behind it.
              pointer-events-auto is restored on the actual text column. */}
          <div className="relative flex items-center min-h-screen pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 py-24 w-full">
              <div className="lg:w-1/2 lg:pr-10 pointer-events-auto">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-200 tracking-wide">
                    India&apos;s Favourite Self-Publishing Platform
                  </span>
                </div>

                {/* H1 — only one on the page */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                  Empower
                  <br />
                  <span className="text-amber-400">Your Story.</span>
                </h1>

                <p className="mt-5 text-xl lg:text-2xl font-light text-gray-300">
                  Self-Publish with Confidence
                </p>

                <p className="mt-5 text-base lg:text-lg text-gray-400 max-w-xl leading-relaxed">
                  Ritera is a global self-publishing platform helping authors publish their book in India and worldwide.
                  Get complete support from manuscript editing and book cover design to e-book publishing and global distribution.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-4 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm shadow-lg shadow-amber-400/20"
                  >
                    Start Publishing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/aboutus"
                    className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Trust mini row */}
                <div className="mt-12 flex flex-wrap gap-6">
                  {["100% Royalties", "160+ Countries", "End-to-End Support"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet: compact 3-col grid below hero text — hidden on desktop */}
              <div className="hidden sm:block lg:hidden mt-10 pb-4 pointer-events-auto">
                <HeroBentoGrid compact />
              </div>

              {/* Mobile: horizontal scroll row — hidden on sm+ */}
              <div className="sm:hidden mt-10 pb-4 pointer-events-auto">
                <HeroBentoGridMobile />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </section>

        {/* ── 2. STATS BAR ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-gray-100">
              {STATS_BAR.map((stat) => (
                <div key={stat.label} className="text-center px-4 py-2">
                  <p className="text-2xl lg:text-3xl font-black text-gray-900">
                    {stat.value}
                    {stat.suffix ?? ""}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* ── 3. ABOUT US ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: image collage */}
            <FadeIn>
              <div className="relative mb-12 lg:mb-0" style={{ minHeight: '560px' }}>
                {/* Card 1: top-left, taller */}
                <div className="absolute left-0 top-0 w-[52%] h-[75%] overflow-hidden shadow-xl" style={{ borderRadius: '20px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/landingabout.webp" alt="Stack of books" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>

                {/* Card 2: bottom-right, smaller, overlapping card 1 — shifted up so it stays within bounds */}
                <div className="absolute right-0 w-[44%] h-[58%] overflow-hidden shadow-xl" style={{ borderRadius: '20px', bottom: '60px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/Jadejulep3.webp" alt="Publishing workspace" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>

                {/* Floating stat card: upper-right, between the two image cards */}
                <div className="absolute right-2 z-10" style={{ top: '48px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '26px 20px', maxWidth: '250px' }}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xl font-black text-gray-900 leading-tight">12 Days</p>
                    <span className="text-green-500 text-base font-bold leading-tight">↗</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-tight mt-1">Average time from manuscript to global launch</p>
                </div>

                {/* Floating ratings card: bottom-left, fully visible, slightly overlapping card 1 */}
                <div className="absolute z-10" style={{ left: '0px', bottom: '0px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '16px 20px', maxWidth: '300px' }}>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">Best ratings</p>
                  <p className="text-[10px] text-gray-500 leading-tight mb-2">4.9/5 Average Author Satisfaction Score. Based on post-publishing surveys.</p>
                  <div className="flex items-center" style={{ gap: '8px', fontSize: '20px' }}>
                    <span>😡</span>
                    <span>😐</span>
                    <span>🙂</span>
                    <span>😊</span>
                    <span>🤩</span>
                  </div>
                </div>

                {/* Decorative accent bar — bottom-left */}
                <div className="absolute z-10" style={{ left: '12px', bottom: '-16px', width: '40px', height: '3px', backgroundColor: '#f5a623', borderRadius: '2px' }} />
              </div>
            </FadeIn>

            {/* Right: content */}
            <FadeIn delay={120}>
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Our Story
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                A Bit About Us
              </h2>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-5 " >
                <strong className="text-gray-900">We are a global self-publishing house </strong> 
                built on a simple belief that every author deserves a publishing 
                partner they can truly trust. From first-time writers to experienced authors, we offer end-to-end author 
                publishing services in India and across the world, making the journey from manuscript to published book 
                personal, transparent, and stress-free.
              </p>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-8">
                Our mission goes beyond just publishing books. Through virtual meets, anthologies, and a growing community of voices, we&apos;re strengthening literature itself: one story at a time. With a 4.9 author satisfaction rating and reach across 160+ countries, we don&apos;t just publish books. We launch careers.
              </p>
              <Link
                href="/aboutus"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors text-sm"
              >
                Explore More →
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── 7. BOOKS CAROUSEL ── */}
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
            <FadeIn>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-2">
                    Our Catalogue
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Recent Publications
                  </h2>
                </div>
                <Link
                  href="/books"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View All Books →
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <BooksCarousel />
            </FadeIn>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/books" className="text-sm font-semibold text-gray-700 underline underline-offset-2">
                View All Books →
              </Link>
            </div>
          </div>
        </section>

         {/* ── 8. PACKAGES PREVIEW ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Pricing
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Publishing Package
              </h2>
              <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto">
         Simple, transparent self publishing packages designed for every author. Choose the right plan and publish your book in India and worldwide.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5 items-start">
            {PACKAGES.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 80}>
                <div
                  className={`rounded-2xl border overflow-hidden ${
                    pkg.highlight
                      ? "bg-gray-900 border-gray-900 shadow-2xl shadow-gray-900/20 sm:-mt-4 sm:mb-4"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="bg-amber-400 text-gray-900 text-center text-xs font-bold py-2 tracking-wide uppercase">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="p-7">
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${pkg.highlight ? "text-gray-400" : "text-gray-500"}`}>
                      {pkg.name}
                    </p>
                    <p className={`text-4xl font-black mb-1 ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                      {pkg.price}
                    </p>
                    <p className={`text-xs mb-6 ${pkg.highlight ? "text-gray-500" : "text-gray-400"}`}>
                      one-time | No hidden fees
                    </p>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlight ? "text-amber-400" : "text-gray-400"}`}
                            viewBox="0 0 20 20" fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                          <span className={`text-sm leading-snug ${pkg.highlight ? "text-gray-300" : "text-gray-600"}`}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/packages"
                      className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                        pkg.highlight
                          ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                          : "border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                      }`}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── 4. WHAT SETS US APART ── */}
        <section className="bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <FadeIn>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                  Why Ritera
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  What Sets Us Apart
                </h2>
                <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
                  Every feature is built around one goal: making your publishing journey
                  smooth, profitable, and unforgettable.
                </p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <FadeIn key={svc.title} delay={i * 60}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group h-full">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-50 border border-gray-200 group-hover:border-amber-200 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-amber-600 mb-5 transition-all">
                      {svc.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{svc.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

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
                Four simple steps from manuscript to global bookshelves. No confusion, no overwhelm, just clarity.
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm shadow-md shadow-amber-400/20"
            >
              Start Your Journey →
            </Link>
          </FadeIn>
        </section>

        {/* ── 6. TESTIMONIALS ── */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <FadeIn>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                  Author Stories
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Trusted by Authors Across India
                </h2>
                <p className="text-gray-400 text-base lg:text-lg max-w-xl mx-auto">
                  Real words from real authors who trusted us with their stories.
                </p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <FadeIn key={t.name} delay={i * 80}>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-7 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="text-gray-300 text-sm leading-relaxed italic flex-1 mb-5">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        

       

        {/* ── 9. IMPACT QUOTE ── */}
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(251,191,36,0.06),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 30px)",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 text-center">
            <FadeIn>
              <svg className="w-10 h-10 text-amber-400/40 mx-auto mb-8" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote
                className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                They don&apos;t just publish books;
                <br className="hidden sm:block" />
                <em className="text-amber-400"> They help authors build lasting careers.</em>
              </blockquote>
              <p className="mt-8 text-sm text-gray-500 font-medium tracking-wide">
                — A Ritera Author
              </p>
            </FadeIn>
          </div>
        </section>

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
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors text-sm"
              >
                Start Writing →
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── 11. COUNTER STATS ── */}
        {/* <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase text-center mb-10">
                Our track record
              </p>
            </FadeIn>
            <CounterStats />
          </div>
        </section> */}

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
                Join a communinty of authors who chose Ritera to share their voice with the world.
                Your manuscript is waiting.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-sm shadow-xl"
                >
                  Get Started Today →
                </Link>
                <a
                  href="https://wa.me/919488854787"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-xl"
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
