export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f1724",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid rgba(245,166,35,0.2)",
          borderTopColor: "#F5A623",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
