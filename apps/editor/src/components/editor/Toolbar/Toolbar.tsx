import { useEditorStore } from "../../../stores/editorStore";
import { useMediaStore } from "../../../store/mediaStore";
import { saveProject } from "../../../services/projectPersistence";

export default function Toolbar() {
  const projectName = useEditorStore((state) => state.projectName);
  const selectedTool = useEditorStore((state) => state.selectedTool);
  const setSelectedTool = useEditorStore((state) => state.setSelectedTool);
  const setStatus = useEditorStore((state) => state.setStatus);
  const setSaved = useEditorStore((state) => state.setSaved);
  const setSaveState = useEditorStore((state) => state.setSaveState);

  const selected = useMediaStore((state) => state.selected);
  const isPlaying = useMediaStore((state) => state.isPlaying);
  const play = useMediaStore((state) => state.play);
  const pause = useMediaStore((state) => state.pause);
  const stop = useMediaStore((state) => state.stop);

  const toolButtons = [
    { label: "Select", value: "select" as const },
    { label: "Trim", value: "trim" as const },
    { label: "Move", value: "move" as const },
  ];

  return (
    <header className="flex h-full items-center justify-between border-b border-slate-700 bg-slate-900 px-4 text-sm text-slate-100">
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-sky-200">
          {projectName}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {toolButtons.map((tool) => (
            <button
              key={tool.value}
              type="button"
              onClick={() => {
                setSelectedTool(tool.value);
                setStatus(`${tool.label} tool selected`);
              }}
              className={
                selectedTool === tool.value
                  ? "rounded-md bg-sky-600 px-3 py-2 font-medium text-white"
                  : "rounded-md bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"
              }
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus("Undo action requested");
          }}
          className="rounded-md bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("Redo action requested");
          }}
          className="rounded-md bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"
        >
          Redo
        </button>
        <button
          type="button"
          onClick={() => {
            setSaveState("saving");
            setStatus("Saving project...");

            const result = saveProject();

            if (result.ok) {
              setSaved(true);
              setStatus("Project saved");
            } else {
              setSaveState("failed");
              setStatus(`Save failed: ${result.error ?? "unknown error"}`);
            }
          }}
          className="rounded-md bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-500"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            if (isPlaying) {
              pause();
              setStatus("Playback paused");
            } else {
              play();
              setStatus("Playback started");
            }
          }}
          className="rounded-md bg-sky-600 px-3 py-2 font-medium text-white hover:bg-sky-500"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            stop();
            setStatus("Playback stopped");
          }}
          className="rounded-md bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"
        >
          Stop
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus(`Export ready for ${selected ? selected.name : "selection"}`);
          }}
          className="rounded-md bg-violet-600 px-3 py-2 font-medium text-white hover:bg-violet-500"
        >
          Export
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("Settings opened");
          }}
          className="rounded-md bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"
        >
          Settings
        </button>
      </div>
    </header>
  );
}
