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
      className="absolute z-[999] cursor-ew-resize"
      style={{ left: playhead + 20, top: 40, height: "100%" }}
    >
      {/* Triangle marker — peeks above the line into the ruler area */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
        <div className="h-0 w-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-red-500" />
      </div>

      {/* Vertical line */}
      <div className="absolute inset-0 w-0.5 bg-red-500" />
    </div>
  );
}
