import { useMediaStore } from "../../../store/mediaStore";

export default function PlaybackControls() {
  const play = useMediaStore((s) => s.play);
  const pause = useMediaStore((s) => s.pause);
  const stop = useMediaStore((s) => s.stop);

  const currentTime = useMediaStore((s) => s.currentTime);
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime);
  const isPlaying = useMediaStore((s) => s.isPlaying);

  return (
    <div className="flex items-center justify-between border-t border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
          className="rounded-md bg-slate-800 px-2.5 py-2 hover:bg-slate-700"
          aria-label="Rewind 5 seconds"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={isPlaying ? pause : play}
          className="rounded-md bg-sky-600 px-3 py-2 font-medium text-white hover:bg-sky-500"
          aria-label={isPlaying ? "Pause playback" : "Start playback"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={stop}
          className="rounded-md bg-slate-800 px-2.5 py-2 hover:bg-slate-700"
          aria-label="Stop playback"
        >
          ⏹
        </button>
        <button
          type="button"
          onClick={() => setCurrentTime(currentTime + 5)}
          className="rounded-md bg-slate-800 px-2.5 py-2 hover:bg-slate-700"
          aria-label="Fast forward 5 seconds"
        >
          ⏭
        </button>
      </div>

      <div className="whitespace-nowrap text-xs text-slate-300">
        {currentTime.toFixed(1)} sec
      </div>
    </div>
  );
}
