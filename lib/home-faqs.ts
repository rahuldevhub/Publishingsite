import { COMPANY_FACTS, ISBN_GUIDANCE } from "./company-facts";
import { PRICES } from "./pricing";

// Shared visible FAQ copy and JSON-LD: factual edits must update both together.
export const HOME_FAQS = [
  {
    question: "How can I publish my book in India as a first-time author?",
    answer: `Submit your manuscript for review, choose a publishing package, approve editing and design, and prepare your book for publication and distribution. Packages start at ${PRICES.essential.inr}. ${COMPANY_FACTS.publishingTimeline}`,
    href: "/packages", anchor: "Compare self-publishing packages",
  },
  {
    question: "What are the best self publishing services in India for new authors?",
    answer: "Compare manuscript editing, cover design, print and eBook formatting, ISBN support, distribution channels, ownership terms, and transparent pricing. Ritera Publishing provides publishing support tailored to the selected package and manuscript.",
    href: "/contact", anchor: "Arrange a publishing consultation",
  },
  {
    question: "How much does it cost to publish a book in India?",
    answer: `Ritera packages start at ${PRICES.essential.inr}. The homepage's First-Time Author, Global Author, and Marketing Focused options correspond to Essential, Advanced (${PRICES.advanced.inr}), and Premium (${PRICES.premium.inr}) in the package comparison. Compare included services, print copies, distribution, and marketing deliverables before choosing a plan.`,
    href: "/packages", anchor: "View package pricing and included services",
  },
  {
    question: "Do I need ISBN registration to publish my book in India?",
    answer: ISBN_GUIDANCE,
    href: "https://kdp.amazon.com/en_US/help/topic/G201834170", anchor: "Read KDP's ISBN requirements",
  },
  {
    question: "Can I publish my book in India and sell it worldwide?",
    answer: COMPANY_FACTS.distributionDescription,
    href: "/books", anchor: "Explore Ritera's published books",
  },
  {
    question: "Do I keep the rights to my book when I self-publish with Ritera?",
    answer: `${COMPANY_FACTS.copyrightPolicy} ${COMPANY_FACTS.royaltyStatement}`,
    href: "/packages", anchor: "Review Ritera's publishing options",
  },
] as const;
