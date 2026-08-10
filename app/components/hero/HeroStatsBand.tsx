import FadeIn from "@/app/components/FadeIn";
import PlatformLogos from "./PlatformLogos";
import { HERO_STATS } from "./hero.config";

/**
 * Statistics band shown directly below the hero.
 *
 * Sits on a warm off-white (#FAF9F6) rather than pure white. The stats card
 * is pulled up with a real negative margin (`lg:-mt-[136px]`, desktop only)
 * so it physically overlaps the hero's dark bottom edge — a classic
 * premium-SaaS composition. That small dark sliver behind the card's top
 * edge is also what makes the glass treatment (semi-transparent +
 * backdrop-blur) actually read as glass rather than just a plain white card
 * with lower opacity.
 *
 * The live activity ticker is the closing element of the hero section itself
 * — normal document flow, scrolls away with the page like everything else.
 * It's deliberately wider than this max-w-7xl content column (see its own
 * wrapper below) so it reads as a distinct, expansive closing beat rather
 * than just another row inside the same content measure.
 *
 * Server component — purely presentational (ActivityTicker is the one client
 * island inside it, for the marquee animation).
 */
export default function HeroStatsBand() {
  return (
    <section className="relative border-b border-stone-200/70 bg-[#FAF9F6]">
      <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-2 lg:pb-20">
        {/* ── Statistics card — soft glass, overlaps the hero above at desktop ──
              offset={0}: both this and the strip below sit inside the first
              viewport by design now (no scroll needed), so FadeIn's default
              -60px bottom rootMargin — tuned for elements revealed further
              down the page as you scroll — could otherwise leave them stuck
              at opacity:0 on shorter viewports where they land close to the
              viewport's bottom edge before ever being observed as visible. */}
        <FadeIn offset={0}>
          <div className="rounded-[28px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_38px_-28px_rgba(40,30,15,0.13),0_2px_8px_-6px_rgba(40,30,15,0.04)] ring-1 ring-inset ring-white/70 backdrop-blur-2xl backdrop-saturate-150 sm:p-7 lg:-mt-[88px] lg:p-7">
            {/* items-start keeps every metric's value on one shared top baseline;
                the featured metric spans the full width on mobile so the 2×2
                numbers stay even. */}
            <dl className="grid grid-cols-2 items-start gap-x-8 gap-y-6 lg:grid-cols-5 lg:gap-x-6">
              {HERO_STATS.map((s, i) => {
                const featured = i === 0;
                return (
                  <div
                    key={s.label}
                    className={[
                      featured ? "col-span-2 lg:col-span-1" : "",
                      // The featured cell spans the full row on mobile too —
                      // left-aligned text there read as off-balance, so it
                      // gets its own centering below `sm`. Reverts to the
                      // original left alignment at sm/tablet (unchanged),
                      // then back to centered at `lg` (existing behaviour).
                      featured ? "text-center sm:text-left lg:text-center" : "",
                      // The 5-col row spans the full card width. Left-aligning
                      // every cell clustered the numbers to the left and left
                      // dead space after the last one. Centering each cell on
                      // desktop distributes all five evenly, edge to edge.
                      "lg:text-center",
                    ]
                      .filter(Boolean)
                      .join(" ") || undefined}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-[26px] font-extrabold leading-none tracking-tight text-gray-900 lg:text-4xl">
                      {s.value}
                    </dd>
                    <p className="mt-2 text-[13px] font-normal text-gray-400">
                      {s.label}
                    </p>
                    {featured && (
                      <span
                        aria-hidden="true"
                        className="mx-auto mt-2.5 block h-px w-6 bg-amber-400/40 sm:hidden"
                      />
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        </FadeIn>

        {/* ── Distribution strip — its own intentional beat, not squeezed under
              the card. A centred, letter-spaced heading flanked by soft divider
              rules, with the logo row sitting well below it. ── */}
        <FadeIn delay={120} offset={0}>
          <div className="mt-14 lg:mt-[72px]">
            <div className="flex items-center justify-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-r from-transparent to-stone-300 sm:w-16"
              />
              <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Available Worldwide On
              </p>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-l from-transparent to-stone-300 sm:w-16"
              />
            </div>
            <div className="mt-8 lg:mt-10">
              <PlatformLogos />
            </div>
          </div>
        </FadeIn>

      </div>

    </section>
  );
}
