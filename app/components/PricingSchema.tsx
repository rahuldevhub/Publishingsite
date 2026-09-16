"use client";
import { useCurrency } from "@/hooks/useCurrency";
import { localizePricingText, packageAmount } from "@/lib/pricing";

export default function PricingSchema({ schema }: { schema: Record<string, unknown> }) {
  const { currency } = useCurrency();
  const localized = { ...schema };
  if (schema.offers) {
    localized.offers = { ...(schema.offers as Record<string, unknown>), priceCurrency: currency, price: String(packageAmount("essential", currency)) };
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localizePricingText(JSON.stringify(localized), currency).replace(/</g, "\\u003c") }} />;
}
