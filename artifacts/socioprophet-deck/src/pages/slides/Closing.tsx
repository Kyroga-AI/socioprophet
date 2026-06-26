export default function Closing() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>SocioProphet</div>
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#7E889A" }}>Contact</div>
      </div>

      <div style={{ position: "absolute", top: "34vh", left: "8vw", fontSize: "25vw", fontWeight: 800, color: "#14161F", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>19</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, position: "relative", marginTop: "6vh" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.2vw", fontWeight: 700, color: "#866CF7", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3vh" }}>
          Your brain &middot; Your agents &middot; Your AI
        </div>
        <h2 style={{ fontSize: "5.6vw", fontWeight: 800, margin: 0, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: "76vw" }}>
          Frontier AI you can hand to a regulator.
        </h2>
        <p style={{ fontSize: "2.6vw", fontWeight: 400, color: "#9AA3B4", marginTop: "4vh", maxWidth: "62vw", lineHeight: 1.4 }}>
          Sovereign, governed enterprise AI &mdash; with your data inside your walls.
        </p>
        <div style={{ marginTop: "5vh", fontFamily: "'Space Mono', monospace", fontSize: "2.6vw", color: "#866CF7", fontWeight: 700 }}>
          hello@socioprophet.ai
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #222A3A", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'Space Mono', monospace", fontSize: "2.2vw", color: "#9AA3B4", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#3FB6C2", fontWeight: 700 }}>Confidential</span></div>
        <div style={{ color: "#59617A" }}>19 / 19</div>
      </div>
    </div>
  );
}
