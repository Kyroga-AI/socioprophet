export default function ProductFamily() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#7E889A" }}>Product Family</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#14161F", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>10</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "78vw" }}>
          Three products on one governed platform
        </h2>

        <div style={{ display: "flex", gap: "3vw", maxWidth: "84vw" }}>
          <div style={{ flex: 1, borderTop: "0.3vh solid #3FB6C2", paddingTop: "2.2vh" }}>
            <div style={{ fontSize: "2.6vw", fontWeight: 700, marginBottom: "1.6vh", letterSpacing: "-0.01em" }}>Noetica</div>
            <div style={{ fontSize: "2.5vw", lineHeight: 1.38, color: "#9AA3B4" }}>The private knowledge brain that captures and compounds institutional expertise.</div>
          </div>
          <div style={{ flex: 1, borderTop: "0.3vh solid #3FB6C2", paddingTop: "2.2vh" }}>
            <div style={{ fontSize: "2.6vw", fontWeight: 700, marginBottom: "1.6vh", letterSpacing: "-0.01em" }}>Profit Platform</div>
            <div style={{ fontSize: "2.5vw", lineHeight: 1.38, color: "#9AA3B4" }}>Governed AI agents that execute revenue and efficiency workflows.</div>
          </div>
          <div style={{ flex: 1, borderTop: "0.3vh solid #3FB6C2", paddingTop: "2.2vh" }}>
            <div style={{ fontSize: "2.6vw", fontWeight: 700, marginBottom: "1.6vh", letterSpacing: "-0.01em" }}>Hellagraph</div>
            <div style={{ fontSize: "2.5vw", lineHeight: 1.38, color: "#9AA3B4" }}>The evidence and provenance layer that makes every output defensible.</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #222A3A", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'Space Mono', monospace", fontSize: "2.2vw", color: "#9AA3B4", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#3FB6C2", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#59617A" }}>10 / 19</div>
      </div>
    </div>
  );
}
