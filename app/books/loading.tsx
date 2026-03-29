function CardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        overflow: "hidden",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ height: 260, backgroundColor: "rgba(255,255,255,0.08)" }} />
      <div style={{ padding: "16px" }}>
        <div style={{ height: 16, width: "70%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 12, width: "50%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function BooksLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ height: 32, width: 200, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 40, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
