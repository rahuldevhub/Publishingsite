export default function CareerDetailLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ height: 36, width: "70%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 12 }} />
        <div style={{ height: 16, width: "40%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 40 }} />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ height: 14, width: `${88 - (i % 5) * 7}%`, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 10 }} />
        ))}
        <div style={{ height: 48, width: 160, backgroundColor: "rgba(245,166,35,0.2)", borderRadius: 8, marginTop: 32 }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
