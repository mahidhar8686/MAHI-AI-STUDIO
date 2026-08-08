import type { ElementType } from "react";
import Clip from "./Clip";
import { useMediaStore } from "../../../store/mediaStore";

interface Props {
  title: string;
  track: number;
  icon: ElementType;
}

export default function TimelineTrack({
  title,
  track,
  icon: Icon,
}: Props) {
  const files = useMediaStore((s) => s.files);
  const timeline = useMediaStore((s) => s.timeline);
  const addClip = useMediaStore((s) => s.addClip);
  const zoom = useMediaStore((s) => s.zoom);

  const clips = timeline
    .filter((clip) => clip.track === track)
    .sort((a, b) => a.start - b.start);

  return (
    <div className="grid min-h-[70px] grid-cols-[180px_1fr] border-b border-slate-800/80">
      {/* Track header */}
      <div className="flex items-center gap-2 bg-slate-800/90 px-3 text-xs font-semibold text-slate-200 backdrop-blur-sm">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span className="truncate">{title}</span>
      </div>

      {/* Timeline content area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          const mediaId = e.dataTransfer.getData("media-id");

          const media = files.find((f) => f.id === mediaId);

          if (!media) return;

          const rect = e.currentTarget.getBoundingClientRect();

          const x = e.clientX - rect.left;

          const dropStart = Math.max(
            0,
            Math.round((x - 20) / zoom)
          );

          addClip(
            { ...media },
            track,
            dropStart
          );
        }}
        className="relative min-h-[70px] overflow-x-auto bg-slate-900/95"
      >
        {/* Grid lines — left: i * zoom + 20 is PRESERVED */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-slate-800/60"
            style={{ left: i * zoom + 20 }}
          />
        ))}

        {/* Empty placeholder */}
        {clips.length === 0 && (
          <div className="flex h-full items-center justify-center p-4 text-xs text-slate-500">
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
            locked={clip.locked}
          />
        ))}
      </div>
    </div>
  );
}
