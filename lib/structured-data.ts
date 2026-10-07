import { COMPANY_FACTS } from "./company-facts";
import { SITE_URL } from "./site";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const organizationReference = { "@id": `${SITE_URL}/#organization` };

export function organizationSchema() {
  return {
    "@context": "https://schema.org", "@type": "Organization",
    ...organizationReference,
    name: COMPANY_FACTS.name, url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    description: COMPANY_FACTS.description,
    telephone: COMPANY_FACTS.telephone, email: COMPANY_FACTS.email,
    address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", telephone: COMPANY_FACTS.telephone, email: COMPANY_FACTS.email },
    sameAs: Object.values(COMPANY_FACTS.socialProfiles),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org", "@type": "WebSite",
    "@id": `${SITE_URL}/#website`, name: COMPANY_FACTS.name,
    url: SITE_URL, description: COMPANY_FACTS.description,
    publisher: organizationReference,
  };
}

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, ...item,
    })),
  };
}

export function genuineTimestamp(value: string | null | undefined) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function articleSchema(article: {
  headline: string; description: string; url: string;
  image?: string | null; datePublished?: string | null; dateModified?: string | null;
  author?: { name: string; slug?: string | null } | null;
}) {
  // Editorial organization labels are not invented individual people.
  const isEditorial = !article.author || [COMPANY_FACTS.name, "Ritera Exclusive"].includes(article.author.name);
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": `${article.url}#article`,
    headline: article.headline, description: article.description,
    ...(article.image ? { image: new URL(article.image, SITE_URL).href } : {}),
    datePublished: genuineTimestamp(article.datePublished),
    dateModified: genuineTimestamp(article.dateModified),
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    author: isEditorial ? organizationReference : {
      "@type": "Person", name: article.author!.name,
      ...(article.author!.slug ? { url: `${SITE_URL}/authors/${article.author!.slug}` } : {}),
    },
    publisher: organizationReference,
  };
}
