import UploadButton from "../MediaLibrary/UploadButton";
import MediaList from "../MediaLibrary/MediaList";

export default function MediaPanel() {
  return (
    <aside className="flex h-full flex-col bg-slate-900 text-slate-100">
      <div className="border-b border-slate-700 bg-slate-950 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Media Library</h2>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300">
            Assets
          </span>
        </div>
      </div>

      <div className="p-3">
        <input
          aria-label="Search media"
          placeholder="Search media..."
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
        />
      </div>

      <div className="px-3 pb-3">
        <UploadButton />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <MediaList />
      </div>
    </aside>
  );
}
