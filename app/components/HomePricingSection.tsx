"use client";
import { COMPANY_FACTS } from "@/lib/company-facts";

import Link from "next/link"
import FadeIn from "@/app/components/FadeIn"
import { useCurrency } from "@/hooks/useCurrency"
import { useState, useRef, useCallback } from "react"

import { PRICES } from "@/lib/pricing"

type Variant = "ivory" | "navy"

const PACKAGES: {
  name: string
  subtitle: string
  priceKey: keyof typeof PRICES
  highlight: boolean
  variant: Variant
  icon: "book" | "globe" | "megaphone"
  features: string[]
}[] = [
  {
    name: "First-Time Author",
    subtitle: "Everything you need to publish your first book.",
    priceKey: "essential",
    highlight: false,
    variant: "ivory",
    icon: "book",
    features: [
      "Professional Manuscript Formatting",
      "Custom Cover Design",
      "ISBN Registration",
      "Amazon & Flipkart Distribution",
      `${COMPANY_FACTS.royalties} Royalties`,
    ],
  },
  {
    name: "Global Author",
    subtitle: "Take your book to readers worldwide.",
    priceKey: "advanced",
    highlight: true,
    variant: "navy",
    icon: "globe",
    features: [
      "Everything in First-Time Author",
      `Global Distribution — ${COMPANY_FACTS.countries.display} Countries`,
      "Apple Books, Barnes & Noble & More",
      "Author Interview",
      `${COMPANY_FACTS.royalties} Royalties`,
    ],
  },
  {
    name: "Marketing Focused",
    subtitle: "Promote your book and build your author presence.",
    priceKey: "premium",
    highlight: false,
    variant: "ivory",
    icon: "megaphone",
    features: [
      "Everything in Global Author",
      "Amazon Advertising Campaign",
      "Social Media Book Promotion",
      "Author Brand Identity Design",
      "Dedicated Marketing Manager",
      "Author Website Included",
    ],
  },
]

