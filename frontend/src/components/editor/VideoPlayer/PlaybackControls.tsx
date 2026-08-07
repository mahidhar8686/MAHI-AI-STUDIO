import { useMediaStore } from "../../../store/mediaStore";

export default function PlaybackControls() {
  const play = useMediaStore((s) => s.play);
  const pause = useMediaStore((s) => s.pause);
  const stop = useMediaStore((s) => s.stop);

  const currentTime = useMediaStore((s) => s.currentTime);
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime);

  return (
    <div
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#111827",
        borderTop: "1px solid #374151",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={() =>
            setCurrentTime(Math.max(0, currentTime - 5))
          }
        >
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
            setCurrentTime(currentTime + 5)
          }
        >
          ⏭
        </button>
      </div>

      <div
        style={{
          color: "#9CA3AF",
          fontSize: 13,
        }}
      >
        {currentTime.toFixed(1)} sec
      </div>
    </div>
  );
}