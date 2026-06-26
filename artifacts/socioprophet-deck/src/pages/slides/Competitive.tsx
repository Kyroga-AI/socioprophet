export default function Competitive() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        color: "#1C1C1C",
        display: "flex",
        flexDirection: "column",
        padding: "5.5vh 8vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "84vw", height: "0.2vh", backgroundColor: "#1C1C1C", position: "absolute", top: "5.5vh", left: "8vw" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.5vh" }}>
        <div style={{ fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>SocioProphet</div>
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>Competitive Landscape</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>17</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "80vw" }}>
          Where we stand apart
        </h2>

        <div style={{ maxWidth: "84vw" }}>
          <div style={{ display: "flex", borderBottom: "0.3vh solid #1C1C1C", paddingBottom: "1.8vh" }}>
            <div style={{ flex: "1.6 1 0", fontSize: "2.4vw", fontWeight: 700 }}>Capability</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 700, color: "#888888" }}>Public AI</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 700, color: "#888888" }}>Build your own</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 700, color: "#0B6E79" }}>SocioProphet</div>
          </div>

          <div style={{ display: "flex", borderBottom: "0.1vh solid #E0E0E0", padding: "2vh 0" }}>
            <div style={{ flex: "1.6 1 0", fontSize: "2.4vw" }}>Data stays in-perimeter</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>No</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#4A4A4A" }}>Yes</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 600, color: "#0B6E79" }}>Yes</div>
          </div>
          <div style={{ display: "flex", borderBottom: "0.1vh solid #E0E0E0", padding: "2vh 0" }}>
            <div style={{ flex: "1.6 1 0", fontSize: "2.4vw" }}>Frontier currency</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#4A4A4A" }}>Yes</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>Lags</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 600, color: "#0B6E79" }}>Managed</div>
          </div>
          <div style={{ display: "flex", borderBottom: "0.1vh solid #E0E0E0", padding: "2vh 0" }}>
            <div style={{ flex: "1.6 1 0", fontSize: "2.4vw" }}>Signed, replayable evidence</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>No</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>Rarely</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 600, color: "#0B6E79" }}>Built-in</div>
          </div>
          <div style={{ display: "flex", padding: "2vh 0" }}>
            <div style={{ flex: "1.6 1 0", fontSize: "2.4vw" }}>Regulator-ready by design</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>No</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", color: "#888888" }}>Effortful</div>
            <div style={{ flex: "1 1 0", fontSize: "2.4vw", fontWeight: 600, color: "#0B6E79" }}>Yes</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>17 / 19</div>
      </div>
    </div>
  );
}
