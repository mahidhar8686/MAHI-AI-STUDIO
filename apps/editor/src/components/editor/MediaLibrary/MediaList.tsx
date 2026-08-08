import { useMediaStore } from "../../../store/mediaStore";
import { cn } from "../../../utils/cn";
import { Trash2 } from "lucide-react";

interface Props {
  query?: string;
  typeFilter?: "video" | "audio" | "image" | "all";
}

export default function MediaList({
  query = "",
  typeFilter = "all",
}: Props) {
  const files = useMediaStore((s) => s.files);
  const mediaUrls = useMediaStore((s) => s.mediaUrls);
  const selected = useMediaStore((s) => s.selected);
  const selectFile = useMediaStore((s) => s.selectFile);
  const removeFile = useMediaStore((s) => s.removeFile);
  const removeMediaWithClips = useMediaStore((s) => s.removeMediaWithClips);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleFiles = files.filter((file) => {
    const matchesQuery =
      normalizedQuery === "" ||
      file.name.toLowerCase().includes(normalizedQuery);
    const matchesType = typeFilter === "all" || file.type.startsWith(typeFilter);
    return matchesQuery && matchesType;
  });

  if (visibleFiles.length === 0 && normalizedQuery === "" && typeFilter === "all") {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        No media imported yet. Use the import button to add video,
        audio, or image files.
      </div>
    );
  }

  if (visibleFiles.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        No media matching your selection.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {visibleFiles.map((file) => {
        const isSelected = selected?.id === file.id;
        const isImage = file.type.startsWith("image");
        const isVideo = file.type.startsWith("video");

      const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const result = await removeFile(file.id);
        if (result && !result.ok && result.needsConfirmation) {
          const confirmed = window.confirm(
            `This media is used in ${result.clipCount} timeline clip(s). Remove the media and its clips?`
          );
          if (confirmed) {
            await removeMediaWithClips(file.id);
          }
        }
      };

      return (
        <button
          key={file.id}
          type="button"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("media-id", file.id);
          }}
          onClick={() => selectFile(file)}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border bg-slate-800 p-3 text-left text-slate-100 transition-all duration-150 hover:border-slate-500 hover:bg-slate-700",
            isSelected
              ? "border-sky-500 bg-sky-500/10 ring-1 ring-sky-400"
              : "border-slate-700",
          )}
        >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-900">
              {isImage ? (
                <img
                  src={mediaUrls[file.id] ?? ""}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : isVideo ? (
                <span className="text-2xl">🎬</span>
              ) : (
                <span className="text-2xl">🎵</span>
              )}
              <button
                type="button"
                onClick={handleDelete}
                className="absolute right-1 top-1 rounded-md bg-black/60 p-1 text-red-400 opacity-0 transition-opacity hover:bg-black/80 hover:text-red-300 group-hover:opacity-100"
                title="Delete media"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              {!file.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-[10px] text-slate-200">
                  Unavailable
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="truncate text-xs font-medium">{file.name}</div>
              <div className="truncate text-[10px] text-slate-400">
                {file.type || "Unknown type"}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
