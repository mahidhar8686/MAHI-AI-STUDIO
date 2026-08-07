interface Props {
  track: number;
  title: string;
}

export default function TimelineTrack({
  track,
  title,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        height: 60,
        borderBottom: "1px solid #1F2937",
      }}
    >
      <div
        style={{
          background: "#1F2937",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          paddingLeft: 15,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: "relative",
          background: "#0F172A",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 10,
            width: 180,
            height: 40,
            background: "#2563EB",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}