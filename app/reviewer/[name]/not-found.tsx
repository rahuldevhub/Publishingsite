export default function ReviewerNotFound() {
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
