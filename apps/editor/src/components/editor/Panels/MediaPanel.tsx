import { useState } from "react";
import { Search, Layers, Video, Music, Image as ImageIcon } from "lucide-react";
import UploadButton from "../MediaLibrary/UploadButton";
import MediaList from "../MediaLibrary/MediaList";
import { cn } from "../../../utils/cn";

type Category = "all" | "video" | "audio" | "image";

const categories: {
  id: Category;
  label: string;
  icon: typeof Layers;
}[] = [
  { id: "all", label: "All", icon: Layers },
  { id: "video", label: "Video", icon: Video },
  { id: "audio", label: "Audio", icon: Music },
  { id: "image", label: "Image", icon: ImageIcon },
];

export default function MediaPanel() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");

  return (
    <aside className="flex h-full flex-col bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-white">
            Media
          </h2>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-400">
            Assets
          </span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800 bg-slate-950 px-3 py-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium transition-all",
                isActive
                  ? "bg-sky-600/20 text-sky-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200",
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            aria-label="Search media"
            placeholder="Search media..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Import */}
      <div className="px-3 pb-2">
        <UploadButton />
      </div>

      {/* Media grid */}
      <div className="border-t border-slate-800 px-3 pb-3">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
          Local assets
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <MediaList query={query} typeFilter={category} />
      </div>
    </aside>
  );
}
