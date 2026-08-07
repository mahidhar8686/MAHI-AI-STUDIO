import UploadButton from "../MediaLibrary/UploadButton";
import MediaList from "../MediaLibrary/MediaList";

export default function MediaPanel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#111827",
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "15px 20px",
          borderBottom: "1px solid #1F2937",
          background: "#0F172A",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 18,
          }}
        >
          📂 Media Library
        </h2>
      </div>

      {/* Search */}

      <div
        style={{
          padding: 12,
        }}
      >
        <input
          placeholder="Search media..."
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #374151",
            background: "#1F2937",
            color: "#fff",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Upload */}

      <div
        style={{
          padding: "0 12px 12px",
        }}
      >
        <UploadButton />
      </div>

      {/* Media Files */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 12px 12px",
        }}
      >
        <MediaList />
      </div>
    </div>
  );
}