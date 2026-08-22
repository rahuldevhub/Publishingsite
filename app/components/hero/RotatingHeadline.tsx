"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  HEADLINE_STATIC,
  HEADLINE_ROTATE_MS,
  phrasesForToday,
} from "./hero.config";

// Resolve the weekday-based phrase set on the client only, so SSR and the first
// client render agree (empty → fallback) and there's no hydration mismatch.
// useSyncExternalStore gives us a server snapshot (empty) and a client snapshot
// (cached, stable reference) without ever calling setState inside an effect.
const EMPTY_PHRASES: readonly string[] = [];
let cachedPhrases: readonly string[] | null = null;
function getClientPhrases(): readonly string[] {
  if (!cachedPhrases) cachedPhrases = phrasesForToday();
  return cachedPhrases;
}
const subscribeNoop = () => () => {};

/**
 * Two-line hero headline where the first line is fixed and the second line
 * gently rotates through a set of aspirational phrases.
 *
 * - The active phrase set is chosen by weekday (see hero.config).
 * - Motion is a soft fade + small upward drift (Apple/Linear register).
 * - Respects `prefers-reduced-motion`: no rotation, no transform.
 * - Zero layout shift: every phrase in the set is rendered once, invisibly,
 *   stacked in the same CSS grid cell (`grid-area: 1/1`). The grid row's
 *   height is then the tallest of ALL of them — not just whichever phrase is
 *   currently showing — so the block's height never changes as phrases swap,
 *   and nothing below (paragraph, CTAs, image column) ever moves.
 */
export default function RotatingHeadline() {
  const reduceMotion = useReducedMotion();

  // Resolve phrases on the client to avoid SSR/CSR weekday mismatches.
  const phrases = useSyncExternalStore(
    subscribeNoop,
    getClientPhrases,
    () => EMPTY_PHRASES,
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || phrases.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, HEADLINE_ROTATE_MS);
    return () => clearInterval(id);
  }, [reduceMotion, phrases]);

  const fallback = "Deserves to Be Held.";
  const current = phrases[index] ?? fallback;
  // Before hydration resolves `phrases`, size against the fallback alone so
  // the sizer set always matches what's actually rendered.
  const sizerSet = phrases.length ? phrases : [fallback];

  return (
    <h1 className="font-extrabold leading-[1.1] tracking-[-0.03em] text-[clamp(26px,7.4vw,30px)] sm:text-5xl lg:text-6xl">
      <span className="block text-white">{HEADLINE_STATIC}</span>

      {/* Rotating slot — every phrase is stacked in the same grid cell, so the
          cell's height is always the tallest of the whole set. Only the
          visible phrase (painted via AnimatePresence) ever changes. */}
      <span className="relative mt-1 grid text-amber-400">
        {sizerSet.map((p) => (
          <span
            key={p}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 block"
          >
            {p}
          </span>
        ))}

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="col-start-1 row-start-1 block"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
