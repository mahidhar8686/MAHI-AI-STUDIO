import {
  Undo2,
  Redo2,
  Scissors,
  Trash2,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useMediaStore } from "../../../store/mediaStore";
import { useEditorStore } from "../../../stores/editorStore";
import { cn } from "../../../utils/cn";

const editTools = [
  { label: "Select", value: "select" as const },
  { label: "Trim", value: "trim" as const },
  { label: "Move", value: "move" as const },
] as const;

export default function TimelineControls() {
  const isPlaying = useMediaStore((s) => s.isPlaying);
  const play = useMediaStore((s) => s.play);
  const pause = useMediaStore((s) => s.pause);
  const stop = useMediaStore((s) => s.stop);

  const playhead = useMediaStore((s) => s.playhead);
  const setPlayhead = useMediaStore((s) => s.setPlayhead);

  const zoom = useMediaStore((s) => s.zoom);
  const zoomIn = useMediaStore((s) => s.zoomIn);
  const zoomOut = useMediaStore((s) => s.zoomOut);

  const selectedClip = useMediaStore((s) => s.selectedClip);
  const timeline = useMediaStore((s) => s.timeline);
  const splitClip = useMediaStore((s) => s.splitClip);
  const deleteClip = useMediaStore((s) => s.deleteClip);

  const selectedTool = useEditorStore((s) => s.selectedTool);
  const setSelectedTool = useEditorStore((s) => s.setSelectedTool);
  const setStatus = useEditorStore((s) => s.setStatus);

  const handleSplit = () => {
    if (!selectedClip) return;
    const clip = timeline.find((c) => c.id === selectedClip);
    if (!clip) return;
    splitClip(selectedClip, playhead / zoom - clip.start);
    setStatus("Clip split");
  };

  const handleDelete = () => {
    if (!selectedClip) return;
    deleteClip(selectedClip);
    setStatus("Clip deleted");
  };

  return (
    <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-3 text-xs text-slate-200">
      {/* Left: undo / redo / edit tools / split / delete */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled
          title="Undo (not available)"
          className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Undo"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled
          title="Redo (not available)"
          className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Redo"
        >
          <Redo2 className="h-3.5 w-3.5" />
        </button>

        <div className="h-4 w-px bg-slate-700" />

        {editTools.map((tool) => (
          <button
            key={tool.value}
            type="button"
            onClick={() => {
              setSelectedTool(tool.value);
              setStatus(`${tool.label} tool selected`);
            }}
            title={tool.label}
            className={cn(
              "px-2 py-1 text-[10px] font-medium transition-colors",
              selectedTool === tool.value
                ? "rounded-md bg-sky-600/20 text-sky-300"
                : "rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200",
            )}
          >
            {tool.label}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-700" />

        <button
          type="button"
          disabled={!selectedClip}
          onClick={handleSplit}
          title="Split at playhead (S)"
          className={cn(
            "rounded-md p-1.5 transition-colors",
            selectedClip
              ? "text-slate-300 hover:bg-slate-800"
              : "text-slate-500 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label="Split clip"
        >
          <Scissors className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled={!selectedClip}
          onClick={handleDelete}
          title="Delete (Delete)"
          className={cn(
            "rounded-md p-1.5 transition-colors",
            selectedClip
              ? "text-red-400 hover:bg-red-600/10"
              : "text-slate-500 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label="Delete clip"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Center: playback + zoom */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPlayhead(0)}
          title="Go to start"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Go to start"
        >
          <SkipBack className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={isPlaying ? pause : play}
          title={isPlaying ? "Pause" : "Play"}
          className={cn(
            "rounded-md p-1.5 transition-all",
            isPlaying
              ? "bg-sky-600 text-white shadow-sm hover:bg-sky-500"
              : "text-slate-300 hover:bg-slate-800 hover:text-slate-200",
          )}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </button>

        <button
          type="button"
          onClick={stop}
          title="Stop"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Stop"
        >
          <Square className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setPlayhead(playhead + zoom)}
          title="Skip forward"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Skip forward"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>

        <div className="h-4 w-px bg-slate-700" />

        <button
          type="button"
          onClick={zoomOut}
          title="Zoom out"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>

        <span className="w-12 text-center text-[10px] font-medium text-slate-400">
          {zoom}px
        </span>

        <button
          type="button"
          onClick={zoomIn}
          title="Zoom in"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right: current time */}
      <div>
        <span className="text-[10px] font-medium text-slate-400">
          {(playhead / zoom).toFixed(1)}s
        </span>
      </div>
    </div>
  );
}
