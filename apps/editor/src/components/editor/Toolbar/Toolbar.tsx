export default function Toolbar() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#111827",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button>📂 Import</button>

        <button>💾 Save</button>

        <button>↩ Undo</button>

        <button>↪ Redo</button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button>▶ Play</button>

        <button>⏸ Pause</button>

        <button>⏹ Stop</button>
      </div>
    </div>
  );
}