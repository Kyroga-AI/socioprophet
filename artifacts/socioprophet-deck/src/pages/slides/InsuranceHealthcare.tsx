export default function InsuranceHealthcare() {
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
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>Market &mdash; Insurance &amp; Healthcare</div>
      </div>

      <div style={{ position: "absolute", top: "32vh", left: "8vw", fontSize: "25vw", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.8, zIndex: 0, userSelect: "none", letterSpacing: "-0.05em" }}>15</div>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 1, position: "relative", marginTop: "2.5vh" }}>
        <h2 style={{ fontSize: "3vw", fontWeight: 700, margin: "0 0 3vh 0", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "80vw" }}>
          Insurance and healthcare
        </h2>

        <div style={{ display: "flex", gap: "4vw", maxWidth: "82vw" }}>
          <div style={{ flex: 1, borderTop: "0.3vh solid #1C1C1C", paddingTop: "2.5vh" }}>
            <div style={{ fontSize: "2.6vw", fontWeight: 700, marginBottom: "2vh", letterSpacing: "-0.01em" }}>Insurance</div>
            <div style={{ fontSize: "2.6vw", lineHeight: 1.4, color: "#4A4A4A" }}>
              Underwriting, claims, and actuarial work demand explainable, defensible AI — exactly what the evidence fabric delivers.
            </div>
          </div>
          <div style={{ flex: 1, borderTop: "0.3vh solid #1C1C1C", paddingTop: "2.5vh" }}>
            <div style={{ fontSize: "2.6vw", fontWeight: 700, marginBottom: "2vh", letterSpacing: "-0.01em" }}>Healthcare</div>
            <div style={{ fontSize: "2.6vw", lineHeight: 1.4, color: "#4A4A4A" }}>
              Patient data must never leave the perimeter; sovereignty makes frontier AI usable under strict privacy regimes.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "4.5vh", maxWidth: "78vw", fontSize: "2.6vw", lineHeight: 1.4 }}>
          In both sectors, the gate to adoption is trust — and trust is what SocioProphet is engineered to produce.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.1vh solid #E0E0E0", paddingTop: "1.8vh", marginTop: "auto", fontFamily: "'DM Mono', monospace", fontSize: "2.2vw", color: "#4A4A4A", zIndex: 1 }}>
        <div>June 2026 &middot; Prepared by SocioProphet &middot; <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span></div>
        <div style={{ color: "#888888" }}>15 / 19</div>
      </div>
    </div>
  );
}
