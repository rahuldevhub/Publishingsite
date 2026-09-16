import "server-only";
import { headers } from "next/headers";
import { currencyForCountry } from "./pricing";

export async function getVisitorCurrency() {
  const requestHeaders = await headers();
  // Vercel supplies this from the visitor IP, before server rendering.
  return currencyForCountry(requestHeaders.get("x-vercel-ip-country"));
}
