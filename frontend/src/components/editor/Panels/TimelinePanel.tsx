import Timeline from "../Timeline/Timeline";

export default function TimelinePanel() {
  return (
    <section
      style={{
        gridColumn: "1 / span 3",
        background: "#111827",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Timeline />
    </section>
  );
}