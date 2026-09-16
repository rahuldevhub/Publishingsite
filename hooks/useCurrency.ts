"use client";
import { createContext, useContext } from "react";
import type { Currency } from "@/lib/pricing";

export const CurrencyContext = createContext<{ currency: Currency; loading: boolean }>({ currency: "INR", loading: false });
export function useCurrency() {
  return useContext(CurrencyContext);
}
