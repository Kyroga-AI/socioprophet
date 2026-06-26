export default function Title() {
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
      <div
        style={{
          width: "84vw",
          height: "0.2vh",
          backgroundColor: "#1C1C1C",
          position: "absolute",
          top: "8vh",
          left: "8vw",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "2vh",
        }}
      >
        <div style={{ fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          SocioProphet
        </div>
        <div style={{ fontSize: "2.2vw", fontWeight: 400, color: "#666666" }}>
          Sovereign Enterprise AI
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "34vh",
          left: "8vw",
          fontSize: "25vw",
          fontWeight: 700,
          color: "#F5F5F5",
          lineHeight: 0.8,
          zIndex: 0,
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        01
      </div>

      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
          position: "relative",
          marginTop: "8vh",
        }}
      >
        <h1
          style={{
            fontSize: "8vw",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            maxWidth: "80vw",
          }}
        >
          SocioProphet
        </h1>
        <p
          style={{
            fontSize: "3vw",
            fontWeight: 500,
            color: "#1C1C1C",
            marginTop: "4vh",
            maxWidth: "62vw",
            lineHeight: 1.3,
            textWrap: "balance",
          }}
        >
          Sovereign, governed enterprise AI for regulated institutions.
        </p>
        <p
          style={{
            fontSize: "2.6vw",
            fontWeight: 400,
            color: "#4A4A4A",
            marginTop: "2.5vh",
            maxWidth: "55vw",
            lineHeight: 1.4,
          }}
        >
          Frontier-grade AI you can hand to a regulator.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "0.1vh solid #E0E0E0",
          paddingTop: "2.5vh",
          marginTop: "auto",
          fontFamily: "'DM Mono', monospace",
          fontSize: "2.2vw",
          color: "#4A4A4A",
          zIndex: 1,
        }}
      >
        <div>
          June 2026 &middot; Prepared by SocioProphet &middot;{" "}
          <span style={{ color: "#0B6E79", fontWeight: 500 }}>Confidential</span>
        </div>
        <div style={{ color: "#888888" }}>01 / 19</div>
      </div>
    </div>
  );
}
