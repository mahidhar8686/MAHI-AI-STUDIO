import { useMediaStore } from "../../../store/mediaStore";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import PlaybackControls from "../VideoPlayer/PlaybackControls";

export default function PreviewPanel() {
  const selected = useMediaStore((state) => state.selected);

  return (
    <section className="flex h-full flex-col overflow-hidden bg-slate-900 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-4 py-3">
        <h2 className="text-base font-semibold text-white">Preview</h2>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300">
          {selected ? selected.type.split("/")[0] : "Idle"}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-slate-950 p-3">
        <div className="flex h-full items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-black">
          <VideoPlayer />
        </div>
      </div>

      <PlaybackControls />
    </section>
  );
}
