export type Currency = "INR" | "USD";

// Fixed commercial exchange rate, based on the requested pricing example.
// Update here when international package prices need to be reviewed.
export const INR_PER_USD = 96;
export const INTERNATIONAL_MARKUP = 1.3;
export const BASE_PRICES = {
  essential: 11999,
  standard: 18999,
  advanced: 32999,
  elite: 54999,
  premium: 84999,
  exclusive: 119999,
} as const;
export type PackageKey = keyof typeof BASE_PRICES;

export function internationalPrice(inr: number) {
  const converted = (inr * INTERNATIONAL_MARKUP) / INR_PER_USD;
  // Smallest whole-dollar price ending in 9 that covers the converted amount.
  return Math.ceil((converted - 9) / 10) * 10 + 9;
}

export function packageAmount(key: PackageKey, currency: Currency) {
  return currency === "INR" ? BASE_PRICES[key] : internationalPrice(BASE_PRICES[key]);
}

export function formatPackagePrice(key: PackageKey, currency: Currency) {
  const amount = packageAmount(key, currency);
  return currency === "INR"
    ? `₹${amount.toLocaleString("en-IN")}`
    : `$${amount.toLocaleString("en-US")}`;
}

export const PRICES = Object.fromEntries(
  (Object.keys(BASE_PRICES) as PackageKey[]).map(key => [key, {
    inr: formatPackagePrice(key, "INR"), usd: formatPackagePrice(key, "USD"),
  }]),
) as Record<PackageKey, { inr: string; usd: string }>;

export function currencyForCountry(country: unknown): Currency | null {
  if (typeof country !== "string" || !/^[A-Z]{2}$/.test(country) || ["XX", "T1"].includes(country)) return null;
  return country === "IN" ? "INR" : "USD";
}

export function localizePricingText(text: string, currency: Currency) {
  let result = text.replace(" (approx. $149 USD)", "");
  for (const key of Object.keys(BASE_PRICES) as PackageKey[]) {
    result = result.replaceAll(PRICES[key].inr, formatPackagePrice(key, currency));
  }
  return result;
}
