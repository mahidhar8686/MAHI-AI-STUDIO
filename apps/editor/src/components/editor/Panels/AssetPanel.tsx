import {
  Clapperboard,
  Music,
  Type,
  Sticker,
  Sparkles,
  SlidersHorizontal,
  ArrowLeftRight,
  Captions,
  Bot,
} from "lucide-react";
import { useEditorStore } from "../../../stores/editorStore";
import MediaPanel from "./MediaPanel";
import { cn } from "../../../utils/cn";

export default function AssetPanel() {
  const activePanelTool = useEditorStore((state) => state.activePanelTool);

  if (activePanelTool === "media") {
    return <MediaPanel />;
  }

  const meta: Record<string, { label: string; icon: typeof Clapperboard; ai?: boolean }> = {
    audio: { label: "Audio", icon: Music },
    text: { label: "Text", icon: Type },
    stickers: { label: "Stickers", icon: Sticker },
    effects: { label: "Effects", icon: Sparkles },
    filters: { label: "Filters", icon: SlidersHorizontal },
    transitions: { label: "Transitions", icon: ArrowLeftRight },
    captions: { label: "Captions", icon: Captions },
    ai: { label: "AI", icon: Bot, ai: true },
  };

  const current = meta[activePanelTool];
  const Icon = current.icon;

  return (
    <aside className="flex h-full flex-col bg-slate-900 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-3 py-2.5">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white">
          <Icon
            className={cn(
              "h-3.5 w-3.5",
              current.ai ? "text-violet-400" : "text-sky-400",
            )}
          />
          {current.label}
        </h2>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-500">
          Coming soon
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <div
            className={cn(
              "mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg",
              current.ai
                ? "bg-violet-600/10 text-violet-400"
                : "bg-slate-800 text-slate-500",
            )}
          >
            {<Icon className="h-5 w-5" />}
          </div>
          <p className="text-xs text-slate-400">
            The {current.label} panel is not implemented yet.
            <br />
            Media, search, and timeline remain fully functional.
          </p>
        </div>
      </div>
    </aside>
  );
}
