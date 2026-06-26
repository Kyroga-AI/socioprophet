export default function ThirdPath() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#0A0B0F",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#F2F4F8",
        display: "flex",
        flexDirection: "column",
        padding: "5.5vh 8vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "84vw", height: "0.2vh", backgroundColor: "#222A3A", position: "absolute", top: "5.5vh", left: "8vw" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.5vh" }}>
        <div style={{ fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>SocioProphet</div>
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#7E889A" }}>The Solution</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#14161F", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>04</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "78vw" }}>
          Sovereign, governed, and always current &mdash; at the same time
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.9vh", maxWidth: "76vw" }}>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#3FB6C2", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>A governed AI control plane installed inside your own environment — private cloud or on-premise.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#3FB6C2", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>Frontier-grade models run in-perimeter; no data crosses your boundary.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#3FB6C2", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>A private knowledge brain your institution owns, keeps, and can export at any time.</div>
          </div>
        </div>

        <div style={{ marginTop: "5vh", fontSize: "3vw", fontWeight: 700, letterSpacing: "-0.01em", color: "#3FB6C2" }}>
          Your brain. Your agents. Your AI.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #222A3A", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'Space Mono', monospace", fontSize: "2.2vw", color: "#9AA3B4", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#3FB6C2", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#59617A" }}>04 / 19</div>
      </div>
    </div>
  );
}
