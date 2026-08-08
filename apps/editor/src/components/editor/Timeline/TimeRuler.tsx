import { useMediaStore } from "../../../store/mediaStore";

export default function TimeRuler() {
  const zoom = useMediaStore((s) => s.zoom);

  return (
    <div className="flex h-10 items-end border-b border-slate-800 bg-slate-950">
      {/* Track label column spacer */}
      <div className="w-[180px] flex-shrink-0" />

      {/* +20px coordinate-system spacer */}
      <div className="w-[20px] flex-shrink-0" />

      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 text-[9px] text-slate-500"
          style={{ width: zoom }}
        >
          <div className="absolute bottom-0 left-0 h-2 w-px bg-slate-700" />
          <span className="block pt-2.5">{i}</span>
        </div>
      ))}
    </div>
  );
}
