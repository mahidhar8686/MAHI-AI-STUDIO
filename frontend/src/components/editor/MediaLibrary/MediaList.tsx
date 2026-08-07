import { useMediaStore } from "../../../store/mediaStore";

export default function MediaList() {
  const files = useMediaStore((s) => s.files);
  const selectFile = useMediaStore((s) => s.selectFile);

  if (files.length === 0) {
    return (
      <div
        style={{
          color: "#9CA3AF",
          textAlign: "center",
          marginTop: 30,
        }}
      >
        No media imported
      </div>
    );
  }

  return (
    <div>
      {files.map((file) => (
        <div
          key={file.id}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("media-id", file.id)
          }
          onClick={() => selectFile(file)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#1F2937",
            color: "#fff",
            padding: 12,
            borderRadius: 8,
            marginBottom: 10,
            cursor: "pointer",
            border: "1px solid #374151",
          }}
        >
          <div style={{ fontSize: 24 }}>
            {file.type.startsWith("video")
              ? "🎬"
              : file.type.startsWith("audio")
              ? "🎵"
              : "🖼️"}
          </div>

          <div
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {file.name}
            </div>

            <div
              style={{
                color: "#9CA3AF",
                fontSize: 12,
              }}
            >
              {file.type}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}