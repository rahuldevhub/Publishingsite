import assert from "node:assert/strict";
import { test } from "node:test";
import { BASE_PRICES, PRICES, currencyForCountry, internationalPrice, packageAmount, localizePricingText, type PackageKey } from "../lib/pricing";

test("international package prices include markup and round upwards to a price ending in 9", () => {
  const expected = [169, 259, 449, 749, 1159, 1629];
  (Object.keys(BASE_PRICES) as PackageKey[]).forEach((key, i) => {
    assert.equal(packageAmount(key, "INR"), BASE_PRICES[key]);
    assert.equal(packageAmount(key, "USD"), expected[i]);
    assert.ok(expected[i] >= BASE_PRICES[key] * 1.3 / 96);
    assert.ok(expected[i] - BASE_PRICES[key] * 1.3 / 96 < 10);
  });
  assert.equal(PRICES.exclusive.inr, "₹1,19,999");
  assert.equal(PRICES.premium.usd, "$1,159");
  assert.equal(internationalPrice(12000), 169);
});

test("India keeps INR, other countries get USD, unknown country falls back safely", () => {
  assert.equal(currencyForCountry("IN"), "INR");
  for (const code of ["US", "GB", "AE", "CA"]) assert.equal(currencyForCountry(code), "USD");
  for (const code of [undefined, null, "", "XX", "T1", "invalid"]) assert.equal(currencyForCountry(code), null);
});

test("FAQ and structured-data pricing match the package catalog", () => {
  const text = "From ₹11,999 (approx. $149 USD), global ₹32,999, marketing ₹84,999";
  assert.equal(localizePricingText(text, "USD"), "From $169, global $449, marketing $1,159");
  assert.equal(localizePricingText(text, "INR"), "From ₹11,999, global ₹32,999, marketing ₹84,999");
});
