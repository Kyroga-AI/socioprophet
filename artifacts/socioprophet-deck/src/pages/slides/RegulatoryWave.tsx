export default function RegulatoryWave() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>Why Now</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>16</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "80vw" }}>
          A regulatory wave is arriving now
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.9vh", maxWidth: "76vw" }}>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>The EU AI Act sets binding obligations for high-risk AI systems.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>US SR 26-2 and existing model-risk guidance raise the bar for evidence.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>APRA CPS 230, DORA, FCA, and MAS extend operational-resilience duties to AI.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>Governance is shifting from optional to mandatory — the buying window is open.</div>
          </div>
        </div>

        <div style={{ marginTop: "4vh", fontSize: "2.2vw", fontFamily: "'DM Mono', monospace", color: "#888888", maxWidth: "78vw" }}>
          Source: EU AI Act; US SR 26-2; APRA CPS 230; EU DORA; UK FCA; MAS guidance.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>16 / 19</div>
      </div>
    </div>
  );
}
