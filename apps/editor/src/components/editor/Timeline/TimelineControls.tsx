import { useMediaStore } from "../../../store/mediaStore";

export default function TimelineControls() {
  const play = useMediaStore((s) => s.play);
  const pause = useMediaStore((s) => s.pause);
  const stop = useMediaStore((s) => s.stop);

  const playhead = useMediaStore((s) => s.playhead);
  const setPlayhead = useMediaStore((s) => s.setPlayhead);

  const zoom = useMediaStore((s) => s.zoom);
  const zoomIn = useMediaStore((s) => s.zoomIn);
  const zoomOut = useMediaStore((s) => s.zoomOut);

  const selectedClip = useMediaStore(
    (s) => s.selectedClip
  );

  const timeline = useMediaStore(
    (s) => s.timeline
  );

  const deleteClip = useMediaStore(
    (s) => s.deleteClip
  );

  const splitClip = useMediaStore(
    (s) => s.splitClip
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 15px",
        background: "#1F2937",
        borderBottom: "1px solid #374151",
      }}
    >
      {/* Playback */}

      <button onClick={() => setPlayhead(0)}>
        ⏮
      </button>

      <button onClick={play}>
        ▶
      </button>

      <button onClick={pause}>
        ⏸
      </button>

      <button onClick={stop}>
        ⏹
      </button>

      <button
        onClick={() =>
          setPlayhead(playhead + zoom)
        }
      >
        ⏭
      </button>

      <div
        style={{
          width: 1,
          height: 24,
          background: "#374151",
          margin: "0 10px",
        }}
      />

      {/* Editing */}

      <button
        disabled={!selectedClip}
        onClick={() => {
          if (selectedClip) {
            const clip = timeline.find(
              (c) => c.id === selectedClip
            );

            if (!clip) return;

            splitClip(
              selectedClip,
              playhead / zoom - clip.start
            );
          }
        }}
      >
        ✂ Split
      </button>

      <button
        disabled={!selectedClip}
        onClick={() => {
          if (selectedClip) {
            deleteClip(selectedClip);
          }
        }}
      >
        🗑 Delete
      </button>

      <div
        style={{
          width: 1,
          height: 24,
          background: "#374151",
          margin: "0 10px",
        }}
      />

      {/* Zoom */}

      <button onClick={zoomOut}>
        ➖
      </button>

      <span
        style={{
          color: "#fff",
          minWidth: 70,
          textAlign: "center",
        }}
      >
        {zoom}px
      </span>

      <button onClick={zoomIn}>
        ➕
      </button>

      <div
        style={{
          marginLeft: "auto",
          color: "#9CA3AF",
          fontSize: 13,
        }}
      >
        Time: {(playhead / zoom).toFixed(1)}s
      </div>
    </div>
  );
}