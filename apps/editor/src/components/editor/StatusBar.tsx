import { useEditorStore } from "../../stores/editorStore";
import { useMediaStore } from "../../store/mediaStore";

export default function StatusBar() {
  const status = useEditorStore((state) => state.status);
  const isSaved = useEditorStore((state) => state.isSaved);
  const selected = useMediaStore((state) => state.selected);
  const timeline = useMediaStore((state) => state.timeline);
  const currentTime = useMediaStore((state) => state.currentTime);
  const isPlaying = useMediaStore((state) => state.isPlaying);

  const selectedName = selected?.name ?? "No media selected";
  const totalDuration = timeline.reduce((sum, clip) => sum + clip.duration, 0);

  return (
    <div className="flex items-center justify-between border-t border-slate-700 bg-slate-950 px-4 text-[11px] text-slate-300">
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">
          {status}
        </span>
        <span>{isSaved ? "Saved" : "Unsaved changes"}</span>
        <span>Media: {selected ? selectedName : "None"}</span>
        <span>Timeline: {totalDuration.toFixed(1)}s</span>
      </div>

      <div className="flex items-center gap-4">
        <span>{isPlaying ? "Playing" : "Paused"}</span>
        <span>Time: {currentTime.toFixed(1)}s</span>
        <span>Clips: {timeline.length}</span>
      </div>
    </div>
  );
}
