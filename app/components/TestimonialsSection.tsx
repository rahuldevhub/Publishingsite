"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/app/components/FadeIn";

/* ────────────────────────────────────────────────────────────
   Data — Featured Author Stories
   ──────────────────────────────────────────────────────────── */

type FeaturedStory = {
  name: string;
  book: string;
  country: string;
  /** short, impactful pull-quote — the primary emphasis (2–3 lines max) */
  quote: string;
  /** supporting context shown below the author block (2–3 lines) */
  supporting: string;
  image: string;
  portraitAlt: string;
};

const FEATURED_STORIES: FeaturedStory[] = [
  {
    name: "Dr. S. Wesley Abraham",
    book: "Revelations of Infinite Life",
    country: "India",
    quote: "Ritera made publishing simple from start to finish.",
    supporting: "Their team listened carefully, guided me throughout the process, and stayed with me until my book was ready.",
    image: "/images/testimonials/wesley-abraham-launch.jpeg",
    portraitAlt: "Dr. S. Wesley Abraham reading from Revelations of Infinite Life at his Ritera Publishing book launch",
  },
  {
    name: "Shahitha Fareen M",
    book: "Jade Julep",
    country: "India",
    quote: "Publishing my first book felt effortless with Ritera.",
    supporting: "Every question was answered with patience, and holding my book for the first time was an unforgettable experience.",
    image: "/images/testimonials/shigha-sivakumar-portrait.jpeg",
    portraitAlt: "Shahitha Fareen M, author of Jade Julep, published by Ritera Publishing",
  },
];

/* ────────────────────────────────────────────────────────────
   Data — Proof Wall (masonry gallery)
   Future-ready: each tile supports category, image, link, badge, featured.
   Tiles without an `image` render an elegant placeholder to be swapped
   for a real publishing photo later.
   ──────────────────────────────────────────────────────────── */

type ProofTile = {
  /** Category A = text-heavy proof (featured, larger); Category B = visual proof (supporting) */
  kind: "text" | "visual";
  /** small uppercase label shown above the image */
  category: string;
  /** very small caption below the image */
  caption?: string;
  /** aspect-ratio utility — drives the organic, mixed-height masonry look */
  ratio: string;
  /** real asset path; omit to render a placeholder */
  image?: string;
  imageAlt?: string;
  /** object-position for the crop, e.g. "object-top" to keep a review's header visible */
  objectPos?: string;
  /** intrinsic pixel size — keeps the lightbox at the correct ratio */
  imgW?: number;
  imgH?: number;
  /** placeholder art */
  iconKey?: string;
  accent?: string;
  /** optional corner badge, e.g. a bestseller flag */
  badge?: string;
  /** future: deep-link to the source */
  link?: string;
  featured?: boolean;
};

/*
 * Curated as an editorial proof wall with a deliberate hierarchy — not a
 * uniform grid. Two categories drive the layout:
 *
 *  · kind: "text"  — TEXT-HEAVY PROOF (featured). Reviews, listings,
 *    certificates. Given wider, taller cards + a gold-tinted "featured"
 *    frame so the content is comfortably readable, and a top label for
 *    the recognised sources (Google / Amazon / LinkedIn / Reader Review).
 *  · kind: "visual" — VISUAL PROOF (supporting). Launch photos, books in
 *    hand, deliveries. Kept medium, label-free, with only a quiet caption.
 *
 * Ordered by TRUST PRIORITY, tuned to the 4-column masonry. Because
 * `column-fill: balance` starts a new column roughly every 4 items, reading
 * the wall row-by-row (left→right, top→bottom) follows this array in groups
 * of four. So the array is laid out column-major:
 *   Row 1 (column tops, first viewport) = Tier 1, highest trust:
 *     Google Review · Amazon Listing · LinkedIn (Rakesh) · Author holding book
 *   Row 2 = Tier 2, the publishing journey:
 *     Book Launch · Fresh Off the Press · Book Delivery · Published Book
 *   Row 3 = Tier 3, community & engagement:
 *     Reader Review · Author Interview · Reader Review · Author Interview
 *   Row 4 = Tier 3 extras: Book Signing · Certificate · Bestseller · Author photo
 * Featured text cards are deliberately spread across the columns (not adjacent)
 * to keep the Pinterest rhythm. Sizing: text proofs run a touch taller for
 * readability (near their natural ratio, no aggressive crop); purely visual
 * cards are trimmed slightly so the readable proof dominates.
 */
