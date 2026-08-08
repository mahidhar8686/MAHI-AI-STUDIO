import { useEffect, useRef } from "react";
import { useMediaStore } from "../../../store/mediaStore";

export default function PlaybackEngine() {
  const playhead = useMediaStore((s) => s.playhead);
  const zoom = useMediaStore((s) => s.zoom);
  const selected = useMediaStore((s) => s.selected);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = playhead / zoom;
  }, [playhead, zoom]);

  if (!selected) return null;

  if (!selected.type.startsWith("video")) return null;

  return (
    <video
      ref={videoRef}
      src={selected.url}
      style={{ display: "none" }}
    />
  );
}