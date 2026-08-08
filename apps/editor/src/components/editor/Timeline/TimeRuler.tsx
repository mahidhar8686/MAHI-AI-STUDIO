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

      <div style={{ width: 20, flexShrink: 0 }} />

      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: zoom,
            flexShrink: 0,
            position: "relative",
            color: "#9CA3AF",
            fontSize: 11,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 1,
              height: 8,
              background: "#4B5563",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 4,
              top: 0,
              lineHeight: "16px",
            }}
          >
            {i}
          </div>
        </div>
      ))}
    </div>
  );
}