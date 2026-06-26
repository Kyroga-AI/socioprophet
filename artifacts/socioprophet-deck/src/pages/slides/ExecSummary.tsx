export default function ExecSummary() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>Executive Summary</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>02</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 2.5vh 0", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The argument in five lines
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.7vh", maxWidth: "76vw" }}>
          <div style={{ display: "flex", gap: "1.8vw", alignItems: "baseline" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.4vw", fontWeight: 500, color: "#0B6E79", width: "3vw", flexShrink: 0 }}>01</div>
            <div style={{ fontSize: "2.4vw", lineHeight: 1.3, color: "#1C1C1C" }}>Every regulated institution faces a binary trap: use public AI and leak IP, or build your own and fall behind.</div>
          </div>
          <div style={{ display: "flex", gap: "1.8vw", alignItems: "baseline" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.4vw", fontWeight: 500, color: "#0B6E79", width: "3vw", flexShrink: 0 }}>02</div>
            <div style={{ fontSize: "2.4vw", lineHeight: 1.3, color: "#1C1C1C" }}>SocioProphet is the third path — a governed AI control plane that runs entirely inside your environment.</div>
          </div>
          <div style={{ display: "flex", gap: "1.8vw", alignItems: "baseline" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.4vw", fontWeight: 500, color: "#0B6E79", width: "3vw", flexShrink: 0 }}>03</div>
            <div style={{ fontSize: "2.4vw", lineHeight: 1.3, color: "#1C1C1C" }}>Three pillars hold it up: sovereignty, governance by architecture, and managed currency.</div>
          </div>
          <div style={{ display: "flex", gap: "1.8vw", alignItems: "baseline" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.4vw", fontWeight: 500, color: "#0B6E79", width: "3vw", flexShrink: 0 }}>04</div>
            <div style={{ fontSize: "2.4vw", lineHeight: 1.3, color: "#1C1C1C" }}>Every model call and agent action is cryptographically signed, evidenced, and replayable.</div>
          </div>
          <div style={{ display: "flex", gap: "1.8vw", alignItems: "baseline" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.4vw", fontWeight: 500, color: "#0B6E79", width: "3vw", flexShrink: 0 }}>05</div>
            <div style={{ fontSize: "2.4vw", lineHeight: 1.3, color: "#1C1C1C" }}>It is built for the regulatory wave now arriving: EU AI Act, SR 26-2, APRA CPS 230, FCA, DORA, MAS.</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>02 / 19</div>
      </div>
    </div>
  );
}
