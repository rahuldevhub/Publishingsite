export type ShelfRect = { left: number; top: number; right: number; bottom: number };

/** Prefer above the cover, then below/beside it; never intersect another cover or CTA. */
export function positionShelfTooltip(
  book: ShelfRect,
  card: { width: number; height: number },
  viewport: { width: number; height: number },
  obstacles: ShelfRect[],
) {
  const inset = 16;
  const gap = 20; // Includes the book's 8px hover lift.
  const clampX = (x: number) => Math.max(inset, Math.min(x, viewport.width - card.width - inset));
  const center = clampX((book.left + book.right - card.width) / 2);
  const candidates = [
    { left: center, top: book.top - card.height - gap },
    { left: center, top: book.bottom + gap },
    { left: book.right + gap, top: book.top },
    { left: book.left - card.width - gap, top: book.top },
  ];
  // A card below a central book can sit alongside the collection CTA.
  for (const obstacle of obstacles) {
    candidates.push(
      { left: clampX(obstacle.left - card.width - 12), top: book.bottom + gap },
      { left: clampX(obstacle.right + 12), top: book.bottom + gap },
    );
  }
  const blocked = [book, ...obstacles];
  const fits = ({ left, top }: { left: number; top: number }) =>
    left >= inset && left + card.width <= viewport.width - inset &&
    top >= 100 && top + card.height <= viewport.height - inset &&
    !blocked.some(r => left < r.right + 6 && left + card.width > r.left - 6 &&
      top < r.bottom + 6 && top + card.height > r.top - 6);
  const position = candidates.find(fits);
  if (position) return position;
  // Crowded rows: find the closest clear space outside the covers and lighting bands.
  const alternatives = obstacles.flatMap(obstacle =>
    [obstacle.top - card.height - gap, obstacle.bottom + gap].flatMap(top =>
      [center, clampX(obstacle.left - card.width - 12), clampX(obstacle.right + 12)]
        .map(left => ({ left, top }))));
  alternatives.sort((a, b) =>
    Math.hypot(a.left - center, a.top + card.height / 2 - book.top) -
    Math.hypot(b.left - center, b.top + card.height / 2 - book.top));
  return alternatives.find(fits) ?? null;
}
