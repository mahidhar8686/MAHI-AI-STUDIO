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
import { useEditorStore, type EditorPanelTool } from "../../../stores/editorStore";
import { cn } from "../../../utils/cn";

interface ToolItem {
  id: EditorPanelTool;
  label: string;
  icon: typeof Clapperboard;
  ai?: boolean;
}

const tools: ToolItem[] = [
  { id: "media", label: "Media", icon: Clapperboard },
  { id: "audio", label: "Audio", icon: Music },
  { id: "text", label: "Text", icon: Type },
  { id: "stickers", label: "Stickers", icon: Sticker },
  { id: "effects", label: "Effects", icon: Sparkles },
  { id: "filters", label: "Filters", icon: SlidersHorizontal },
  { id: "transitions", label: "Transitions", icon: ArrowLeftRight },
  { id: "captions", label: "Captions", icon: Captions },
  { id: "ai", label: "AI", icon: Bot, ai: true },
];

export default function ToolRail() {
  const activePanelTool = useEditorStore((state) => state.activePanelTool);
  const setActivePanelTool = useEditorStore((state) => state.setActivePanelTool);

  return (
    <nav
      aria-label="Editor tools"
      className="flex w-[64px] shrink-0 flex-col items-center gap-1 border-r border-slate-800 bg-slate-950 py-3"
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = activePanelTool === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActivePanelTool(tool.id)}
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={active}
            className={cn(
              "group relative flex w-[48px] flex-col items-center gap-1.5 rounded-md px-2.5 py-2.5 text-slate-400 transition-all duration-150 hover:bg-slate-800 hover:text-slate-200",
              active &&
                (tool.ai
                  ? "bg-violet-600/20 text-violet-300"
                  : "bg-sky-600/20 text-sky-300"),
              active && "hover:opacity-100",
            )}
          >
            {active && (
              <div
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 rounded-full",
                  tool.ai
                    ? "bg-violet-400"
                    : "bg-sky-400",
                )}
              />
            )}
            <Icon
              className={cn(
                "h-5 w-5 transition-transform group-hover:scale-105",
                active && tool.ai && "text-violet-400",
                active && !tool.ai && "text-sky-400",
              )}
            />
            <span className="text-[10px] font-medium">{tool.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
