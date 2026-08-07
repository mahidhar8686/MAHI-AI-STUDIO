export default function PlaybackControls() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 12,
        padding: 12,
        background: "#1F2937",
        borderTop: "1px solid #374151",
      }}
    >
      <button>⏮</button>
      <button>▶</button>
      <button>⏸</button>
      <button>⏹</button>
      <button>⏭</button>
    </div>
  );
}