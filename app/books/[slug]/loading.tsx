export default function BookDetailLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ width: 280, height: 400, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ height: 36, width: "80%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 16 }} />
          <div style={{ height: 20, width: "50%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 32 }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ height: 14, width: `${85 - i * 8}%`, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 10 }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
