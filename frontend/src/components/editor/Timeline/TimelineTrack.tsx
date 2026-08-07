import Clip from "./Clip";
import { useMediaStore } from "../../../store/mediaStore";

interface Props {
  title: string;
  track: number;
}

export default function TimelineTrack({
  title,
  track,
}: Props) {
  const files = useMediaStore((s) => s.files);
  const timeline = useMediaStore((s) => s.timeline);
  const addClip = useMediaStore((s) => s.addClip);
  const zoom = useMediaStore((s) => s.zoom);

  const clips = timeline
    .filter((clip) => clip.track === track)
    .sort((a, b) => a.start - b.start);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        minHeight: 70,
        borderBottom: "1px solid #374151",
      }}
    >
      {/* Track Name */}

      <div
        style={{
          background: "#1F2937",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          paddingLeft: 15,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      {/* Timeline */}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          const mediaId =
            e.dataTransfer.getData("media-id");

          const media = files.find(
            (f) => f.id === mediaId
          );

          if (!media) return;

          const rect =
            e.currentTarget.getBoundingClientRect();

          const x = e.clientX - rect.left;

          const start = Math.max(
            0,
            Math.round((x - 20) / zoom)
          );

          addClip(
            {
              ...media,
            },
            track
          );

          // Next version will place clip at drop position
        }}
        style={{
          position: "relative",
          minHeight: 70,
          background: "#0F172A",
          overflowX: "auto",
        }}
      >
        {/* Grid */}

        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * zoom + 20,
              top: 0,
              width: 1,
              height: "100%",
              background: "#1F2937",
            }}
          />
        ))}

        {/* Empty */}

        {clips.length === 0 && (
          <div
            style={{
              color: "#6B7280",
              padding: 20,
            }}
          >
            Drag media here...
          </div>
        )}

        {/* Clips */}

        {clips.map((clip) => (
          <Clip
            key={clip.id}
            id={clip.id}
            title={clip.mediaName}
            start={clip.start}
            duration={clip.duration}
          />
        ))}
      </div>
    </div>
  );
}