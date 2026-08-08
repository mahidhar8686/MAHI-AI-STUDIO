import { useMediaStore } from "../../../store/mediaStore";

export default function Playhead() {
  const playhead = useMediaStore((s) => s.playhead);
  const setPlayhead = useMediaStore((s) => s.setPlayhead);

  return (
    <div
      onMouseDown={(e) => {
        const parent =
          e.currentTarget.parentElement!.getBoundingClientRect();

        const move = (ev: MouseEvent) => {
          setPlayhead(ev.clientX - parent.left - 20);
        };

        const up = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
      }}
      style={{
        position: "absolute",
        left: playhead + 20,
        top: 40,
        width: 2,
        height: "100%",
        background: "#EF4444",
        zIndex: 999,
        cursor: "ew-resize",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          background: "#EF4444",
          borderRadius: "50%",
          marginLeft: -5,
          marginTop: -6,
        }}
      />
    </div>
  );
}