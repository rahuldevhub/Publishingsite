export default function AboutLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px", animation: "pulse 1.5s ease-in-out infinite" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ height: 40, width: 260, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 20, marginInline: "auto" }} />
        <div style={{ height: 300, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, marginBottom: 48 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ height: 16, width: `${80 - i * 5}%`, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 12 }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
