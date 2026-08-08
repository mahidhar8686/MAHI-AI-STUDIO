import { useEffect, useRef } from "react";
import { useMediaStore } from "../../../store/mediaStore";
import { useEditorStore } from "../../../stores/editorStore";

interface Props {
  duration: number;
  setDuration: (value: number) => void;
}

/**
 * Renders the selected media inside the preview canvas.
 *
 * Core playback sync (play / pause / seek) is preserved from the
 * original implementation.  Added: previewFit (object-fit), previewVolume,
 * and native controls removed in favour of custom PlaybackControls.
 */
export default function VideoPlayer({
  duration: _duration,
  setDuration,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const selected = useMediaStore((s) => s.selected);
  const isPlaying = useMediaStore((s) => s.isPlaying);
  const currentTime = useMediaStore((s) => s.currentTime);
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime);

  const previewFit = useEditorStore((s) => s.previewFit);
  const previewVolume = useEditorStore((s) => s.previewVolume);

  const fitMap = {
    contain: "contain" as const,
    cover: "cover" as const,
    fill: "fill" as const,
  };
  const objectFit = fitMap[previewFit] ?? "contain";

  // ── Play / Pause ──────────────────────────────────────────────
  useEffect(() => {
    const el = isPlaying ? videoRef.current ?? audioRef.current : null;
    if (!el) return;
    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isPlaying]);

  // ── Seek ────────────────────────────────────────────────────
  useEffect(() => {
    const el = videoRef.current ?? audioRef.current;
    if (!el) return;
    if (Math.abs(el.currentTime - currentTime) > 0.1) {
      el.currentTime = currentTime;
    }
  }, [currentTime]);

  // ── Volume ──────────────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = previewVolume;
    if (audioRef.current) audioRef.current.volume = previewVolume;
  }, [previewVolume]);

  // ── No media ────────────────────────────────────────────────
  if (!selected) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-slate-400">
        <div>
          <div className="mb-2 text-3xl">📺</div>
          <p className="text-xs">
            No media selected. Import a file to preview it here.
          </p>
        </div>
      </div>
    );
  }

  // ── Video ───────────────────────────────────────────────────
  if (selected.type.startsWith("video")) {
    return (
      <video
        ref={videoRef}
        src={selected.url}
        controls={false}
        onTimeUpdate={(e) =>
          setCurrentTime((e.target as HTMLVideoElement).currentTime)
        }
        onLoadedMetadata={(e) =>
          setDuration((e.target as HTMLVideoElement).duration)
        }
        style={{
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
    );
  }

  // ── Image ───────────────────────────────────────────────────
  if (selected.type.startsWith("image")) {
    return (
      <img
        src={selected.url}
        alt={selected.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
    );
  }

  // ── Audio ───────────────────────────────────────────────────
  if (selected.type.startsWith("audio")) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-100">
        <div className="text-center">
          <div className="mb-2 text-3xl">🎵</div>
          <p className="text-sm font-medium">{selected.name}</p>
        </div>
        <audio
          ref={audioRef}
          src={selected.url}
          controls={false}
          onTimeUpdate={(e) =>
            setCurrentTime((e.target as HTMLAudioElement).currentTime)
          }
          onLoadedMetadata={(e) =>
            setDuration((e.target as HTMLAudioElement).duration)
          }
          style={{ display: "none" }}
        />
      </div>
    );
  }

  // ── Fallback ────────────────────────────────────────────────
  return (
    <div className="flex h-full w-full items-center justify-center p-4 text-center text-slate-400">
      <p>Unsupported media type: {selected.type}</p>
    </div>
  );
}
