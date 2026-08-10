"use client"

import Image from "next/image"
import Link from "next/link"
import FadeIn from "@/app/components/FadeIn"
import { useCurrency } from "@/hooks/useCurrency"
import { useState, useRef, useEffect, useCallback } from "react"

const PRICES = {
  essential: { inr: "₹11,999", usd: "$149" },
  standard:  { inr: "₹18,999", usd: "$229" },
  advanced:  { inr: "₹32,999", usd: "$399" },
  elite:     { inr: "₹54,999", usd: "$659" },
  premium:   { inr: "₹84,999", usd: "$1,019" },
  exclusive: { inr: "₹1,19,999", usd: "$1,449" },
}

type Variant = "ivory" | "navy"

const PACKAGES: {
  name: string
  subtitle: string
  priceKey: keyof typeof PRICES
  highlight: boolean
  variant: Variant
  image: { src: string; alt: string }
  icon: "book" | "globe" | "rocket"
  features: string[]
}[] = [
  {
    name: "First-Time Author",
    subtitle: "Editing, ISBN, cover design & Amazon distribution, everything you need to launch.",
    priceKey: "essential",
    highlight: false,
    variant: "ivory",
    image: {
      src: "/images/packages/first-time-author-photo.webp",
      alt: "A first-time author writing in a notebook at a sunlit desk with books and coffee",
    },
    icon: "book",
    features: [
      "Professional Manuscript Formatting",
      "Custom Cover Design",
      "ISBN Registration",
      "Amazon & Flipkart Distribution",
      "100% Royalties",
    ],
  },
  {
    name: "Global Author",
    subtitle: "International distribution across 160+ countries with premium production quality.",
    priceKey: "advanced",
    highlight: true,
    variant: "navy",
    image: {
      src: "/images/packages/global-author-photo.webp",
      alt: "A golden globe beside a laptop showing analytics on an elegant office desk at sunset",
    },
    icon: "globe",
    features: [
      "Everything in First-Time Author",
      "Global Distribution — 160+ Countries",
      "Apple Books, Barnes & Noble & More",
      "Author Interview",
      "100% Royalties",
    ],
  },
  {
    name: "Marketing Focused",
    subtitle: "Maximum visibility with Amazon advertising, social media promotion & author branding.",
    priceKey: "premium",
    highlight: false,
    variant: "ivory",
    image: {
      src: "/images/packages/marketing-focused-photo.webp",
      alt: "A publishing team reviewing marketing materials and analytics around a laptop",
    },
    icon: "rocket",
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

const ICONS: Record<"book" | "globe" | "rocket", React.ReactNode> = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5c-2-1.2-4.7-1.5-7-1v13c2.3-.5 5-.2 7 1 2-1.2 4.7-1.5 7-1v-13c-2.3-.5-5-.2-7 1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5v13" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.2 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.2-3.8-8.5S9.5 5.9 12 3.5z" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 3.5c2.5.8 4 3.4 4 6.5-2.6 0-4.8 1-6.5 2.7L9 15.7c-.5-2 0-4.2 1.7-6C12.3 8 13 5.8 14.5 3.5z" />
      <circle cx="14" cy="9" r="1.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.8 14.2 5.5 15c-.3 1.6-.2 3 .3 4.2 1.2.5 2.6.6 4.2.3l.8-3.3M9.8 17.2l-2.4 2.4" />
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
    iconWrap: "bg-white border-2 border-amber-300 shadow-[0_8px_22px_rgba(201,145,45,0.18)]",
    iconColor: "text-amber-600",
    title: "text-gray-900",
    subtitle: "text-gray-600",
    divider: "bg-black/[0.05]",
    check: "text-amber-500",
    feature: "text-gray-600",
    priceLabel: "text-gray-400",
    price: "text-gray-900",
    priceNote: "text-gray-400",
    button: "border border-gray-300 text-gray-800 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_8px_24px_rgba(17,24,39,0.16)]",
  },
  navy: {
    card: "bg-[#0F172A] border-2 border-amber-400 shadow-[0_20px_50px_rgba(201,145,45,0.12)] hover:shadow-[0_28px_62px_rgba(201,145,45,0.14)]",
    iconWrap: "bg-white border-2 border-amber-400 shadow-[0_8px_24px_rgba(201,145,45,0.28)]",
    iconColor: "text-amber-500",
    title: "text-white",
    subtitle: "text-gray-400",
    divider: "bg-white/[0.06]",
    check: "text-amber-400",
    feature: "text-gray-300",
    priceLabel: "text-gray-500",
    price: "text-white",
    priceNote: "text-gray-500",
    button: "bg-amber-400 text-gray-900 hover:bg-amber-300 hover:shadow-[0_10px_28px_rgba(201,145,45,0.45)]",
  },
}

