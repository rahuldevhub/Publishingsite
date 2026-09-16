"use client";
import { useEffect, useState, type ReactNode } from "react";
import { CurrencyContext } from "@/hooks/useCurrency";
import { currencyForCountry, type Currency } from "@/lib/pricing";

export default function CurrencyProvider({ initialCurrency, children }: { initialCurrency: Currency | null; children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(initialCurrency ?? "INR");
  const [loading, setLoading] = useState(initialCurrency === null);
  useEffect(() => {
    if (initialCurrency) return;
    // Fallback for localhost and hosts without Vercel geolocation headers.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Country lookup failed");
        return response.json();
      })
      .then(data => setCurrency(currencyForCountry(data.country_code) ?? "INR"))
      .catch(() => setCurrency("INR"))
      .finally(() => { clearTimeout(timeout); setLoading(false); });
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [initialCurrency]);
  return <CurrencyContext.Provider value={{ currency: initialCurrency ?? currency, loading: initialCurrency ? false : loading }}>{children}</CurrencyContext.Provider>;
}
