import EditorHeader from "./Header/EditorHeader";
import ToolRail from "./ToolRail/ToolRail";
import AssetPanel from "./Panels/AssetPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import InspectorPanel from "./Panels/InspectorPanel";
import TimelinePanel from "./Panels/TimelinePanel";
import StatusBar from "./StatusBar";

export default function EditorLayout() {
  return (
    <div className="grid h-screen w-full grid-rows-[40px_1fr_240px_24px] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top header — compact professional bar */}
      <EditorHeader />

      {/* Main content: tool rail + asset panel + preview + inspector */}
      <div className="grid min-h-0 grid-cols-[60px_1fr] gap-2.5 p-2.5 lg:grid-cols-[64px_280px_1fr_320px]">
        <ToolRail />

        <div className="hidden min-h-0 lg:block">
          <AssetPanel />
        </div>

        <PreviewPanel />

        <div className="hidden min-h-0 lg:block">
          <InspectorPanel />
        </div>
      </div>

      {/* Timeline — full width, fixed height */}
      <div className="min-h-0 overflow-hidden border-t border-slate-800 bg-slate-900">
        <TimelinePanel />
      </div>

      {/* Status bar */}
      <StatusBar />
    </div>
  );
}
