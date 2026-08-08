import {
  Undo2,
  Redo2,
  Settings,
  Download,
  Clapperboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEditorStore } from "../../../stores/editorStore";
import { handleSaveProject } from "../../../services/projectPersistence";

export default function EditorHeader() {
  const navigate = useNavigate();

  const projectName = useEditorStore((state) => state.projectName);
  const saveState = useEditorStore((state) => state.saveState);
  const setSaved = useEditorStore((state) => state.setSaved);
  const setSaveState = useEditorStore((state) => state.setSaveState);
  const setStatus = useEditorStore((state) => state.setStatus);

  const saveLabel =
    saveState === "saved"
      ? "Saved"
      : saveState === "saving"
        ? "Saving..."
        : saveState === "failed"
          ? "Save failed"
          : "Unsaved";

  const savePillClass =
    saveState === "saved"
      ? "bg-emerald-500/15 text-emerald-300"
      : saveState === "failed"
        ? "bg-red-500/15 text-red-300"
        : saveState === "saving"
          ? "bg-amber-500/15 text-amber-300"
          : "bg-amber-500/15 text-amber-300";

  const handleSave = () => {
    handleSaveProject(setSaveState, setSaved, setStatus);
  };

  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-3 text-sm text-slate-100">
      {/* Left: brand + project name */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-4 w-4 text-sky-500" />
          <span className="text-xs font-semibold tracking-wide text-white">
            MAHI AI STUDIO
          </span>
        </div>

        <span className="h-4 w-px bg-slate-800" />

        <span
          className="truncate text-slate-300 max-w-[180px] text-xs"
          title={projectName}
        >
          {projectName}
        </span>
      </div>

      {/* Center: undo / redo / save status */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled
          title="Undo (no history available)"
          className="rounded-md p-1.5 text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Undo"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled
          title="Redo (no history available)"
          className="rounded-md p-1.5 text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Redo"
        >
          <Redo2 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={handleSave}
          title="Save project"
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-medium transition-opacity hover:opacity-85 ${savePillClass}`}
          aria-label={`Save project (current: ${saveLabel})`}
        >
          {saveLabel}
        </button>
      </div>

      {/* Right: settings / export */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          title="Open settings"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label="Settings"
        >
          <Settings className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled
          title="Export (not available yet)"
          className="rounded-md p-1.5 text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Export"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
