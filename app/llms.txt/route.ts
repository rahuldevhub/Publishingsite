import { COMPANY_FACTS } from "@/lib/company-facts";
import { PRICES } from "@/lib/pricing";
import { HOMEPAGE_PILLARS } from "@/lib/internal-links";

export function GET() {
  const facts = COMPANY_FACTS;
  const body = `# ${facts.name}
> India-based self-publishing services

${facts.description}

## Ownership and royalties
${facts.copyrightPolicy}
${facts.royaltyStatement}

## Distribution
${facts.distributionDescription}

## Publishing process
Manuscript review, package selection, editing and design, author approvals, production, and distribution.
${facts.publishingTimeline}

## Packages and pricing
- Essential (First-Time Author): ${PRICES.essential.inr} in India; ${PRICES.essential.usd} internationally
- Advanced (Global Author): ${PRICES.advanced.inr} in India; ${PRICES.advanced.usd} internationally
- Premium (Marketing Focused): ${PRICES.premium.inr} in India; ${PRICES.premium.usd} internationally
Compare the full package scope at ${facts.url}/packages. Distribution and marketing services depend on the selected plan.

## Company and contact
- Location: ${facts.location}
- Website: ${facts.url}
- Email: ${facts.email}
- Phone: ${facts.telephoneDisplay}

## Verified site profile links
${Object.values(facts.socialProfiles).map((url) => `- ${url}`).join("\n")}

## Public resources
- About: ${facts.url}/aboutus
- Publishing team: ${facts.url}/people-behind-ritera
- Books and authors: ${facts.url}/books
- Case studies: ${facts.url}/case-studies
- Contact: ${facts.url}/contact
- LitSpace community: ${facts.url}/litspace
${HOMEPAGE_PILLARS.map((guide) => `- ${guide.title}: ${facts.url}/blog/${guide.slug}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
