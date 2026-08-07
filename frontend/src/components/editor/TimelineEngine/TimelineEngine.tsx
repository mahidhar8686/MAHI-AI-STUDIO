import TimelineTrack from "./TimelineTrack";

export default function TimelineEngine() {
  return (
    <div
      style={{
        height: "100%",
        background: "#111827",
      }}
    >
      <TimelineTrack
        track={0}
        title="🎬 Video Track 1"
      />

      <TimelineTrack
        track={1}
        title="🎬 Video Track 2"
      />

      <TimelineTrack
        track={2}
        title="🎵 Audio Track"
      />

      <TimelineTrack
        track={3}
        title="💬 Caption Track"
      />
    </div>
  );
}