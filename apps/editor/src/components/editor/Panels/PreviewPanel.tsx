import VideoPlayer from "../VideoPlayer/VideoPlayer";
import PlaybackControls from "../VideoPlayer/PlaybackControls";

export default function PreviewPanel() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #1F2937",
        height: "100%",
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "15px 20px",
          borderBottom: "1px solid #1F2937",
          background: "#0F172A",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 18,
          }}
        >
          🎬 Video Preview
        </h2>
      </div>

      {/* Preview */}

      <div
        style={{
          flex: 1,
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          padding: 10,
        }}
      >
        <VideoPlayer />
      </div>

      {/* Controls */}

      <PlaybackControls />
    </section>
  );
}