const ICONS: Record<"book" | "globe" | "megaphone", React.ReactNode> = {
  book: (
    <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 16c-5-3-11-3-17-1v23c6-2 12-2 17 1 5-3 11-3 17-1V24" fill="currentColor" fillOpacity={0.12} />
      <path d="M24 17v22M12 22l6 1M12 28l6 1M30 31l5-1" />
      <path d="m27 21 3-8L40 3l5 5-10 10-8 3Z" fill="currentColor" fillOpacity={0.25} />
      <path d="m37 6 5 5M27 21l8-8" />
      <path d="m10 5 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="15" fill="currentColor" fillOpacity={0.12} />
      <ellipse cx="24" cy="24" rx="6.5" ry="15" />
      <path d="M9 24h30M12 16h24M12 32h24" />
      <path d="M8 29c-6 7-4 12 4 11 9-1 23-9 29-18 4-6 3-10-2-10" />
      <path d="m36 5 1.5 4L42 10.5 37.5 12 36 16l-1.5-4-4.5-1.5L34.5 9 36 5Z" fill="currentColor" stroke="none" />
      <circle cx="10" cy="39" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 19 17-9v27l-17-9H9a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h10Z" fill="currentColor" fillOpacity={0.16} />
      <path d="M19 19v9M11 28l4 13h7l-5-13M36 19a5 5 0 0 1 0 10M41 12l3-3M42 24h4M41 36l3 3" />
      <path d="m16 3 1.3 3.7L21 8l-3.7 1.3L16 13l-1.3-3.7L11 8l3.7-1.3L16 3Z" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const CHECK = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
)

// Premium easing shared across all card micro-interactions
const EASE = "ease-[cubic-bezier(0.22,0.61,0.36,1)]"

const VARIANT_STYLES: Record<Variant, {
  card: string
  iconWrap: string
  iconColor: string
  title: string
  subtitle: string
  divider: string
  check: string
  feature: string
  priceLabel: string
  price: string
  priceNote: string
  button: string
}> = {
  ivory: {
    card: "bg-gradient-to-b from-white to-[#FBFAF6] border border-black/[0.06] shadow-[0_10px_30px_rgba(17,24,39,0.05)] hover:shadow-[0_20px_44px_rgba(17,24,39,0.08)]",
    iconWrap: "bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200/80 border border-amber-200 shadow-[0_6px_18px_-6px_rgba(217,119,6,0.3),inset_0_1px_0_rgba(255,255,255,0.9)]",
    iconColor: "text-amber-600",
    title: "text-gray-900",
    subtitle: "text-gray-600",
    divider: "bg-black/[0.05]",
    check: "text-amber-500",
    feature: "text-gray-600",
    priceLabel: "text-gray-500",
    price: "text-gray-900",
    priceNote: "text-gray-500",
    button: "border border-gray-300 text-gray-800 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_8px_24px_rgba(17,24,39,0.16)]",
  },
  navy: {
    card: "bg-[#0F172A] border border-amber-300/60 shadow-[0_20px_50px_rgba(201,145,45,0.12)] hover:shadow-[0_28px_62px_rgba(201,145,45,0.14)]",
    iconWrap: "bg-gradient-to-br from-amber-200/20 to-amber-500/10 border border-amber-300/40 shadow-[0_0_24px_-6px_rgba(251,191,36,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]",
    iconColor: "text-amber-300",
    title: "text-white",
    subtitle: "text-gray-400",
    divider: "bg-white/[0.06]",
    check: "text-amber-400",
    feature: "text-gray-300",
    priceLabel: "text-gray-400",
    price: "text-white",
    priceNote: "text-gray-400",
    button: "bg-amber-400 text-gray-900 hover:bg-amber-300 hover:shadow-[0_10px_28px_rgba(201,145,45,0.45)]",
  },
}

// Both layouts share the same photograph-free card and package data.
function PackageJourneyCard({ pkg, currency, mobile = false, isActive = false, expanded = false, onToggleExpand }: {
  pkg: (typeof PACKAGES)[number]
  currency: "INR" | "USD"
  mobile?: boolean
  isActive?: boolean
  expanded?: boolean
  onToggleExpand?: () => void
}) {
  const s = VARIANT_STYLES[pkg.variant]
  const price = currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd
  const features = mobile && !expanded ? pkg.features.slice(0, 4) : pkg.features
  const featuresId = `home-package-${pkg.priceKey}-${mobile ? "mobile" : "desktop"}`

  return (
    <div data-home-package={pkg.priceKey}
      className={`group/package relative flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] p-5 lg:p-7 ${s.card} ${mobile && isActive ? "shadow-[0_14px_32px_-12px_rgba(17,24,39,0.14)]" : ""}`}>
      <div aria-hidden="true" className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${pkg.highlight ? "via-amber-300/80" : "via-amber-400/60"} to-transparent`} />
      <div className="min-h-[164px] min-[375px]:min-h-[168px] lg:min-h-[204px] xl:min-h-[176px]">
        <div className="flex min-h-16 items-center justify-between gap-2">
          <div aria-hidden="true" className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] transition-transform duration-300 motion-safe:group-hover/package:-translate-y-1 motion-safe:group-hover/package:rotate-3 ${s.iconWrap} ${s.iconColor}`}>
            {ICONS[pkg.icon]}
          </div>
          {pkg.highlight && <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-200">Most Popular</span>}
        </div>
        <h3 className={`mt-4 font-display text-[24px] lg:text-[28px] font-bold leading-tight ${s.title}`}>{pkg.name}</h3>
        <p className={`mt-2 text-sm leading-5 ${s.subtitle}`}>{pkg.subtitle}</p>
      </div>
      <div className={`mb-4 h-px w-full ${s.divider}`} />
      <ul id={featuresId} className="space-y-3">
        {features.map(feature => <li key={feature} className="flex items-start gap-2.5">
          <span className={`mt-0.5 ${s.check}`}>{CHECK}</span>
          <span className={`text-sm leading-5 ${s.feature}`}>{feature}</span>
        </li>)}
      </ul>
      {mobile && pkg.features.length > 4 && <button type="button" onClick={onToggleExpand}
        aria-expanded={expanded} aria-controls={featuresId}
        className={`mt-1 flex min-h-11 items-center text-left text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-amber-400 ${pkg.variant === "navy" ? "text-amber-300" : "text-amber-700"}`}>
        {expanded ? "Show fewer features −" : `See all ${pkg.features.length} features +`}
      </button>}
      <div className="mt-auto pt-5">
        <div className={`mb-4 h-px w-full ${s.divider}`} />
        <p className={`text-[11px] font-medium tracking-[0.14em] uppercase ${s.priceLabel}`}>Starts at</p>
        <p className={`mt-1 text-[34px] md:text-[38px] font-bold leading-none tracking-tight ${s.price}`}>{price}</p>
        <p className={`mt-2 text-xs leading-5 ${s.priceNote}`}>One-time fee · GST as applicable</p>
        <Link href="/packages" className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${s.button}`}>
          View Package
          <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function HomePricingSection() {
  const { currency } = useCurrency()

  // Mobile carousel state
  const [activeIdx, setActiveIdx] = useState(0)
  const [expanded, setExpanded] = useState<boolean[]>(PACKAGES.map(() => false))
  const scrollRef = useRef<HTMLDivElement>(null)
  // Track manual swiping; no automatic nudge or timed movement.
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const card = scrollRef.current.firstElementChild as HTMLElement | null
    if (!card) return
    const stride = card.offsetWidth + 16
    const atEnd = scrollLeft >= scrollWidth - clientWidth - 2
    const idx = atEnd ? PACKAGES.length - 1 : Math.max(0, Math.min(Math.round(scrollLeft / stride), PACKAGES.length - 1))
    setActiveIdx(idx)
  }, [])

  // Programmatic scroll used by dot buttons
  const scrollToCard = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    if (!card) return
    const stride = card.offsetWidth + 16
    el.scrollTo({ left: i * stride, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
    setActiveIdx(i)
  }, [])

  const toggleExpand = (i: number) => {
    setExpanded((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <section className="max-w-[1480px] mx-auto px-6 py-10 lg:py-14">

      {/* ── Section header — identical on all breakpoints ── */}
      <FadeIn>
        <div className="text-center mb-8 max-w-[720px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase mb-2.5">
            Publishing Packages
          </p>
          <h2 className="font-display font-semibold text-gray-900 leading-[1.1]">
            <span className="block text-[22px] sm:text-[30px] lg:text-[36px]">Three Publishing Journeys.</span>
            <span className="block text-[22px] sm:text-[30px] lg:text-[36px]">One Goal.</span>
            <span className="block font-bold italic text-amber-500 text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.02]">
              Your Book.
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-[600px] mx-auto">
            Every author has a unique story and a unique dream. Choose the publishing journey that matches your vision.
          </p>
        </div>
      </FadeIn>

      {/* ══════════════════════════════════════════════════════════
          MOBILE / TABLET CAROUSEL  (< 1024px)
          -mx-6 breaks out of the section's px-6 so the track
          fills the full viewport width; the track itself adds
          20px padding to keep cards 20px from each edge.
          ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden -mx-6">

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "20px",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            gap: "16px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "16px",
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              style={{
                flexShrink: 0,
                width: "min(85%, 600px)",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              <PackageJourneyCard
                mobile
                pkg={pkg}
                currency={currency}
                isActive={i === activeIdx}
                expanded={expanded[i]}
                onToggleExpand={() => toggleExpand(i)}
              />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div
          className="mx-5 mt-3 flex items-center justify-between gap-3"
          role="group"
          aria-label="Choose a publishing package"
        >
          <button type="button" aria-label="Previous package" disabled={activeIdx === 0}
            onClick={() => scrollToCard(activeIdx - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 transition-colors hover:border-amber-400 disabled:cursor-default disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-amber-500">
            <span aria-hidden="true">←</span>
          </button>
          <div className="flex items-center gap-1">
          {PACKAGES.map((pkg, i) => (
            <button
              key={i}
              aria-current={i === activeIdx ? "true" : undefined}
              type="button"
              aria-label={`Go to package ${i + 1} of ${PACKAGES.length}: ${pkg.name}`}
              onClick={() => scrollToCard(i)}
              className="flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span aria-hidden="true" className={`rounded-full transition-colors duration-200 ${
                i === activeIdx
                  ? "w-5 h-2 bg-amber-500"
                  : "w-2 h-2 bg-gray-300"
              }`} />
            </button>
          ))}
          </div>
          <button type="button" aria-label="Next package" disabled={activeIdx === PACKAGES.length - 1}
            onClick={() => scrollToCard(activeIdx + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 transition-colors hover:border-amber-400 disabled:cursor-default disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-amber-500">
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="mt-1 text-center text-xs leading-5 text-gray-500">Swipe or use the arrows to compare · {activeIdx + 1} of {PACKAGES.length}</p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP GRID  (≥ 1024px — matching photograph-free cards)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-7 items-stretch">
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.name} className="relative h-full">
            <FadeIn delay={i * 80} className="h-full">
              <PackageJourneyCard pkg={pkg} currency={currency} />
            </FadeIn>
          </div>
        ))}
      </div>

      {/* ── Consultation CTA ── */}
      <FadeIn delay={240}>
        <div className="group/bar mt-6 lg:mt-8 rounded-2xl bg-[#FBFAF6] border border-amber-200/60 px-5 py-5 lg:px-7 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="hidden lg:flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white border border-amber-200 text-amber-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                <path strokeLinecap="round" d="M3.5 9.5h17M8 3v3M16 3v3" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 leading-snug">
                Need help choosing your package?
              </p>
              <p className="text-sm leading-5 text-gray-600 mt-1">
                Talk through your book and budget with our publishing team.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className={`w-full lg:w-auto lg:ml-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] bg-gray-900 text-white font-semibold text-sm hover:bg-black motion-safe:hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,24,39,0.20)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 shrink-0`}
          >
            Book Free Consultation
            <svg className={`w-4 h-4 transition-transform duration-300 ${EASE} motion-safe:group-hover/bar:translate-x-1`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
