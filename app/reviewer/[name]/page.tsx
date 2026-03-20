import { notFound } from "next/navigation";

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
          This is a private page created for a specific person. If you believe you should have access, please check your link.
        </p>
      </div>
    );
  }

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  const gold = "#b8860b";
  const bg = "#fdf8f3";

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "64px 24px 96px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <p style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: "16px" }}>
          A note, just for you
        </p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 52px)", fontWeight: "bold", color: "#1a1a1a", lineHeight: 1.15, marginBottom: "16px" }}>
          Welcome, {displayName} ✨
        </h1>
        <p style={{ fontSize: "18px", color: "#666", fontStyle: "italic", marginBottom: "56px", lineHeight: 1.6 }}>
          If you are here, this page was meant only for you.
        </p>

        {/* Divider */}
        <div style={{ width: "48px", height: "2px", background: gold, marginBottom: "48px" }} />

        {/* Para 1 */}
        <p style={{ fontSize: "17px", color: "#3a3a3a", lineHeight: 1.85, marginBottom: "56px" }}>
          Some readers read books. Some live them. And a rare few, like you, help stories travel beyond pages, beyond shelves, and into hearts. Your presence in the literary world is not just noticed — it is felt. Every post, every reflection, every quiet moment you spend with a book becomes a bridge, connecting stories to new readers, new conversations, and new life. Today, we simply wanted to pause and say:{" "}
          <span style={{ color: gold, fontWeight: "bold" }}>thank you.</span>
        </p>

        {/* Section: Your place */}
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "16px", letterSpacing: "-0.01em" }}>
          Your place in our story
        </h2>
        <p style={{ fontSize: "16px", color: "#3a3a3a", lineHeight: 1.85, marginBottom: "56px" }}>
          You are now a cherished part of our extended literary circle — a space built not just on books, but on shared passion, trust, and the magic of storytelling.
        </p>

        {/* Section: Gift cards */}
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "24px", letterSpacing: "-0.01em" }}>
          For our favourite reviewer
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { icon: "📖", text: "Early glimpses into upcoming stories" },
            { icon: "🎁", text: "Quiet surprises meant only for you" },
            { icon: "✉️", text: "Invitations to special literary moments" },
            { icon: "🌿", text: "A closer connection with our publishing journey" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                background: "#fff",
                border: "1px solid #ecdfc8",
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                boxShadow: "0 2px 12px rgba(184,134,11,0.07)",
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1 }}>{icon}</span>
              <p style={{ margin: 0, fontSize: "15px", color: "#3a3a3a", lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Para 3 */}
        <p style={{ fontSize: "16px", color: "#666", fontStyle: "italic", lineHeight: 1.8, marginBottom: "56px" }}>
          Because stories grow stronger when they travel through voices like yours.
        </p>

        {/* Divider */}
        <div style={{ width: "48px", height: "2px", background: gold, marginBottom: "48px" }} />

        {/* Section: Let the story continue */}
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "16px", letterSpacing: "-0.01em" }}>
          Let the story continue…
        </h2>
        <p style={{ fontSize: "16px", color: "#3a3a3a", lineHeight: 1.85, marginBottom: "56px" }}>
          If this little surprise brought a smile, a thought, or a feeling — let it live beyond this moment. Stories are, after all, meant to be shared, seen, and felt in the world around us. However you choose to carry this story forward, know that you are always part of ours.
        </p>

        {/* Signature */}
        <div style={{ borderTop: "1px solid #ecdfc8", paddingTop: "32px" }}>
          <p style={{ fontSize: "15px", color: gold, fontStyle: "italic", margin: 0 }}>
            with warmth, gratitude, and ink — Ritera Publishing
          </p>
        </div>

      </div>
    </div>
  );
}
