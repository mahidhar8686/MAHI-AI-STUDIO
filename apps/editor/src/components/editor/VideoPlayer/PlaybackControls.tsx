import { type RefObject, useEffect } from "react";
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Minimize,
} from "lucide-react";
import { useMediaStore } from "../../../store/mediaStore";
import { useEditorStore } from "../../../stores/editorStore";
import { cn } from "../../../utils/cn";

interface Props {
  duration: number;
  canvasRef: RefObject<HTMLDivElement | null>;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaybackControls({
  duration,
  canvasRef,
}: Props) {
  const isPlaying = useMediaStore((s) => s.isPlaying);
  const currentTime = useMediaStore((s) => s.currentTime);
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime);
  const play = useMediaStore((s) => s.play);
  const pause = useMediaStore((s) => s.pause);
  const stop = useMediaStore((s) => s.stop);

  const isFullscreen = useEditorStore((s) => s.isFullscreen);
  const setFullscreen = useEditorStore((s) => s.setFullscreen);
  const previewFit = useEditorStore((s) => s.previewFit);
  const setPreviewFit = useEditorStore((s) => s.setPreviewFit);
  const previewVolume = useEditorStore((s) => s.previewVolume);
  const setPreviewVolume = useEditorStore((s) => s.setPreviewVolume);

  // Keep isFullscreen in sync when user presses Escape
  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, [setFullscreen]);

  const handleFullscreen = async () => {
    if (!canvasRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await canvasRef.current.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      // Fullscreen API not available in this environment
    }
  };

  const cycleFit = () => {
    const modes: ("contain" | "cover" | "fill")[] = [
      "contain",
      "cover",
      "fill",
    ];
    const next = modes[(modes.indexOf(previewFit) + 1) % modes.length];
    setPreviewFit(next);
  };

  const showDuration = isFinite(duration) && duration > 0;

  return (
    <div className="flex h-12 shrink-0 items-center gap-2 border-t border-slate-800 bg-slate-950 px-3 text-xs text-slate-200">
      {/* Playback controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setCurrentTime(0)}
          title="Skip to start"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label="Skip to start"
        >
          <SkipBack className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={isPlaying ? pause : play}
          title={isPlaying ? "Pause" : "Play"}
          className={cn(
            "rounded-md p-1.5 transition-colors",
            isPlaying
              ? "bg-sky-600 text-white hover:bg-sky-500"
              : "text-slate-300 hover:bg-slate-800 hover:text-slate-200",
          )}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={stop}
          title="Stop"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label="Stop"
        >
          <Square className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setCurrentTime(currentTime + 5)}
          title="Forward 5s"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label="Forward 5 seconds"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Seek bar + time */}
      <div className="flex flex-1 items-center gap-2">
        <span className="w-10 shrink-0 text-right text-[10px] text-slate-500">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={duration > 0 ? duration : 1}
          step={0.1}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          className="h-1 w-full cursor-pointer"
          aria-label="Seek"
        />

        <span className="w-10 shrink-0 text-left text-[10px] text-slate-500">
          {showDuration ? formatTime(duration) : "--:--"}
        </span>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-1.5">
        <Volume2 className="h-3.5 w-3.5 text-slate-400" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={previewVolume}
          onChange={(e) => setPreviewVolume(parseFloat(e.target.value))}
          className="w-16 cursor-pointer"
          aria-label="Volume"
        />
      </div>

      {/* Fit mode */}
      <button
        type="button"
        onClick={cycleFit}
        title="Cycle fit mode (Contain → Cover → Fill)"
        className="rounded-md px-2 py-1 text-[9px] uppercase tracking-wider text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        aria-label="Cycle fit mode"
      >
        {previewFit === "contain"
          ? "Fit"
          : previewFit === "cover"
            ? "Fill"
            : "Stretch"}
      </button>

      {/* Fullscreen */}
      <button
        type="button"
        onClick={handleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="h-4 w-4" />
        ) : (
          <Maximize className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
