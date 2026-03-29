function PackageSkeleton() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 32, animation: "pulse 1.5s ease-in-out infinite" }}>
      <div style={{ height: 24, width: "50%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 12 }} />
      <div style={{ height: 36, width: "40%", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 24 }} />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ height: 13, width: "85%", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 8 }} />
      ))}
    </div>
  );
}

export default function PackagesLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ height: 36, width: 240, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 48, marginInline: "auto", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {Array.from({ length: 3 }).map((_, i) => <PackageSkeleton key={i} />)}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
