"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ACTIVITY_FEED, type ActivityItem } from "./hero.config";

/**
 * Live activity — makes Ritera feel like a running publishing operation.
 *
 * Two distinct presentations, chosen by breakpoint:
 *
 * - **Desktop/tablet (sm+):** a contained, rounded dark bar with a pinned
 *   "LIVE" badge on the left and timestamped event pills scrolling in a
 *   seamless infinite marquee to its right (the track holds two identical
 *   copies and translates -50%, so the loop has no visible seam).
 *
 * - **Mobile (<sm):** a purpose-built *activity feed* — a "LIVE · Publishing
 *   activity" header above a row of swipeable, snap-to cards (event on the
 *   first line, timestamp below). No auto-motion fighting the user's swipe,
 *   no tiny moving text.
 *
 * Reduced motion: the desktop marquee becomes a static horizontal scroll; the
 * mobile feed is already manual so it is unaffected.
 */
function EventPill({ icon, text, time }: ActivityItem) {
  return (
    <div className="mx-1.5 flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1 pl-2.5 pr-3">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span aria-hidden="true" className="text-xs">
        {icon}
      </span>
      <span className="whitespace-nowrap text-xs font-medium text-gray-300">
        {text}
      </span>
      <span className="whitespace-nowrap text-xs text-gray-500">{time}</span>
    </div>
  );
}

/* Mobile feed card — event on the first line, timestamp on its own line below,
   in a snap-scroll row the reader swipes at their own pace. */
function EventCard({ icon, text, time }: ActivityItem) {
  return (
    <div className="ml-3 flex w-[260px] shrink-0 snap-start flex-col justify-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span aria-hidden="true" className="text-sm">
          {icon}
        </span>
        <span className="truncate text-[13px] font-semibold text-gray-200">
          {text}
        </span>
      </div>
      <span className="pl-[14px] text-[11px] font-medium tracking-wide text-gray-500">
        {time}
      </span>
    </div>
  );
}

export default function ActivityTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* ── Mobile: swipeable activity feed (header + cards) ── */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/90 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-2 px-4 pb-1.5 pt-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300/70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            Live
          </span>
          <span aria-hidden="true" className="h-2.5 w-px bg-white/15" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Publishing activity
          </span>
        </div>
        <div className="flex snap-x snap-mandatory overflow-x-auto pb-3.5 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ACTIVITY_FEED.map((a, i) => (
            <EventCard key={i} {...a} />
          ))}
        </div>
      </div>

      {/* ── Desktop/tablet: pinned LIVE badge + marquee bar ── */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-gray-950/90 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md sm:flex sm:min-h-[42px] sm:items-stretch">
        {/* Pinned LIVE badge */}
        <div className="z-20 flex shrink-0 items-center gap-1.5 border-r border-white/10 bg-gray-950 px-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300/70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            Live
          </span>
        </div>

        {/* Scrolling stream */}
        <div className="relative flex-1 overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent" />

          {reduceMotion ? (
            <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ACTIVITY_FEED.map((a, i) => (
                <EventPill key={i} {...a} />
              ))}
            </div>
          ) : (
            <div className="flex w-max animate-hero-ticker hover:[animation-play-state:paused]">
              <div className="flex shrink-0">
                {ACTIVITY_FEED.map((a, i) => (
                  <EventPill key={i} {...a} />
                ))}
              </div>
              <div className="flex shrink-0" aria-hidden="true">
                {ACTIVITY_FEED.map((a, i) => (
                  <EventPill key={i} {...a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
