import { notFound } from "next/navigation";
import ReviewerPageContent from "../components/ReviewerPageContent";
import WelcomePopup from "../components/WelcomePopup";

const ALLOWED_SLUGS = [
  "rahul",
  "priya",
  "saran",
  "meera",
  "arjun",
  "kavya",
  "deepa",
  "vikram",
  "ananya",
  "rohan",
];

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  if (!ALLOWED_SLUGS.includes(name)) return {};
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `A note for ${displayName} — Ritera Publishing`,
  };
}

export default async function ReviewerPage({ params }: Props) {
  const { name } = await params;

  if (!ALLOWED_SLUGS.includes(name)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdf8f3",
          fontFamily: "Georgia, serif",
          color: "#555",
          textAlign: "center",
          padding: "40px 24px",
        }}
      >
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "8px" }}>
          This page is not for you
        </h1>
        <p style={{ fontSize: "15px", color: "#888" }}>
          This is a private page created for a specific person. If you believe
          you should have access, please check your link.
        </p>
      </div>
    );
  }

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      {/* Welcome popup — client component, SSR-safe */}
      <WelcomePopup />
      {/* Full page content with animations — client component */}
      <ReviewerPageContent displayName={displayName} />
    </>
  );
}
