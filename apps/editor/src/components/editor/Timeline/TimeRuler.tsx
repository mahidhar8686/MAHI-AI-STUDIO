import { useMediaStore } from "../../../store/mediaStore";

export default function TimeRuler() {
  const zoom = useMediaStore((s) => s.zoom);

  return (
    <div
      style={{
        display: "flex",
        height: 40,
        background: "#111827",
        borderBottom: "1px solid #374151",
      }}
    >
      <div style={{ width: 180 }} />

      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: zoom,
            flexShrink: 0,
            color: "#9CA3AF",
            fontSize: 11,
            textAlign: "center",
          }}
        >
          {i}
        </div>
      ))}
    </div>
  );
}