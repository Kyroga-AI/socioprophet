export default function Closing() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#1C1C1C",
        fontFamily: "'Inter', sans-serif",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        padding: "5.5vh 8vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "84vw", height: "0.2vh", backgroundColor: "#FFFFFF", position: "absolute", top: "5.5vh", left: "8vw" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.5vh" }}>
        <div style={{ fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>SocioProphet</div>
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#A8A8A8" }}>Contact</div>
      </div>

      <div style={{ position: "absolute", top: "34vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#2A2A2A", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>19</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, position: "relative", marginTop: "6vh" }}>
        <h2 style={{ fontSize: "5vw", fontWeight: 700, margin: 0, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: "72vw" }}>
          Your brain. Your agents. Your AI.
        </h2>
        <p style={{ fontSize: "2.8vw", fontWeight: 400, color: "#C8C8C8", marginTop: "4vh", maxWidth: "62vw", lineHeight: 1.4 }}>
          Sovereign, governed enterprise AI that frontier institutions can hand to a regulator.
        </p>
        <div style={{ marginTop: "5vh", fontFamily: "'DM Mono', monospace", fontSize: "2.6vw", color: "#0B6E79", fontWeight: 500 }}>
          hello@socioprophet.ai
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #3A3A3A", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#A8A8A8", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#3FB6C2", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>19 / 19</div>
      </div>
    </div>
  );
}