// ── Mobile-only card ──────────────────────────────────────────────────────────
// Rendered only inside the swipe carousel (< md). Keeps identical visual
// design as JourneyCard but adapts spacing and adds expand/collapse features.

function MobileJourneyCard({
  pkg,
  currency,
  isActive,
  expanded,
  onToggleExpand,
}: {
  pkg: (typeof PACKAGES)[number]
  currency: "INR" | "USD"
  isActive: boolean
  expanded: boolean
  onToggleExpand: () => void
}) {
  const s = VARIANT_STYLES[pkg.variant]
  const price = currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd
  const visibleFeatures = expanded ? pkg.features : pkg.features.slice(0, 4)
  const hiddenCount = Math.max(0, pkg.features.length - 4)

  return (
    <div
      className={`relative flex flex-col rounded-[22px] overflow-hidden transition-all duration-300 ${EASE} ${s.card} ${
        isActive
          ? "scale-100 opacity-100 shadow-[0_24px_56px_rgba(17,24,39,0.13)]"
          : "scale-[0.97] opacity-[0.92]"
      }`}
    >
      {/* Hero image — 220px on mobile for premium photography */}
      <div className="relative h-[220px] w-full overflow-hidden shrink-0">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          loading="lazy"
          sizes="85vw"
          className="object-cover object-center"
        />
        {pkg.highlight && (
          <div className="absolute top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-amber-400 text-gray-950 text-[11px] font-bold tracking-[0.08em] uppercase shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
              Most Popular
            </span>
          </div>
        )}
      </div>

      {/* Floating icon badge — sits on the image/content boundary */}
      <div
        className={`absolute left-6 z-20 flex h-16 w-16 items-center justify-center rounded-full ${s.iconWrap} ${s.iconColor}`}
        style={{ top: 177 }}
      >
        {ICONS[pkg.icon]}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col px-6 pb-5 pt-8">
        {/* Title + subtitle */}
        <h3 className={`font-display font-bold leading-[1.08] text-[24px] ${s.title}`}>
          {pkg.name}
        </h3>
        <p className={`mt-1 text-sm leading-snug ${s.subtitle}`}>{pkg.subtitle}</p>

        <div className={`my-3.5 h-px w-full ${s.divider}`} />

        {/* Features — first 4 always visible */}
        <ul className="space-y-2">
          {visibleFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className={s.check}>{CHECK}</span>
              <span className={`text-[14px] leading-snug ${s.feature}`}>{f}</span>
            </li>
          ))}
        </ul>

        {/* Expand toggle — only shown when card has more than 4 features */}
        {hiddenCount > 0 && (
          <button
            onClick={onToggleExpand}
            className={`mt-2.5 text-left text-[13px] font-semibold transition-colors ${
              pkg.variant === "navy" ? "text-amber-400" : "text-amber-600"
            }`}
          >
            {expanded
              ? "− Show less"
              : `+ View all ${hiddenCount} more feature${hiddenCount !== 1 ? "s" : ""}`}
          </button>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-4">
          <p className={`text-[11px] font-medium tracking-widest uppercase ${s.priceLabel}`}>
            Starts at
          </p>
          <p className={`mt-0.5 text-[34px] font-black leading-none ${s.price}`}>{price}</p>
          <p className={`mt-1.5 text-[11px] ${s.priceNote}`}>One-time payment • No hidden fees</p>

          <Link
            href="/packages"
            className={`mt-3.5 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${EASE} ${s.button}`}
          >
            View Package Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Desktop card (unchanged) ──────────────────────────────────────────────────

function JourneyCard({ pkg, currency }: { pkg: (typeof PACKAGES)[number]; currency: "INR" | "USD" }) {
  const s = VARIANT_STYLES[pkg.variant]
  const price = currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd
  const features = pkg.features.slice(0, 5)

  return (
    <div
      className={`group relative flex h-full flex-col rounded-[22px] overflow-hidden transition-all duration-[350ms] ${EASE} hover:-translate-y-1.5 ${s.card} ${
        pkg.highlight ? "z-10 lg:-mt-[12px] lg:scale-[1.02]" : ""
      }`}
    >
      {/* Hero image — rounded top via card overflow */}
      <div className="relative h-[180px] sm:h-[190px] lg:h-[208px] w-full overflow-hidden shrink-0">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-center transition-transform duration-[350ms] ${EASE} group-hover:scale-[1.04]`}
        />
      </div>

      {/* Floating icon — raised ~9px, aligned with left content */}
      <div
        className={`absolute left-7 top-[137px] sm:top-[147px] lg:top-[165px] z-20 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-[350ms] ${EASE} group-hover:rotate-[4deg] ${s.iconWrap} ${s.iconColor}`}
      >
        {ICONS[pkg.icon]}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-7 pb-6 pt-9">
        <h3 className={`font-display font-bold leading-[1.08] text-[26px] sm:text-[30px] lg:text-[34px] ${s.title}`}>
          {pkg.name}
        </h3>
        <p className={`mt-1.5 text-base leading-relaxed ${s.subtitle}`}>{pkg.subtitle}</p>

        <div className={`my-4 h-px w-full ${s.divider}`} />

        <ul className="space-y-2.5 pl-0.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className={s.check}>{CHECK}</span>
              <span className={`text-[15px] font-normal leading-snug ${s.feature}`}>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <p className={`text-[11px] font-medium tracking-widest uppercase ${s.priceLabel}`}>Starts at</p>
          <p className={`mt-0.5 text-4xl lg:text-[40px] font-black leading-none ${s.price}`}>{price}</p>
          <p className={`mt-2 text-[11px] ${s.priceNote}`}>One-time payment • No hidden fees</p>

          <Link
            href="/packages"
            className={`mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${EASE} hover:-translate-y-0.5 ${s.button}`}
          >
            View Package Details
            <svg className={`w-4 h-4 transition-transform duration-300 ${EASE} group-hover:translate-x-1.5`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
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
  const isHinting = useRef(false)
  const hintDone = useRef(false)

  // On first mount: scroll slightly right then return to hint at swiping.
  // Uses a ref flag so it only fires once even in StrictMode double-invocation.
  useEffect(() => {
    if (hintDone.current) return
    hintDone.current = true

    const el = scrollRef.current
    if (!el) return

    const t1 = setTimeout(() => {
      isHinting.current = true
      el.scrollBy({ left: 36, behavior: "smooth" })
    }, 900)

    const t2 = setTimeout(() => {
      el.scrollBy({ left: -36, behavior: "smooth" })
    }, 1550)

    const t3 = setTimeout(() => {
      isHinting.current = false
    }, 2300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  // Derive the active card index from scroll position.
  // Suppressed while the hint animation is running to avoid dot flicker.
  const handleScroll = useCallback(() => {
    if (isHinting.current || !scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    // Content width = container width minus the symmetric 20px horizontal padding
    const contentWidth = clientWidth - 40
    // Each card is 85% of content width; stride = card + 16px gap
    const stride = contentWidth * 0.85 + 16
    const idx = Math.min(Math.round(scrollLeft / stride), PACKAGES.length - 1)
    setActiveIdx(idx)
  }, [])

  // Programmatic scroll used by dot buttons
  const scrollToCard = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const stride = (el.clientWidth - 40) * 0.85 + 16
    el.scrollTo({ left: i * stride, behavior: "smooth" })
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
          MOBILE CAROUSEL  (< 768px only)
          -mx-6 breaks out of the section's px-6 so the track
          fills the full viewport width; the track itself adds
          20px padding to keep cards 20px from each edge.
          ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden -mx-6">

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
                width: "85%",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              <MobileJourneyCard
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
          className="flex justify-center items-center gap-2 mt-3 mb-1"
          role="tablist"
          aria-label="Publishing packages"
        >
          {PACKAGES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`Go to package ${i + 1} of ${PACKAGES.length}`}
              onClick={() => scrollToCard(i)}
              className={`rounded-full transition-all duration-300 ease-out ${
                i === activeIdx
                  ? "w-5 h-2 bg-amber-500"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP GRID  (≥ 768px — zero changes from original)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.name} className={`relative h-full ${pkg.highlight ? "pt-7 lg:pt-8" : ""}`}>
            {pkg.highlight && (
              <div className="absolute top-0 inset-x-0 flex justify-center z-30">
                <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-amber-400 text-gray-950 text-[11px] font-bold tracking-[0.08em] uppercase shadow-[0_2px_10px_rgba(245,158,11,0.35)]">
                  Most Popular
                </span>
              </div>
            )}
            <FadeIn delay={i * 80} className="h-full">
              <JourneyCard pkg={pkg} currency={currency} />
            </FadeIn>
          </div>
        ))}
      </div>

      {/* ── Consultation CTA — unchanged ── */}
      <FadeIn delay={240}>
        <div className="group/bar mt-9 min-h-[80px] rounded-2xl bg-amber-50/80 border border-amber-100 shadow-[0_10px_30px_rgba(17,24,39,0.04)] px-7 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white border border-amber-200 text-amber-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                <path strokeLinecap="round" d="M3.5 9.5h17M8 3v3M16 3v3" />
              </svg>
            </div>
            <div>
              <p className="text-[17px] font-bold text-gray-900 leading-snug">
                Not sure which publishing journey is right for you?
              </p>
              <p className="text-sm text-amber-600 mt-0.5">
                Book a free consultation with our publishing experts.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className={`w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] bg-gray-900 text-white font-semibold text-sm hover:bg-black hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,24,39,0.20)] transition-all duration-300 ${EASE} shrink-0`}
          >
            Book Free Consultation
            <svg className={`w-4 h-4 transition-transform duration-300 ${EASE} group-hover/bar:translate-x-1.5`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
