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
      className="group absolute z-[999] cursor-ew-resize"
      style={{ left: playhead + 20, top: 40, height: "100%" }}
    >
      {/* Triangle marker */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div className="h-3 w-3 -rotate-45 border-l-2 border-b-2 border-red-400 opacity-80 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Vertical line */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-red-400 opacity-70 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
