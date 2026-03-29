function PostSkeleton() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, animation: "pulse 1.5s ease-in-out infinite" }}>
      <div style={{ height: 18, width: "75%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 12 }} />
      <div style={{ height: 13, width: "90%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 8 }} />
      <div style={{ height: 13, width: "60%", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 20 }} />
      <div style={{ height: 11, width: "30%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
    </div>
  );
}

export default function LitspaceLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1724", padding: "120px 24px 64px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ height: 32, width: 180, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, marginBottom: 40, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
