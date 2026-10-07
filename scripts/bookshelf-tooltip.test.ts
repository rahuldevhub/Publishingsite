import { test } from "node:test";
import assert from "node:assert/strict";
import { positionShelfTooltip } from "../lib/bookshelf-tooltip";

const viewport = { width: 1440, height: 917 };
const card = { width: 224, height: 80 };

test("places the preview above a book with a gap for its hover lift", () => {
  const result = positionShelfTooltip({ left: 300, right: 380, top: 340, bottom: 480 }, card, viewport, []);
  assert.deepEqual(result, { left: 228, top: 240 });
});

test("uses below instead of covering books on the upper shelf", () => {
  const result = positionShelfTooltip({ left: 300, right: 380, top: 520, bottom: 660 }, card, viewport,
    [{ left: 300, right: 380, top: 320, bottom: 460 }]);
  assert.deepEqual(result, { left: 228, top: 680 });
});

test("clamps both edge books within every requested viewport", () => {
  for (const width of [1440, 1280, 1024, 768, 390]) {
    for (const left of [0, width - 60]) {
      const result = positionShelfTooltip({ left, right: left + 60, top: 340, bottom: 480 }, card,
        { width, height: 917 }, []);
      assert.ok(result);
      assert.ok(result.left >= 16);
      assert.ok(result.left + card.width <= width - 16);
    }
  }
});

test("avoids the collection CTA when the upper row blocks an above-card", () => {
  const result = positionShelfTooltip({ left: 670, right: 750, top: 520, bottom: 660 }, card, viewport,
    [{ left: 650, right: 760, top: 300, bottom: 460 }, { left: 600, right: 840, top: 710, bottom: 760 }]);
  assert.ok(result);
  assert.ok(result.left + card.width <= 594 || result.left >= 846 || result.top + card.height <= 704);
});
