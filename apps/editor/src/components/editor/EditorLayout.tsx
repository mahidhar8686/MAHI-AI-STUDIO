import MediaPanel from "./Panels/MediaPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import InspectorPanel from "./Panels/InspectorPanel";
import TimelinePanel from "./Panels/TimelinePanel";
import Toolbar from "./Toolbar/Toolbar";

export default function EditorLayout() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "60px 1fr 260px",
        background: "#0F172A",
      }}
    >
      {/* Toolbar */}

      <Toolbar />

      {/* Main Editor */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          gap: 10,
          padding: 10,
          overflow: "hidden",
        }}
      >
        {/* Media */}

        <div
          style={{
            background: "#111827",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #1F2937",
          }}
        >
          <MediaPanel />
        </div>

        {/* Preview */}

        <div
          style={{
            background: "#111827",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #1F2937",
          }}
        >
          <PreviewPanel />
        </div>

        {/* Inspector */}

        <div
          style={{
            background: "#111827",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #1F2937",
          }}
        >
          <InspectorPanel />
        </div>
      </div>

      {/* Timeline */}

      <div
        style={{
          borderTop: "1px solid #1F2937",
          background: "#111827",
          overflow: "hidden",
        }}
      >
        <TimelinePanel />
      </div>
    </div>
  );
}