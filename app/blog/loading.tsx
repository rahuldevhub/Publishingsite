function BlogCardSkeleton() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden", animation: "pulse 1.5s ease-in-out infinite" }}>
      <div style={{ height: 200, backgroundColor: "rgba(255,255,255,0.08)" }} />
      <div style={{ padding: 20 }}>
        <div style={{ height: 18, width: "80%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 10 }} />
        <div style={{ height: 13, width: "95%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 6 }} />
        <div style={{ height: 13, width: "70%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 16 }} />
        <div style={{ height: 11, width: "25%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ height: 32, width: 160, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 40, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
          {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