const PROOF_TILES: ProofTile[] = [
  // ── Column 1 ──────────────────────────────────────────────
  {
    kind: "text",
    category: "Google Review",
    caption: "Real 5★ Google review",
    ratio: "aspect-[4/3]",
    objectPos: "object-top",
    image: "/images/testimonials/google-review-siva-kumar.png",
    imageAlt: "Five-star Google review from Siva Kumar about publishing The Book of Endless Doors with Ritera",
    imgW: 672,
    imgH: 480,
  },
  {
    kind: "visual",
    category: "Book Launch",
    caption: "Launch day",
    ratio: "aspect-[4/5]",
    image: "/images/testimonials/wesley-abraham-launch.jpeg",
    imageAlt: "Dr. S. Wesley Abraham reading from his book at his Ritera Publishing launch event",
    imgW: 1200,
    imgH: 1600,
  },
  {
    kind: "text",
    category: "Reader Review",
    caption: "From the acknowledgements",
    ratio: "aspect-[3/4]",
    image: "/images/testimonials/highlighted-book-page.jpeg",
    imageAlt: "A published book's acknowledgements page with 'extremely grateful to Ritera Publishing' highlighted",
    imgW: 900,
    imgH: 1200,
  },
  // ── Column 2 ──────────────────────────────────────────────
  {
    kind: "text",
    category: "Amazon Listing",
    caption: "Live on Amazon",
    ratio: "aspect-square",
    image: "/images/testimonials/abhijit-mishra-amazon.webp",
    imageAlt: "The Trust Architect by Abhijit Mishra live on Amazon's Kindle Store beside the printed book",
    imgW: 672,
    imgH: 642,
  },
  {
    kind: "visual",
    category: "Fresh Off the Press",
    caption: "First printed copies",
    ratio: "aspect-[4/5]",
    image: "/images/testimonials/book-stack.jpeg",
    imageAlt: "A tall stack of freshly printed copies of Revelations of Infinite Life at a Ritera book launch",
    imgW: 960,
    imgH: 1280,
  },
  {
    kind: "visual",
    category: "Author Interview",
    caption: "Mr. Abhijit Mishra on cyber security",
    ratio: "aspect-[3/4]",
    objectPos: "object-top",
    image: "/images/testimonials/abhijit-mishra-interview.jpeg",
    imageAlt: "Author Abhijit Mishra in a Ritera Publishing interview discussing cyber security",
    imgW: 820,
    imgH: 1575,
  },
  // ── Column 3 ──────────────────────────────────────────────
  {
    kind: "text",
    category: "LinkedIn Recommendation",
    caption: "Praise on LinkedIn",
    ratio: "aspect-[5/4]",
    objectPos: "object-top",
    image: "/images/testimonials/linkedin-recommendation.png",
    imageAlt: "LinkedIn thread where Rakesh Sharma thanks Ritera Publishing, with a reply from the team",
    imgW: 697,
    imgH: 546,
  },
  {
    kind: "visual",
    category: "Book Delivery",
    caption: "A fresh box of Jade Julep",
    ratio: "aspect-[4/5]",
    image: "/images/Jadejulep2.webp",
    imageAlt: "A freshly delivered box of Jade Julep copies, published by Ritera Publishing",
    imgW: 1920,
    imgH: 2496,
  },
  {
    kind: "text",
    category: "Google Review",
    caption: "Another 5★ review",
    ratio: "aspect-[2/1]",
    image: "/images/testimonials/google-review-diptisha-sarkar.png",
    imageAlt: "Five-star Google review from Diptisha Sarkar praising Ritera Publishing after reading Jade Julep",
    imgW: 676,
    imgH: 337,
  },
  // ── Column 4 ──────────────────────────────────────────────
  {
    kind: "visual",
    category: "Published Author",
    caption: "P. Ramgopal with his two published titles",
    ratio: "aspect-[4/5]",
    image: "/images/testimonials/ramgopal-holding-books.jpeg",
    imageAlt: "Author P. Ramgopal holding his published books, Tirukkural for the Teens and Walk with Valluvar, published by Ritera",
    imgW: 1536,
    imgH: 2048,
  },
  {
    kind: "visual",
    category: "Published Book",
    caption: "Jade Julep — An Anthology",
    ratio: "aspect-[4/5]",
    image: "/images/Jadejulep1.webp",
    imageAlt: "The published book Jade Julep — An Anthology, a Ritera Exclusive, displayed with a stack of printed copies",
    imgW: 1000,
    imgH: 1333,
  },
  {
    kind: "visual",
    category: "Author Interview",
    caption: "In conversation with Khyati Gautam",
    ratio: "aspect-video",
    image: "/images/testimonials/khyati-gautam-interview.jpeg",
    imageAlt: "Author Khyati Gautam speaking in a video interview with Ritera Publishing",
    imgW: 1000,
    imgH: 553,
  },
  {
    kind: "visual",
    category: "Author Holding Book",
    caption: "In the author's hands",
    ratio: "aspect-[4/5]",
    image: "/images/testimonials/author-holding-book.jpeg",
    imageAlt: "An author holding their finished copy of Revelations of Infinite Life, published by Ritera",
    imgW: 960,
    imgH: 1280,
  },
];

