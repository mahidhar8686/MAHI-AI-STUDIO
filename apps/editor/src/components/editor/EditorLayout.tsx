import MediaPanel from "./Panels/MediaPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import InspectorPanel from "./Panels/InspectorPanel";
import TimelinePanel from "./Panels/TimelinePanel";
import Toolbar from "./Toolbar/Toolbar";
import StatusBar from "./StatusBar";

export default function EditorLayout() {
  return (
    <div className="grid h-screen w-full grid-rows-[72px_minmax(0,1fr)_220px_32px] bg-slate-950 text-white">
      <Toolbar />

      <div className="grid min-h-0 grid-cols-1 gap-2.5 p-2.5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
          <MediaPanel />
        </div>

        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
          <PreviewPanel />
        </div>

        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
          <InspectorPanel />
        </div>
      </div>

      <div className="min-h-0 overflow-hidden border-t border-slate-700 bg-slate-900">
        <TimelinePanel />
      </div>

      <StatusBar />
    </div>
  );
}