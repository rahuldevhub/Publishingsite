function JobSkeleton() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, animation: "pulse 1.5s ease-in-out infinite" }}>
      <div style={{ flex: 1 }}>
        <div style={{ height: 20, width: "55%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 10 }} />
        <div style={{ height: 13, width: "35%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
      </div>
      <div style={{ height: 36, width: 100, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 8, flexShrink: 0 }} />
    </div>
  );
}

export default function CareersLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ height: 36, width: 200, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 16, width: "60%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 40, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => <JobSkeleton key={i} />)}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
