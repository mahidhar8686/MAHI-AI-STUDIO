import { useMediaStore } from "../../../store/mediaStore";

interface Props {
  query?: string;
}

export default function MediaList({ query = "" }: Props) {
  const files = useMediaStore((s) => s.files);
  const selected = useMediaStore((s) => s.selected);
  const selectFile = useMediaStore((s) => s.selectFile);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleFiles =
    normalizedQuery === ""
      ? files
      : files.filter((file) =>
          file.name.toLowerCase().includes(normalizedQuery)
        );

  if (visibleFiles.length === 0 && normalizedQuery === "") {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-600 bg-slate-800/70 p-4 text-center text-sm text-slate-300">
        No media imported yet. Use the import button to add video, audio, or image files.
      </div>
    );
  }

  if (visibleFiles.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-600 bg-slate-800/70 p-4 text-center text-sm text-slate-300">
        No media matches "{query.trim()}".
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {visibleFiles.map((file) => {
        const isSelected = selected?.id === file.id;

        return (
          <button
            key={file.id}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("media-id", file.id)}
            onClick={() => selectFile(file)}
            className={
              isSelected
                ? "flex w-full items-center gap-3 rounded-lg border border-sky-500 bg-sky-500/10 p-3 text-left text-white"
                : "flex w-full items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-3 text-left text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
            }
          >
            <div className="text-xl">
              {file.type.startsWith("video")
                ? "🎬"
                : file.type.startsWith("audio")
                  ? "🎵"
                  : "🖼️"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{file.name}</div>
              <div className="mt-1 text-[11px] text-slate-400">{file.type || "Unknown type"}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
