export default function ReviewerLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ height: 32, width: "60%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 12 }} />
            <div style={{ height: 16, width: "40%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 14, width: "50%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ height: 14, width: `${85 - (i % 3) * 10}%`, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 10 }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
