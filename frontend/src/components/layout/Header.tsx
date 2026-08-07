export default function Header() {
  return (
    <header
      style={{
        height: 70,
        background: "#111827",
        borderBottom: "1px solid #1F2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>🎬 MAHI AI STUDIO</h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <input
          placeholder="Search..."
          style={{
            width: 260,
            padding: 10,
            borderRadius: 8,
            border: "none",
            background: "#1F2937",
            color: "#fff",
            outline: "none",
          }}
        />

        <button>🔔</button>
        <button>👤</button>
        <button>⚙️</button>
      </div>
    </header>
  );
}