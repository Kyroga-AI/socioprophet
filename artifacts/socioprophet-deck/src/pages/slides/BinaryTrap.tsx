export default function BinaryTrap() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>The Problem</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>03</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "78vw" }}>
          Regulated institutions are caught in a binary trap
        </h2>

        <div style={{ display: "flex", gap: "4vw", maxWidth: "82vw" }}>
          <div style={{ flex: 1, borderTop: "0.3vh solid #1C1C1C", paddingTop: "2.5vh" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, marginBottom: "2vh", letterSpacing: "-0.01em" }}>Use public AI</div>
            <div style={{ fontSize: "2.6vw", lineHeight: 1.4, color: "#4A4A4A" }}>
              ChatGPT and Copilot send your data, prompts, and institutional IP outside your control — with no record you can defend.
            </div>
          </div>
          <div style={{ flex: 1, borderTop: "0.3vh solid #1C1C1C", paddingTop: "2.5vh" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, marginBottom: "2vh", letterSpacing: "-0.01em" }}>Build your own</div>
            <div style={{ fontSize: "2.6vw", lineHeight: 1.4, color: "#4A4A4A" }}>
              You fall behind the frontier and burn budget chasing it, with no team large enough to keep pace.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "4.5vh", maxWidth: "78vw", fontSize: "2.6vw", lineHeight: 1.4 }}>
          No existing product resolves both sides at once — so AI adoption stalls exactly where the stakes, and the regulatory scrutiny, are highest.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>03 / 19</div>
      </div>
    </div>
  );
}
