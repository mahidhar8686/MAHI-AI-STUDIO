import { useMediaStore } from "../../../store/mediaStore";

export default function InspectorPanel() {
  const selected = useMediaStore((state) => state.selected);

  if (!selected) {
    return (
      <section className="flex h-full flex-col bg-slate-900 p-5 text-slate-200">
        <h2 className="mb-4 text-base font-semibold text-white">Inspector</h2>
        <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-800/70 p-4 text-center text-sm text-slate-400">
          Select a media item to inspect its properties.
        </div>
      </section>
    );
  }

  return (
    <section className="h-full bg-slate-900 p-5 text-slate-100">
      <h2 className="mb-4 text-base font-semibold text-white">Inspector</h2>

      <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Selected item</p>
          <h3 className="mt-1 truncate text-lg font-medium text-white">{selected.name}</h3>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex items-center justify-between rounded-md bg-slate-900 px-3 py-2">
            <span className="text-slate-400">Type</span>
            <span className="text-slate-100">{selected.type}</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-900 px-3 py-2">
            <span className="text-slate-400">URL</span>
            <span className="max-w-[140px] truncate text-slate-100">{selected.url}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
