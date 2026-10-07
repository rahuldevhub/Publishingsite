import { COMPANY_FACTS } from "./company-facts";
export const SITE_STATS = {
  countries: COMPANY_FACTS.countries,
  storesWorldwide: COMPANY_FACTS.stores,
  happyAuthors: COMPANY_FACTS.publicClaimsPendingVerification.happyAuthors,
} as const;
export const ROYALTIES = COMPANY_FACTS.royalties;
export const STARTING_PRICE_INR = COMPANY_FACTS.startingPrice.inr;
export const STARTING_PRICE_USD = COMPANY_FACTS.startingPrice.usd;
