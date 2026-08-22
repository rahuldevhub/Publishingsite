import { notFound } from "next/navigation";
import ReviewerPageContent from "../components/ReviewerPageContent";
import WelcomePopup from "../components/WelcomePopup";
import { SITE_URL } from "@/lib/site";

const ALLOWED_SLUGS = [
  "shahithafareen",
  "priya",
  "diptisha",
  "gopika",
  "shree",
  "hema",
  "bookmist",
  "ananya",
  "khyati",
  "rahul",
];

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  if (!ALLOWED_SLUGS.includes(name)) return { robots: { index: false, follow: false } };
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `A note for ${displayName} — Ritera Publishing`,
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE_URL}/reviewer/${name}` },
  };
}

export default async function ReviewerPage({ params }: Props) {
  const { name } = await params;

  if (!ALLOWED_SLUGS.includes(name)) {
    notFound();
  }

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      {/* Welcome popup — client component, SSR-safe */}
      <WelcomePopup />
      {/* Full page content with animations — client component */}
      <main>
        <ReviewerPageContent displayName={displayName} />
      </main>
    </>
  );
}
