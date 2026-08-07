import { useEffect, useRef } from "react";
import { useMediaStore } from "../../../store/mediaStore";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const selected = useMediaStore((s) => s.selected);
  const isPlaying = useMediaStore((s) => s.isPlaying);
  const currentTime = useMediaStore((s) => s.currentTime);
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime);

  // Play / Pause
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Seek
  useEffect(() => {
    if (!videoRef.current) return;

    if (
      Math.abs(videoRef.current.currentTime - currentTime) > 0.1
    ) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  if (!selected) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          color: "#9CA3AF",
          fontSize: 18,
        }}
      >
        📺 No media selected
      </div>
    );
  }

  if (selected.type.startsWith("video")) {
    return (
      <video
        ref={videoRef}
        src={selected.url}
        controls
        onTimeUpdate={(e) => {
          setCurrentTime(
            (e.target as HTMLVideoElement).currentTime
          );
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "#000",
        }}
      />
    );
  }

  if (selected.type.startsWith("image")) {
    return (
      <img
        src={selected.url}
        alt={selected.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    );
  }

  if (selected.type.startsWith("audio")) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <h3>{selected.name}</h3>

        <audio
          controls
          src={selected.url}
          style={{
            width: "80%",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        color: "#fff",
        padding: 20,
      }}
    >
      Unsupported media type
    </div>
  );
}