/** image-bearing tiles only — the set the lightbox cycles through */
const IMAGE_TILES = PROOF_TILES.filter((t) => t.image);

/**
 * Only recognised, self-identifying sources keep a top label — everything
 * else relies on the image + a quiet caption (requirement 3).
 */
const LABELED_CATEGORIES = new Set([
  "Google Review",
  "Amazon Listing",
  "LinkedIn Recommendation",
  "Reader Review",
]);

/** single-path outline icons for placeholder tiles */
const PLACEHOLDER_ICONS: Record<string, string> = {
  pen: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125L16.875 4.5",
  users:
    "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  seal: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  mic: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z",
  truck:
    "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0H9.75",
  camera:
    "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z",
  trophy:
    "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0",
  book: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
};

type TrustMetricData = { icon: string; value: string; label: string };

const TRUST_METRICS: TrustMetricData[] = [
  { icon: "⭐", value: "4.9 / 5", label: "Google Rating" },
  { icon: "👥", value: "120+", label: "Google Reviews" },
  { icon: "🌍", value: "160+", label: "Countries Reached" },
];

const CloseIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const MagnifyIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zM10.5 7.75v5.5M7.75 10.5h5.5" />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Reusable components
   ──────────────────────────────────────────────────────────── */

function AuthorStoryCard({ story }: { story: FeaturedStory }) {
  return (
    <article className="group relative flex h-full flex-col items-center rounded-3xl border border-white/[0.08] bg-gradient-to-b from-gray-800/60 to-gray-900 p-8 text-center shadow-[0_16px_48px_-18px_rgba(0,0,0,0.65)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/[0.16] hover:shadow-[0_32px_72px_-16px_rgba(0,0,0,0.7)] sm:p-10 lg:p-11">
      {/* Stars */}
      <div className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((s) => (
          <svg key={s} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Trust label — quiet reassurance beneath the rating */}
      <p className="mt-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400/70">
        Verified Author
      </p>

      {/* Primary pull-quote — the emotional hook */}
      <blockquote className="mt-6 max-w-[20ch] text-balance font-serif text-[1.7rem] leading-[1.36] tracking-tight text-white sm:text-[2rem] lg:text-[2.15rem]">
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      {/* Gold divider — luxury editorial separator */}
      <div className="mt-9 h-px w-14 bg-amber-400/60" />

      {/* Author block — portrait left, identity + supporting text right */}
      <div className="mt-11 flex w-full flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-7">
        {/* Featured author portrait — the trust-building focal point */}
        <div className="relative aspect-[4/5] w-44 shrink-0 overflow-hidden rounded-[24px] border border-amber-400/25 bg-gradient-to-br from-gray-700 to-gray-800 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] transition-colors duration-300 ease-out group-hover:border-amber-400/45">
          <Image
            src={story.image}
            alt={story.portraitAlt}
            fill
            sizes="(min-width: 640px) 180px, 200px"
            className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.06]"
          />
          {/* soft highlight + vignette to read as a photograph */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_16%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,0,0,0.42),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.06]" />
        </div>

        {/* Identity + supporting testimonial */}
        <div className="text-center sm:min-w-0 sm:flex-1 sm:pt-1 sm:text-left">
          <p className="text-xl font-bold tracking-tight text-white">{story.name}</p>
          <p className="mt-1 text-xs text-gray-500/90">Author of {story.book}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-light text-gray-500">
            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
            </svg>
            {story.country}
          </p>

          {/* Supporting context — read only if interested */}
          <p className="mt-6 text-base leading-[1.75] text-gray-300/80">{story.supporting}</p>
        </div>
      </div>
    </article>
  );
}

