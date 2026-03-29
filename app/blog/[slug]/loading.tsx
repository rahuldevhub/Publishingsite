export default function BlogPostLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ height: 44, width: "90%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 12 }} />
        <div style={{ height: 16, width: "35%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 14, width: "25%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 4, marginBottom: 40 }} />
        <div style={{ height: 360, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, marginBottom: 32 }} />
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ height: 14, width: `${90 - (i % 4) * 8}%`, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 10 }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
