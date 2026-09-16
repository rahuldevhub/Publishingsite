/**
 * Hero configuration — single source of truth for all editable hero content.
 *
 * Everything here is data-only (no JSX) so copy, trust signals, and the
 * weekday-based rotating headlines can be tuned without touching layout code.
 */

/* ────────────────────────────────────────────────────────────────────────
 * Rotating headline system
 *
 * The headline is split into a fixed part and a rotating part:
 *
 *     Your Story  ·  {deserves to be published.}
 *     └ static ─┘     └────── rotates ──────────┘
 *
 * Rotating phrases are grouped into weekday buckets. `phrasesForToday()`
 * selects the correct bucket based on the current weekday so the messaging
 * can feel fresh across the week without any code changes — just edit arrays.
 * ──────────────────────────────────────────────────────────────────────── */

export const HEADLINE_STATIC = "Your Story.";

/**
 * Phrase buckets keyed by a human label (weekday grouping documented below).
 * Deliberately short, concrete and visual — the reader should *picture* it,
 * not just agree with it. Each line is its own sentence.
 *
 * Every phrase here is verified to render as a single line at the hero's
 * reference width (576px container, 60px/800-weight desktop headline type).
 * That's deliberate: mixing 1-line and 2-line phrases in the same rotating
 * slot still looks visually inconsistent even with zero layout shift, since
 * short phrases leave visible empty space in a slot sized for a longer one.
 * Keeping the whole set single-line keeps the block's shape constant, not
 * just its height. Longer phrases ("Deserves your name on the cover.",
 * "Deserves to be discovered.") were dropped for this reason.
 */
export const HEADLINE_PHRASE_SETS = {
  /** Mon / Tue — momentum & beginnings. Leads with the core publishing promise. */
  earlyWeek: [
    "Deserves to Be in Print.",
    "Deserves Readers.",
    "Deserves to Begin.",
    "Deserves a Chance.",
  ],
  /** Wed / Thu — craft & the finished book (publishing outcome, not just a cover). */
  midWeek: [
    "Published Beautifully.",
    "Deserves to Be Read.",
    "Deserves to Be Held.",
    "Deserves Care.",
  ],
  /** Fri / Sat / Sun — reach & legacy */
  weekend: [
    "Deserves the World.",
    "Becomes a Legacy.",
    "Deserves to Inspire.",
    "Deserves to Endure.",
  ],
} as const;

export type PhraseSetKey = keyof typeof HEADLINE_PHRASE_SETS;

/**
 * Map a weekday (0 = Sunday … 6 = Saturday) to a phrase bucket.
 * Kept pure and exported so it can be unit-tested independently of React.
 */
export function phraseSetKeyForDay(day: number): PhraseSetKey {
  switch (day) {
    case 1:
    case 2:
      return "earlyWeek";
    case 3:
    case 4:
      return "midWeek";
    default: // 5, 6, 0 (Fri, Sat, Sun)
      return "weekend";
  }
}

/** Returns the rotating phrases to show today. */
export function phrasesForToday(now: Date = new Date()): readonly string[] {
  return HEADLINE_PHRASE_SETS[phraseSetKeyForDay(now.getDay())];
}

/** Milliseconds each phrase stays on screen before rotating — calm, not a slideshow. */
export const HEADLINE_ROTATE_MS = 5500;

/* ────────────────────────────────────────────────────────────────────────
 * Trust indicators — slim strip above the headline.
 * Text-only by design (no icons/emoji) — kept to three items so nothing here
 * repeats the statistics card below. Minimal, quiet, premium.
 * ──────────────────────────────────────────────────────────────────────── */

export const TRUST_INDICATORS: string[] = [
  "4.9/5 Author Rating",
  "160+ Countries",
  "100% Royalties",
];

/* ────────────────────────────────────────────────────────────────────────
 * Live activity ticker — infinite marquee below the hero
 * ──────────────────────────────────────────────────────────────────────── */

export type ActivityItem = { icon: string; text: string; time: string };

export const ACTIVITY_FEED: ActivityItem[] = [
  { icon: "📖", text: "Book published on Amazon", time: "2 min ago" },
  { icon: "✅", text: "ISBN approved", time: "9 min ago" },
  { icon: "🎨", text: "Cover design completed", time: "14 min ago" },
  { icon: "✍️", text: "New author onboarded", time: "23 min ago" },
  { icon: "📝", text: "Manuscript editing completed", time: "38 min ago" },
  { icon: "💰", text: "Royalty payout processed", time: "51 min ago" },
  { icon: "📅", text: "Author consultation booked", time: "1 hr ago" },
  { icon: "🚀", text: "Book launched worldwide", time: "2 hrs ago" },
  { icon: "🌍", text: "Distributed to 160+ countries", time: "3 hrs ago" },
  { icon: "⭐", text: "New 5-star author review", time: "Today" },
];

/* ────────────────────────────────────────────────────────────────────────
 * Statistics band
 * ──────────────────────────────────────────────────────────────────────── */

export type Stat = { value: string; label: string };

export const HERO_STATS: Stat[] = [
  { value: "Tailored", label: "Publishing Timeline" },
  { value: "160+", label: "Countries" },
  { value: "4.9/5", label: "Author Rating" },
  { value: "40,000+", label: "Stores Worldwide" },
  { value: "100%", label: "Royalties" },
];

export const RECENTLY_PUBLISHED = {
  title: "Jade Julep",
  by: "Ritera Exclusive",
  when: "3 days ago",
  cover: "/images/Jadejulep1.webp",
  href: "/books",
} as const;

/* ────────────────────────────────────────────────────────────────────────
 * Distribution platforms — monochrome trust strip
 * ──────────────────────────────────────────────────────────────────────── */

export const DISTRIBUTION_PLATFORMS: string[] = [
  "amazon",
  "Google Books",
  "Apple Books",
  "Barnes & Noble",
  "Kobo",
  "Flipkart",
];

/* ────────────────────────────────────────────────────────────────────────
 * Primary CTAs
 * ──────────────────────────────────────────────────────────────────────── */

export const HERO_CTA = {
  primary: { label: "Compare Publishing Packages", href: "/packages" },
  secondary: { label: "See Author Results", href: "/case-studies" },
} as const;

/** One quiet reassurance line beneath the CTAs — no icons, minimal weight. */
export const HERO_MICROCOPY = "Clear package scope · Free consultation · You retain your copyright";
