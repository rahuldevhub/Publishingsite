import { SITE_URL } from "./site";
import { BASE_PRICES, PRICES } from "./pricing";

/** Approved positioning already visible on the production homepage/packages.
 * Reach describes distribution options, not guaranteed stock or sales.
 * Historical book/author totals and delivery promises require owner verification.
 */
export const COMPANY_FACTS = {
  name: "Ritera Publishing",
  url: SITE_URL,
  location: "Tamil Nadu, India",
  description: "Ritera Publishing is an India-based self-publishing service in Tamil Nadu, providing editing, cover design, print and eBook production, ISBN support, distribution, and author marketing support.",
  royaltyPercentage: 100,
  royalties: "100%",
  royaltyStatement: "Authors retain 100% of the royalties paid to them. Retailer, distribution, printing, and applicable tax deductions depend on the platform and publishing agreement.",
  copyrightPolicy: "Authors retain copyright in their work. Specific services and rights are defined in the publishing agreement.",
  countries: { num: 160, display: "160+", label: "Countries" },
  stores: { num: 40000, display: "40,000+", label: "Stores Worldwide" },
  distributionDescription: "International distribution options reach 160+ countries and 40,000+ stores. Availability depends on the selected package, format, retailer, and territory; distribution does not guarantee sales or physical shelf placement.",
  publishingTimeline: "Publishing timelines are agreed for each manuscript and depend on editing, author approvals, production, and retailer processing.",
  startingPrice: { amount: BASE_PRICES.essential, inr: PRICES.essential.inr, usd: PRICES.essential.usd },
  email: "contact@riterapublishing.com",
  telephone: "+919488854787",
  telephoneDisplay: "+91-94888-54787",
  whatsapp: "https://wa.me/919488854787",
  socialProfiles: {
    instagram: "https://www.instagram.com/ritera_publishing",
    linkedin: "https://www.linkedin.com/company/ritera-publishing",
    youtube: "https://www.youtube.com/@RiteraPublishing",
    medium: "https://medium.com/@riterapublishing",
  },
  // Existing public positioning, retained pending evidence from the content owner.
  publicClaimsPendingVerification: {
    happyAuthors: { num: 500, display: "500+", label: "Happy Authors" },
    rating: "4.9/5",
    googleReviews: "120+",
    supportAvailability: "24/7",
  },
} as const;

export const ISBN_GUIDANCE = "An ISBN identifies a particular book edition and format for commercial cataloguing and distribution. Requirements depend on the format and platform: Kindle eBooks do not require an ISBN, while KDP generally requires one for paperback and hardcover books, with exceptions such as low-content books. An ISBN does not provide copyright protection. Ritera packages include ISBN registration support.";
