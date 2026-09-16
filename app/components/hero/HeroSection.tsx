"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import RotatingHeadline from "./RotatingHeadline";
import { HERO_CTA, HERO_MICROCOPY } from "./hero.config";
import { ROYALTIES } from "@/lib/stats";

/* Soft, confident entrance — gentle fade + small upward drift, staggered.
   Kept deliberately understated: small offsets, unhurried duration. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
/* The CTA is the one element that scales in (subtly) rather than just
   drifting — a small "settle" that reads as the moment of arrival. */
const ctaItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      {/* ── Ambient background: warm golden glow + faint grid ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.01] lg:opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 88px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 88px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_75%_35%,rgba(251,191,36,0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_5%_85%,rgba(120,113,108,0.14),transparent)]"
      />

      {/* ── Full-bleed editorial photograph (lg+ only) ──
            The bookshelf becomes the environment for the entire right half
            of the hero — full section height, anchored to the viewport
            edge, no frame of any kind. It fades left into the hero
            background via a mask (not an overlay) so there is no visible
            seam between the text column and the photograph. Mobile/tablet
            get a simpler stacked treatment further down instead. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[51%] lg:block"
      >
        {/* Very subtle scale-in — the photo settles from a slight zoom into
            place, so the books register as the frame resolves. The left-fade
            mask lives on this animated layer so the seam moves with it.
            object-[40%_50%] shifts the visible window further right (~24px
            at this container size) so the female author clears the fade
            zone, without cropping the male author on the right edge. The
            mask itself now ramps over fewer, more evenly-spaced stops and
            reaches full visibility sooner — a softer, smoother blend into
            the hero background instead of a harder dark band over her. */}
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 10%, black 26%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 10%, black 26%, black 100%)",
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Image
            src="/images/home/hero-authors.webp"
            alt=""
            fill
            priority
            sizes="51vw"
            className="object-cover object-[40%_50%]"
          />
        </motion.div>
        {/* Soft photographic spotlight — a wide, low-opacity vignette centred on
            the held books (~55% down). It keeps the books lit while letting the
            faces above and the bright wall at the edges fall away, so the eye
            lands on the books first. A natural lighting fall-off, not an effect. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_60%_at_52%_55%,transparent_0%,transparent_42%,rgba(2,6,23,0.30)_100%)]"
        />
        {/* Subtle bottom vignette so the stats band blends cleanly */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-950/60 to-transparent" />
        {/* Right-edge fade — a little deeper/wider now, tempering the bright
            wall so the composition sits balanced against the text column. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent" />
      </div>

      {/* ── Hero grid ──
            lg:min-h-[84vh] is what makes the first viewport feel full: the
            grid (not the section) carries the height, so the row's extra
            space distributes via grid's default stretch + items-center,
            vertically centering the text block. The full-bleed image above
            is positioned inset-y-0 against the *section*, whose own height
            is dictated by this grid — so it grows to match automatically,
            revealing more of the bookshelf top/bottom via object-cover
            rather than stretching. */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-6 pb-12 pt-[104px] lg:min-h-[85vh] lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:pb-16 lg:pt-24">
        {/* ── LEFT: emotional storytelling ──
              lg:mt-6 nudges the whole block down ~24px within the
              vertically-centered row so it aligns better against the
              woman's eyeline in the photo — a static margin, so it doesn't
              fight the motion values framer-motion animates below. ── */}
        <motion.div {...motionProps} className="max-w-2xl lg:mt-6">
          {/* Eyebrow badge — supporting context, not the page heading */}
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-5 lg:mb-6 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-[13px] font-medium text-white/80">Self-Publishing Services for Indian Authors</span>
          </motion.p>

          {/* Visual display headline — the actual H1 (rendered inside RotatingHeadline) */}
          <motion.div
            variants={reduceMotion ? undefined : item}
            className="max-w-[88%] lg:max-w-none"
          >
            <RotatingHeadline />
          </motion.div>

          {/* Supporting paragraph — communicates key differentiators */}
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-5 max-w-[32ch] text-pretty text-lg leading-[1.6] tracking-[-0.005em] text-gray-300/85 lg:mt-7 lg:max-w-[450px]"
          >
            Editing, cover design, ISBN support, print and eBook formatting,
            and distribution in one clear publishing plan. You keep your
            copyright and {ROYALTIES} of the royalties paid to you.
          </motion.p>

          {/* Primary (filled, focal action) — single high-intent CTA.
              Stacks full-width on mobile, sits inline from sm up. */}
          <motion.div
            variants={reduceMotion ? undefined : ctaItem}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-9 lg:justify-start"
          >
            <Link
              href={HERO_CTA.primary.href}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-amber-400 px-9 py-[15px] text-[15px] font-bold text-gray-950 shadow-[0_8px_20px_-10px_rgba(251,191,36,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:shadow-[0_6px_16px_-6px_rgba(251,191,36,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:w-auto lg:rounded-full lg:py-[18px] lg:hover:-translate-y-[2px] lg:hover:bg-amber-300 lg:hover:shadow-[0_14px_32px_-12px_rgba(251,191,36,0.22)]"
            >
              {HERO_CTA.primary.label}
              <svg
                className="h-4 w-4 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href={HERO_CTA.secondary.href}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-[15px] text-[15px] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:w-auto lg:rounded-full lg:py-[18px]"
            >
              {HERO_CTA.secondary.label}
            </Link>
          </motion.div>

          {/* Quiet reassurance microcopy — minimal weight, no icons */}
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-[22px] text-center text-[13px] text-gray-400/80 lg:text-left"
          >
            {HERO_MICROCOPY}
          </motion.p>

          {/* Trust statement — complements the stats card rather than repeating
              its metrics: it speaks to the *authors* who trust Ritera, a signal
              the numbered stats (books / countries / rating / royalties) don't. */}
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-[27px] flex items-center justify-center gap-2 text-[13px] font-medium tracking-[0.01em] text-gray-300/90 lg:mt-[31px] lg:justify-start lg:text-sm"
          >
            <svg
              className="h-[18px] w-[18px] shrink-0 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <Link href="/case-studies" className="underline decoration-white/25 underline-offset-4 hover:text-white">
              Read our documented publishing case studies →
            </Link>
          </motion.p>
        </motion.div>

        {/* ── RIGHT: mobile/tablet only (<lg) — the full-bleed cinematic
              version above takes over at lg+, so this stacks the same photo
              naturally beneath the text without any card/frame. ── */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 1.04 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="relative mx-auto w-full max-w-[300px] lg:hidden"
        >
          {/* Ambient glow — large, blurred, warm amber/gold/brown radial that
              fades into the hero background well before its own edge. Sits
              behind the photo (-z-10) so it reads as depth, not a shape. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16)_0%,rgba(180,120,40,0.12)_35%,rgba(41,26,15,0.10)_55%,transparent_72%)] blur-[130px]"
          />

          {/*
            Mobile crop is a shorter, tighter frame than the desktop full-bleed:
            it zooms toward the author's face + book + upper bookshelf and lets
            the desk fall out of frame, so the hero reads faster and the eye
            lands on the face, not the furniture. A very soft Apple-register
            shadow lifts it off the dark background without a visible edge.
          */}
          <div className="relative h-[256px] w-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.14)]">
            <Image
              src="/images/home/hero-authors.webp"
              alt="Two Ritera Publishing authors proudly holding their published books."
              fill
              priority
              sizes="300px"
              className="object-cover object-[center_42%]"
            />
            {/* Tonal overlay — darkens the books/edges a touch so the order of
                attention stays face → book → shelves, never the spines. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.04)_45%,rgba(0,0,0,0.14)_100%)]"
            />
          </div>
        </motion.div>

      </div>

      {/* ── Soft dark→light transition (mobile only) ──
            A shallow, natural fade from the dark hero into the light stats
            section — like a change in lighting, not a fog. Desktop uses the
            overlapping stats card for this instead. */}
      <div
        aria-hidden="true"
        className="h-10 bg-gradient-to-b from-transparent to-[#FAF9F6] lg:hidden"
      />
    </section>
  );
}
