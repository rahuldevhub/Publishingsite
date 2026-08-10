"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import Image from "next/image";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  author: { name: string } | null;
};

type Item = Book | { id: string; placeholder: true };

const PLACEHOLDER_COUNT = 16;
const SHELF_IMAGE = "/images/home/bookshelf-bg.webp";
// Asset is trimmed to the opaque cabinet bounds (1458×592) — every position
// below is a % of this box so it stays correct at any rendered width.
const SHELF_ASPECT = "1458 / 592";

function isPlaceholder(item: Item): item is { id: string; placeholder: true } {
  return "placeholder" in item;
}

/** A single book cover — reused by the shelf (desktop) and scroll (mobile) layouts. */
function BookCover({ item, onShelf }: { item: Item; onShelf: boolean }) {
  if (isPlaceholder(item)) {
    return (
      <div
        className={onShelf ? "h-full shrink-0 animate-pulse" : "w-28 shrink-0 animate-pulse"}
        style={onShelf ? undefined : undefined}
      >
        <div className={`${onShelf ? "h-full" : "w-28 aspect-[2/3]"} rounded-[2px] bg-white/10`} />
      </div>
    );
  }

  const book = item;
  // Transparent-PNG covers are pre-rendered 3D hardcovers on a clear background —
  // they render bare (no card/border/outline). Legacy opaque covers keep the faux
  // 3D card treatment so nothing looks flat during the PNG migration.
  const isTransparent = !!book.cover_image && /\.png(\?|$)/i.test(book.cover_image);

  return (
    <Link
      href={`/books/${book.slug}`}
      title={book.title}
      className={onShelf ? "h-full shrink-0" : "shrink-0"}
    >
      <div className={onShelf ? "book-card group relative h-full" : "book-card group relative w-28"}>
        {/* hover placard — shelf layout only, keeps the surface clutter-free by default */}
        {onShelf && (
          <div className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur transition-all duration-200 group-hover:-translate-y-[calc(100%+6px)] group-hover:opacity-100">
            {book.title}
            {book.author && <span className="text-amber-200/80"> · {book.author.name}</span>}
          </div>
        )}

        {isTransparent ? (
          /* ── Transparent PNG — only the book is visible, grounded by layered drop-shadows ── */
          <div className={onShelf ? "relative flex h-full flex-col items-center" : "relative"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.cover_image!}
              alt={book.title}
              loading="lazy"
              decoding="async"
              className={
                (onShelf ? "h-full w-auto " : "w-28 h-auto ") +
                "object-contain transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
              }
              style={{
                filter:
                  "drop-shadow(0 1px 1px rgba(0,0,0,0.45)) drop-shadow(0 10px 10px rgba(0,0,0,0.45)) drop-shadow(0 22px 26px rgba(0,0,0,0.55))",
              }}
            />
            {/* contact shadow — the point where the book meets the plank */}
            <div className="mx-auto -mt-[3px] h-2.5 w-[72%] rounded-[100%] bg-black/70 blur-[6px] opacity-55 transition-all duration-300 ease-out group-hover:blur-[11px] group-hover:opacity-70 group-hover:w-[60%]" />
          </div>
        ) : (
          /* ── Legacy opaque cover — faux 3D hardcover card ── */
          <div className={onShelf ? "relative h-full" : "relative"}>
            {/* page-block edge — gives the cover physical thickness */}
            <div
              className="absolute top-[3px] -right-[3px] bottom-[6%] w-[4px] rounded-r-[2px] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #f3ead2 0px, #f3ead2 2px, #e2d3ab 2px, #e2d3ab 3px)",
                boxShadow: "inset -1px 0 1px rgba(0,0,0,0.25)",
              }}
            />

            {/* cover */}
            <div
              className={
                (onShelf
                  ? "relative h-full aspect-[2/3] "
                  : "relative w-28 aspect-[2/3] ") +
                "overflow-hidden rounded-[3px] ring-1 ring-black/40 shadow-[0_1px_1px_rgba(0,0,0,0.4),0_14px_18px_-8px_rgba(0,0,0,0.6),0_28px_34px_-14px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_1px_1px_rgba(0,0,0,0.4),0_20px_26px_-8px_rgba(0,0,0,0.65),0_38px_48px_-14px_rgba(0,0,0,0.8)]"
              }
            >
              {book.cover_image ? (
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes={onShelf ? "160px" : "112px"}
                  loading="lazy"
                />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://placehold.co/150x220"
                    alt="Placeholder Image"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </>
              )}
              {/* spine shadow — soft crease near the binding */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black/45 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/30" />
              {/* ambient warm wash to match the shelf lighting */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-100/10 via-transparent to-black/25" />
            </div>

            {/* contact shadow — grounds the book on the shelf */}
            <div className="mx-auto -mt-[2px] h-2.5 w-[80%] rounded-[100%] bg-black/60 blur-[6px] opacity-55 transition-all duration-300 ease-out group-hover:blur-[10px] group-hover:opacity-70 group-hover:w-[68%]" />
          </div>
        )}

        {!onShelf && (
          <>
            <p className="mt-3 text-xs font-semibold text-white/90 line-clamp-1 group-hover:text-amber-300 transition-colors">
              {book.title}
            </p>
            {book.author && (
              <p className="text-[10px] text-amber-100/50 line-clamp-1">{book.author.name}</p>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

/**
 * Per-book calibration for the rare mockup that reads too wide / too tall / off the
 * baseline. Keyed by slug — every field is optional and applied ONLY to the outlier
 * named here; the default slot already grounds the majority, so keep this near-empty.
 *   scale — multiplies the target height (e.g. 0.95 tames a chunky book)
 *   dx    — horizontal nudge in px (visual re-centering)
 *   dy    — vertical nudge in px, positive lifts the book off the plank
 */
const SHELF_CALIBRATION: Record<string, { scale?: number; dx?: number; dy?: number }> = {
  // "the-book-of-endless-doors": { scale: 0.95 },
};

/**
 * TOP-ROW ONLY — per-book visible-baseline calibration.
 *
 * The 8 top-row PNGs render into pixel-identical image BOXES (same CSS height, same
 * box bottom, all bottom-aligned to the plank). But each asset bakes a DIFFERENT amount
 * of transparent space below the printed book, so their VISIBLE bottom edges float by
 * different amounts and no longer share one shelf line. Measured from the real alpha
 * bounds of each asset (solid-body edge, alpha>128), the bottom transparent padding runs
 * from ~0.7% to ~1.9% of the image height — a ~1.9px spread at the ~1232px desktop scale
 * that grows proportionally on wider displays (the subtle floating the eye picks up).
 *
 *   y — vertical correction as a PERCENT OF THE BOOK'S OWN RENDERED HEIGHT.
 *       Positive nudges the book DOWN toward the plank; negative lifts it. Values are the
 *       signed distance of each asset's visible bottom from the row MEAN, so applying them
 *       lands every visible book bottom on ONE shared baseline WITHOUT shifting the row's
 *       overall (frozen) vertical position. Applied via `top` (a proportional offset that
 *       scales with the shelf at 1440/1280/1024 and never fights the hover transform).
 *
 * Regenerate if a top-row asset is swapped: measure each PNG's alpha bottom padding
 * (padBot/H), take floatPx = padBot/H, and set y = (floatPx − mean(floatPx)) as a % of H.
 */
const TOP_ROW_CALIBRATION: Record<string, { y: number }> = {
  "peace-in-abandonment": { y: 0.73 },
  "when-trust-disappears": { y: 0.0 },
  "the-book-of-endless-doors": { y: -0.16 },
  "the-silent-turning": { y: 0.34 },
  "walk-with-valluvar": { y: -0.27 },
  "the-trust-architect": { y: 0.09 },
  "agarkas-the-future-king-of-satan": { y: -0.49 },
  "jade-julep": { y: -0.25 },
};

/**
 * Desktop shelf geometry — all values are % of the 1458×592 cabinet so they hold at any
 * rendered width. Tuned to the artwork itself: the lit plank surfaces (upper ~46–50%,
 * floor ~86–92% from the top) and the two baked-in plants (left 1.4–6.4%, right
 * 93.1–98.1% of the width) that the lower row must stay clear of.
 *   baseline    — the row's `bottom`; books rest here (nudged onto the plank lip)
 *   compartment — the row's `height` (usable vertical space between planks)
 *   bookH       — book height as a % of the compartment (shared perceived scale)
 *   padX        — horizontal inset; the bottom row is inset further to give plants air
 *   gap         — space between adjacent books (% of width), shared so both rows share
 *                 one spacing rhythm even though the bottom row sits narrower
 */
const SHELF = {
  // groundPx — TOP ROW ONLY. A fixed transparent "grounding zone" (px at the ~1440px
  // desktop scale) reserved BELOW each book's visible artwork. The book image is lifted
  // this many px off the wrapper bottom (the wrapper still aligns to the shelf), and the
  // contact shadow rides up with it, so every top-row book's visible bottom rests just
  // ABOVE the middle-plank lip instead of cutting into it — it reads as standing ON the
  // shelf, not overlapping the wood. Per-PNG outliers get a tiny nudge via SHELF_CALIBRATION.dy.
  top: { baseline: 57.2, compartment: 39, bookH: 78, padX: 4.5, groundPx: 13, gap: 2.6 },
  bottom: { baseline: 13.6, compartment: 37, bookH: 91, padX: 8, gap: 2.6 },
  gap: 1.6,
  // Middle-plank front lip, as % from the TOP of the cabinet. A foreground copy of the
  // shelf (masked to just this band) is painted over the top-row books so their bottom
  // edge tucks behind the real wood — the depth cue that makes them read as "seated".
  // Soft-edged so the tuck fades naturally instead of cutting a hard line. Positioned at
  // the plank nose so books rest at the true shelf surface (also lifts them up the cavity).
  lip: { fadeTop: 45.5, solidTop: 46.5, solidBot: 50.5, fadeBot: 52 },
} as const;

/**
 * One book on the DESKTOP shelf. Books take their natural width (so the row reads as a
 * curated cluster rather than stretched-out slots) and are bottom-aligned to a shared
 * HEIGHT target, so every visible book bottom meets the same shelf baseline. A tight
 * two-layer contact shadow grounds each book on the plank. Mobile keeps its own
 * <BookCover>, untouched.
 */
function DesktopShelfBook({
  item,
  heightPct,
  tightShadow = false,
}: {
  item: Item;
  heightPct: number;
  /** Top row only: seated onto the shelf lip, so its contact shadow is a touch tighter.
   *  Default (false) is the approved/frozen bottom-row shadow — do not change it. */
  tightShadow?: boolean;
}) {
  if (isPlaceholder(item)) {
    return (
      <div className="relative flex h-full shrink-0 items-end justify-center">
        <div
          className="animate-pulse rounded-[2px] bg-white/10"
          style={{ height: `${heightPct}%`, aspectRatio: "0.6" }}
        />
      </div>
    );
  }

  const book = item;
  const cal = SHELF_CALIBRATION[book.slug] ?? {};
  const h = heightPct * (cal.scale ?? 1);
  const isTransparent = !!book.cover_image && /\.png(\?|$)/i.test(book.cover_image);

  // Top-row visible-baseline correction (see TOP_ROW_CALIBRATION). `y` is a % of the
  // book's own rendered height; the img's containing block is the compartment, so convert
  // to a % of the compartment (× h/100) and apply it through `top`. `top` shifts the book
  // visually without reserving layout space and never fights the hover `transform`, and —
  // being a percentage — it scales with the shelf at every breakpoint (1440/1280/1024).
  const calTopPct = tightShadow ? (TOP_ROW_CALIBRATION[book.slug]?.y ?? 0) * (h / 100) : 0;

  return (
    <Link
      href={`/books/${book.slug}`}
      title={book.title}
      className="group relative flex h-full shrink-0 items-end justify-center"
    >
      {/* hover placard */}
      <div className="pointer-events-none absolute -top-1 left-1/2 z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur transition-all duration-200 group-hover:-translate-y-[calc(100%+4px)] group-hover:opacity-100">
        {book.title}
        {book.author && <span className="text-amber-200/80"> · {book.author.name}</span>}
      </div>

      {/* contact shadow — two layers: a soft ambient pool + a tight dark core right at
          the book's base, so it reads as physically resting on the plank, not hovering.
          Top row is `tightShadow`: narrower/crisper AND raised to z-20 so it sits IN FRONT
          of the shelf-lip overlay (z-15), keeping the contact line visible where the book
          tucks behind the wood. The default set below is the frozen bottom-row shadow (z-0). */}
      <div
        className={
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[100%] bg-black/45 transition-all duration-300 ease-out " +
          (tightShadow
            // top row: anchored just under the unified visible baseline + kept subtle so a
            // book reads as touching the plank, not casting a heavy oval that lifts it.
            ? "bottom-[1.4%] z-20 h-[8px] w-[44%] opacity-55 blur-[6px] group-hover:w-[52%] group-hover:opacity-40 group-hover:blur-[10px]"
            : "bottom-[1%] z-0 h-[9px] w-[52%] opacity-70 blur-[7px] group-hover:w-[58%] group-hover:opacity-50 group-hover:blur-[11px]")
        }
      />
      <div
        className={
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[100%] bg-black/70 transition-all duration-300 ease-out group-hover:opacity-45 " +
          (tightShadow
            ? "bottom-[1.9%] z-20 h-[3.5px] w-[32%] opacity-55 blur-[2px] group-hover:blur-[3.5px]"
            : "bottom-[1.5%] z-0 h-[4px] w-[40%] opacity-75 blur-[2.5px] group-hover:blur-[4px]")
        }
      />

      {isTransparent ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={book.cover_image!}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="relative z-10 w-auto max-w-[92%] object-contain object-bottom transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
          style={{
            height: `${h}%`,
            top: calTopPct ? `${calTopPct}%` : undefined,
            marginLeft: cal.dx ? `${cal.dx}px` : undefined,
            marginBottom: cal.dy ? `${cal.dy}px` : undefined,
            // depth only — grounding comes from the contact shadow, so keep this soft
            filter:
              "drop-shadow(0 2px 3px rgba(0,0,0,0.35)) drop-shadow(0 11px 13px rgba(0,0,0,0.4))",
          }}
        />
      ) : (
        /* legacy opaque cover — kept grounded should a non-PNG ever slip through */
        <div
          className="relative z-10 overflow-hidden rounded-[3px] object-bottom shadow-[0_2px_3px_rgba(0,0,0,0.4),0_14px_18px_-8px_rgba(0,0,0,0.6)] ring-1 ring-black/40 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
          style={{ height: `${h}%`, aspectRatio: "2 / 3", marginBottom: cal.dy ? `${cal.dy}px` : undefined }}
        >
          {book.cover_image ? (
            <Image src={book.cover_image} alt={book.title} fill className="object-cover" sizes="160px" loading="lazy" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="https://placehold.co/150x220" alt="Placeholder" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-100/10 via-transparent to-black/25" />
        </div>
      )}
    </Link>
  );
}

export default function BooksCarousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Mobile showcase state (curated 2×2 mini-shelf, autoplaying pages) ──
  const [activeIndex, setActiveIndex] = useState(0);
  const [shelfInView, setShelfInView] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);   // live page index for the autoplay timer
  const dirRef = useRef(1);      // autoplay direction (ping-pongs at the ends)
  const pausedRef = useRef(false); // true while a finger is on the slider
  const inViewRef = useRef(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase
      .from("books")
      .select("id, title, slug, cover_image, author:authors(name)")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(16)
      .then(({ data, error }) => {
        if (error) console.error("[BooksCarousel] Supabase error:", error);
        setBooks((data as unknown as Book[]) ?? []);
        setLoading(false);
      });
  }, []);

  const displayItems: Item[] =
    loading || books.length === 0
      ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ id: String(i), placeholder: true as const }))
      : books;

  const topRow = displayItems.slice(0, 8);
  const bottomRow = displayItems.slice(8, 16);

  // Mobile: group the already-fetched books into slides of four (2 per shelf).
  const pages: Item[][] = [];
  for (let i = 0; i < displayItems.length; i += 4) {
    pages.push(displayItems.slice(i, i + 4));
  }
  const pageCount = pages.length;

  // Reveal the mini-shelf once it scrolls into view (also gates autoplay).
  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setShelfInView(true);
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay — advance one slide every 5.5s, ping-ponging so it never jumps far.
  // Paused while touched or off-screen, and disabled under reduced-motion.
  useEffect(() => {
    if (pageCount <= 1) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || !inViewRef.current) return;
      let next = activeRef.current + dirRef.current;
      if (next >= pageCount) { dirRef.current = -1; next = activeRef.current - 1; }
      else if (next < 0) { dirRef.current = 1; next = activeRef.current + 1; }
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5500);
    return () => clearInterval(id);
  }, [pageCount]);

  // Keep the page indicator synced to the swipe position.
  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.max(0, Math.min(pageCount - 1, Math.round(el.scrollLeft / el.clientWidth)));
    activeRef.current = idx;
    setActiveIndex(idx);
  };

  const goToPage = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const pauseAutoplay = () => { pausedRef.current = true; };
  const resumeAutoplay = () => { pausedRef.current = false; };

  return (
    <div>
      {/* ── Desktop / tablet — fixed two-tier shelf, books sit on the real shelf photo ── */}
      <div
        className="relative hidden w-full overflow-hidden rounded-2xl shadow-2xl sm:block"
        style={{ aspectRatio: SHELF_ASPECT }}
      >
        <Image
          src={SHELF_IMAGE}
          alt="Premium wooden bookshelf displaying Ritera's published books"
          fill
          className="object-contain"
          sizes="(min-width: 1280px) 1152px, 90vw"
        />

        {/* top shelf — books rest on the lit upper plank with a steady headroom above;
            natural widths + a shared gap read as a full, curated cluster */}
        <div
          className="absolute inset-x-0 flex items-end justify-center"
          style={{
            bottom: `${SHELF.top.baseline}%`,
            height: `${SHELF.top.compartment}%`,
            paddingLeft: `${SHELF.top.padX}%`,
            paddingRight: `${SHELF.top.padX}%`,
            columnGap: `${SHELF.top.gap}%`,
          }}
        >
          {topRow.map((item) => (
            <DesktopShelfBook key={item.id} item={item} heightPct={SHELF.top.bookH} tightShadow />
          ))}
        </div>

        {/* shelf-lip overlay — the SAME cabinet artwork, aligned 1:1, masked to reveal only
            the middle-plank front lip and painted above the top-row books (z-15). Where a
            book dips into this band its bottom edge is occluded by the real wood, so the eye
            reads the plank as passing in front of the book. Identical pixels to the layer
            behind ⇒ seamless (no rectangle, no lighting mismatch). Affects the top row only;
            the band sits well above the bottom row and the plants. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            backgroundImage: `url("${SHELF_IMAGE}")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${SHELF.lip.fadeTop}%, #000 ${SHELF.lip.solidTop}%, #000 ${SHELF.lip.solidBot}%, transparent ${SHELF.lip.fadeBot}%)`,
            maskImage: `linear-gradient(to bottom, transparent ${SHELF.lip.fadeTop}%, #000 ${SHELF.lip.solidTop}%, #000 ${SHELF.lip.solidBot}%, transparent ${SHELF.lip.fadeBot}%)`,
          }}
        />

        {/* bottom shelf — same spacing rhythm as the top, but inset further so the two
            baked-in plants keep a clear safe zone at either end */}
        <div
          className="absolute inset-x-0 flex items-end justify-center"
          style={{
            bottom: `${SHELF.bottom.baseline}%`,
            height: `${SHELF.bottom.compartment}%`,
            paddingLeft: `${SHELF.bottom.padX}%`,
            paddingRight: `${SHELF.bottom.padX}%`,
            columnGap: `${SHELF.bottom.gap}%`,
          }}
        >
          {bottomRow.map((item) => (
            <DesktopShelfBook key={item.id} item={item} heightPct={SHELF.bottom.bookH} />
          ))}
        </div>
      </div>

      {/* ── Mobile — curated 2×2 mini-shelf, four books per slide, autoplaying ── */}
      <div className="sm:hidden" ref={shelfRef}>
        <div className="relative h-[440px] overflow-hidden rounded-2xl shadow-2xl">
          {/* Real bookshelf photo — both planks visible, books rest on them */}
          <Image
            src={SHELF_IMAGE}
            alt="Premium wooden bookshelf displaying Ritera's published books"
            fill
            priority={false}
            className="object-cover"
            style={{ objectPosition: "50% 50%" }}
            sizes="100vw"
          />
          {/* gentle vignette for depth + warm top light, matching the shelf */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 96% 88% at 50% 45%, transparent 58%, rgba(0,0,0,0.4) 100%)",
            }}
          />

          {/* Swipe track — each slide holds four books over the fixed shelf */}
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            onPointerDown={pauseAutoplay}
            onPointerUp={resumeAutoplay}
            onPointerCancel={resumeAutoplay}
            onTouchStart={pauseAutoplay}
            onTouchEnd={resumeAutoplay}
            className="no-scrollbar absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
          >
            {pages.map((group, p) => (
              <div key={p} className="relative h-full w-full shrink-0 snap-center">
                {/* top shelf — two books resting on the upper plank */}
                <div
                  className="absolute inset-x-0 flex items-end justify-evenly px-[9%]"
                  style={{ bottom: "57%", height: "31%" }}
                >
                  {group.slice(0, 2).map((item, i) => (
                    <div
                      key={item.id}
                      className={`h-full ${shelfInView ? "animate-book-rise" : "opacity-0"}`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <BookCover item={item} onShelf />
                    </div>
                  ))}
                </div>

                {/* bottom shelf — two books resting on the lower plank */}
                <div
                  className="absolute inset-x-0 flex items-end justify-evenly px-[9%]"
                  style={{ bottom: "15%", height: "31%" }}
                >
                  {group.slice(2, 4).map((item, i) => (
                    <div
                      key={item.id}
                      className={`h-full ${shelfInView ? "animate-book-rise" : "opacity-0"}`}
                      style={{ animationDelay: `${(i + 2) * 80}ms` }}
                    >
                      <BookCover item={item} onShelf />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page indicator + swipe hint */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show books ${i * 4 + 1}–${i * 4 + 4}`}
                onClick={() => goToPage(i)}
                className={`rounded-full transition-all duration-300 ease-out ${
                  i === activeIndex
                    ? "h-2.5 w-2.5 bg-amber-500"
                    : "h-2 w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">Swipe to explore our published books</p>
        </div>
      </div>
    </div>
  );
}
