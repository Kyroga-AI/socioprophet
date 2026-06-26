export default function Governance() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>Pillar II &mdash; Governance</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>06</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "80vw" }}>
          Governance is built into the architecture, not bolted on
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.9vh", maxWidth: "76vw" }}>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>Every model call and agent action is cryptographically signed and replayable.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>A full evidence record sits underneath every AI decision.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>The system distinguishes what was retrieved, inferred, deduced, and stated.</div>
          </div>
          <div style={{ display: "flex", gap: "1.6vw", alignItems: "baseline" }}>
            <div style={{ width: "1.6vw", height: "0.35vh", backgroundColor: "#0B6E79", flexShrink: 0, marginTop: "1.7vh" }} />
            <div style={{ fontSize: "2.45vw", lineHeight: 1.32 }}>It is designed to be handed to an auditor, regulator, or risk committee as-is.</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>06 / 19</div>
      </div>
    </div>
  );
}