/** compact mobile composition — same content/data as AuthorStoryCard, tuned for
 *  the swipe carousel: tighter vertical rhythm, no hover/lift affordances
 *  (touch has no hover), single centered column at every width it renders at. */
function AuthorStoryCardMobile({ story }: { story: FeaturedStory }) {
  return (
    <article className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-gradient-to-b from-gray-800/60 to-gray-900 p-6 text-center shadow-[0_16px_48px_-18px_rgba(0,0,0,0.65)]">
      {/* Stars */}
      <div className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((s) => (
          <svg key={s} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Trust label — quiet reassurance beneath the rating */}
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400/70">
        Verified Author
      </p>

      {/* Primary pull-quote — the emotional hook */}
      <blockquote className="mt-5 max-w-[19ch] text-balance font-serif text-[1.55rem] leading-[1.32] tracking-tight text-white">
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      {/* Gold divider — luxury editorial separator */}
      <div className="mt-6 h-px w-12 bg-amber-400/60" />

      {/* Author portrait — centered, still the trust-building focal point */}
      <div className="relative mt-6 aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-[22px] border border-amber-400/25 bg-gradient-to-br from-gray-700 to-gray-800 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)]">
        <Image
          src={story.image}
          alt={story.portraitAlt}
          fill
          sizes="200px"
          className="object-cover"
        />
        {/* soft highlight + vignette to read as a photograph */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_16%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,0,0,0.42),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/[0.06]" />
      </div>

      {/* Identity */}
      <p className="mt-4 text-lg font-bold tracking-tight text-white">{story.name}</p>
      <p className="mt-1 text-xs text-gray-500/90">Author of {story.book}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-light text-gray-500">
        <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
        </svg>
        {story.country}
      </p>

      {/* Supporting context */}
      <p className="mt-4 max-w-[32ch] text-sm leading-[1.65] text-gray-300/80">{story.supporting}</p>
    </article>
  );
}

/** elegant dark placeholder — a subtle single-hue tint with a centered line icon */
function PlaceholderArt({ iconKey, accent }: { iconKey: string; accent: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${accent} to-gray-900`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_28%,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="h-9 w-9 text-white/25" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={PLACEHOLDER_ICONS[iconKey] ?? PLACEHOLDER_ICONS.book} />
        </svg>
      </div>
    </div>
  );
}

function ProofTileCard({
  tile,
  delay,
  active = false,
  onOpen,
}: {
  tile: ProofTile;
  delay: number;
  /** when true, the travelling gold highlight is currently resting on this card */
  active?: boolean;
  onOpen?: () => void;
}) {
  const isText = tile.kind === "text";
  const showLabel = LABELED_CATEGORIES.has(tile.category);

  // Featured (text) cards carry a gold-tinted frame + deeper shadow so they
  // read as the anchors; visual cards stay quieter and support them.
  const frameClasses = isText
    ? "border-amber-400/25 bg-gray-800/50 shadow-[0_20px_54px_-22px_rgba(0,0,0,0.82)] hover:border-amber-400/45 hover:shadow-[0_30px_66px_-24px_rgba(0,0,0,0.78)]"
    : "border-white/[0.07] bg-gray-800/40 shadow-[0_12px_36px_-20px_rgba(0,0,0,0.75)] hover:border-white/[0.16] hover:shadow-[0_26px_58px_-24px_rgba(0,0,0,0.7)]";

  const mediaClasses = `group/tile relative block w-full overflow-hidden rounded-[22px] border transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 ${frameClasses}`;

  const media = (
    <div className={`relative ${tile.ratio} w-full overflow-hidden`}>
      {tile.image ? (
        <Image
          src={tile.image}
          alt={tile.imageAlt ?? tile.caption ?? tile.category}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 45vw"
          className={`object-cover ${tile.objectPos ?? "object-center"} transition-transform duration-500 ease-out group-hover/tile:scale-[1.03]`}
        />
      ) : (
        <PlaceholderArt iconKey={tile.iconKey ?? "book"} accent={tile.accent ?? "from-amber-400/12"} />
      )}

      {tile.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-gray-900 shadow-[0_6px_16px_-6px_rgba(251,191,36,0.7)]">
          {tile.badge}
        </span>
      )}

      {/* "click to enlarge" affordance — appears on hover/focus of the card */}
      {onOpen && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100">
          <span className="m-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/25 backdrop-blur-sm">
            {MagnifyIcon}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );

  return (
    <FadeIn delay={delay} className={`${isText ? "mb-5" : "mb-4"} break-inside-avoid`}>
      <figure>
        {showLabel && (
          <figcaption className="mb-2 flex items-center gap-1.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400/80">
            <span className="inline-block h-1 w-1 rounded-full bg-amber-400/70" aria-hidden="true" />
            {tile.category}
          </figcaption>
        )}

        <div className="relative">
          {/* travelling highlight — a soft gold glow that rests on one card at a time */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-[3px] rounded-[25px] transition-opacity duration-700 ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ boxShadow: "0 0 0 2px rgba(251,191,36,0.85), 0 0 34px 6px rgba(251,191,36,0.4)" }}
          />

          {onOpen ? (
            <button
              type="button"
              onClick={onOpen}
              aria-label={`View ${tile.category} proof at full size`}
              className={`${mediaClasses} text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400`}
            >
              {media}
            </button>
          ) : (
            <div className={mediaClasses}>{media}</div>
          )}
        </div>

        {tile.caption && (
          <figcaption className="mt-2 px-0.5 text-[11px] font-light text-gray-500">{tile.caption}</figcaption>
        )}
      </figure>
    </FadeIn>
  );
}

/** high-res proof image that plays a soft zoom-in each time it mounts */
function ZoomImage({ tile }: { tile: ProofTile }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Image
      src={tile.image!}
      alt={tile.imageAlt ?? tile.category}
      width={tile.imgW ?? 1200}
      height={tile.imgH ?? 1200}
      sizes="90vw"
      priority
      className={`h-auto max-h-[72vh] w-auto max-w-[90vw] rounded-xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-[transform,opacity] duration-300 ease-out ${
        shown ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
      }`}
    />
  );
}

function ProofWallLightbox({
  tiles,
  index,
  onClose,
  onNavigate,
}: {
  tiles: ProofTile[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const total = tiles.length;
  const tile = tiles[index];
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  const [entered, setEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(nextIndex);
      if (e.key === "ArrowLeft") onNavigate(prevIndex);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate, nextIndex, prevIndex]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // play the backdrop/scale entry once, on open
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // mobile swipe → previous / next
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || total < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) onNavigate(dx < 0 ? nextIndex : prevIndex);
    touchStartX.current = null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${tile.category} — full proof`}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-5 backdrop-blur-md transition-opacity duration-300 ease-out sm:p-8 ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* preload neighbours for smooth ←/→ navigation */}
      <Image src={tiles[prevIndex].image!} alt="" width={24} height={24} loading="eager" aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />
      <Image src={tiles[nextIndex].image!} alt="" width={24} height={24} loading="eager" aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 sm:right-8 sm:top-8"
      >
        {CloseIcon}
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(prevIndex);
            }}
            aria-label="Previous proof"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 sm:left-6"
          >
            {ChevronLeftIcon}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(nextIndex);
            }}
            aria-label="Next proof"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 sm:right-6"
          >
            {ChevronRightIcon}
          </button>
        </>
      )}

      <div
        className={`flex max-h-full max-w-full flex-col items-center gap-4 transition-transform duration-300 ease-out ${
          entered ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400/80">{tile.category}</span>

        {/* key by index so the zoom-in replays on every navigation */}
        <ZoomImage key={index} tile={tile} />

        {tile.caption && <p className="text-xs text-gray-400">{tile.caption}</p>}
        <p className="text-xs text-gray-500">
          {index + 1} / {total}
        </p>
      </div>
    </div>
  );
}

function TrustMetric({ icon, value, label, className = "" }: TrustMetricData & { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="mb-1.5 text-base opacity-60 sm:mb-4 sm:text-lg" aria-hidden="true">
        {icon}
      </div>
      <p className="text-[2.1rem] font-black tracking-tight text-white sm:text-[3.4rem]">{value}</p>
      <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-gray-500 sm:mt-3 sm:text-[10px]">{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Section
   ──────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [glow, setGlow] = useState(-1);

  // Slowly walk a gold highlight from one proof card to the next. Paused for
  // reduced-motion users and while the lightbox is open.
  useEffect(() => {
    if (lightbox !== null) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setGlow((g) => (g + 1) % PROOF_TILES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [lightbox]);

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white" aria-labelledby="author-stories-heading">
      {/* very low-opacity ambient depth — not meant to be noticed, just felt */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(255,255,255,0.035),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_88%_18%,rgba(251,191,36,0.05),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_105%,rgba(0,0,0,0.35),transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:py-[120px]">
        {/* PART 1 — Featured Author Stories */}
        <FadeIn>
          <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Author Stories</p>
            <h2 id="author-stories-heading" className="text-balance font-serif text-[2.75rem] leading-[1.1] tracking-tight lg:text-6xl">
              Trusted by Authors Across India
            </h2>
            <p className="mt-5 text-base text-gray-400 lg:text-lg">
              Real stories from authors who trusted us with their dreams.
            </p>
          </div>
        </FadeIn>

        {/* Tablet/desktop — unchanged grid layout */}
        <div className="hidden gap-8 sm:grid md:grid-cols-2">
          {FEATURED_STORIES.map((story, i) => (
            <FadeIn key={story.name} delay={i * 100}>
              <AuthorStoryCard story={story} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile-only — horizontal swipe carousel, next card peeks from the right */}
        <FadeIn className="-mx-6 sm:hidden">
          <div className="flex gap-4 overflow-x-auto pl-6 pr-4 pb-2 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FEATURED_STORIES.map((story) => (
              <div key={story.name} className="w-[80%] shrink-0 snap-start">
                <AuthorStoryCardMobile story={story} />
              </div>
            ))}
          </div>
          <p className="mt-3 pl-6 text-xs font-medium text-gray-500" aria-hidden="true">
            Swipe to read more stories →
          </p>
        </FadeIn>

        {/* PART 2 — Proof Wall (immersive masonry gallery) */}
        <FadeIn>
          <div className="mx-auto mb-14 mt-24 max-w-2xl text-center lg:mb-20 lg:mt-36">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Real Author Journey</p>
            <h3 className="text-balance font-serif text-4xl leading-[1.1] tracking-tight lg:text-5xl">
              Proof. <span className="italic text-amber-400">Not Promises.</span>
            </h3>
            <p className="mt-5 text-base text-gray-400 lg:text-lg">
              Every image below represents a real author, a real milestone, and a real publishing journey with Ritera.
            </p>
          </div>
        </FadeIn>

        {/* True masonry — organic, mixed-height. Breaks out of the centered
            container to run full-bleed (edge to edge) so four columns fit
            comfortably and the wall reads shorter without shrinking the cards. */}
        <div className="mx-[calc(50%_-_50vw)] columns-2 gap-4 px-4 sm:px-6 md:columns-3 lg:columns-4 lg:px-8">
          {PROOF_TILES.map((tile, i) => {
            const imgIndex = tile.image ? IMAGE_TILES.indexOf(tile) : -1;
            return (
              <ProofTileCard
                key={`${tile.category}-${i}`}
                tile={tile}
                delay={(i % 6) * 60}
                active={glow === i}
                onOpen={imgIndex >= 0 ? () => setLightbox(imgIndex) : undefined}
              />
            );
          })}
        </div>

        {lightbox !== null && (
          <ProofWallLightbox
            tiles={IMAGE_TILES}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        )}

        {/* PART 3 — Trust Metrics + CTA */}
        <FadeIn delay={100}>
          <div className="relative mt-16 overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-gray-800/70 via-gray-900 to-gray-900 px-6 py-8 sm:p-12 lg:mt-24 lg:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(251,191,36,0.06),transparent)]" />

            <div className="relative flex flex-col gap-6 sm:gap-12 lg:flex-row lg:items-center lg:gap-16">
              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-y-10 lg:gap-x-8">
                {TRUST_METRICS.map((m, i) => (
                  <TrustMetric key={m.label} {...m} className={i === 2 ? "col-span-2 sm:col-span-1" : ""} />
                ))}
              </div>

              <div className="shrink-0 text-center lg:w-[340px] lg:text-right">
                <h4 className="mb-2 font-serif text-[1.65rem] leading-[1.2] tracking-tight sm:mb-3 lg:text-4xl">
                  Ready to hold your own published book?
                </h4>
                <p className="mb-5 text-xs leading-normal text-gray-500 sm:mb-7 sm:text-sm sm:leading-relaxed">
                  Join hundreds of authors who trusted Ritera Publishing to turn their manuscript into a professionally published book.
                </p>
                <Link
                  href="/packages"
                  className="group/cta flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-bold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_16px_40px_-10px_rgba(251,191,36,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:inline-flex sm:h-[52px] sm:w-auto sm:px-10"
                >
                  Start Your Publishing Journey
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
