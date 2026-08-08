import { useRef, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import PlaybackControls from "../VideoPlayer/PlaybackControls";

export default function PreviewPanel() {
  const [duration, setDuration] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="flex h-full flex-col bg-slate-900 text-slate-100">
      {/* Dark canvas — centered media in 16:9 aspect-ratio area */}
      <div ref={canvasRef} className="relative min-h-0 flex-1">
        <div className="flex h-full w-full items-center justify-center bg-black">
          <div className="relative aspect-video w-full max-w-full">
            <VideoPlayer
              duration={duration}
              setDuration={setDuration}
            />
          </div>
        </div>
      </div>

      {/* Custom playback bar */}
      <PlaybackControls duration={duration} canvasRef={canvasRef} />
    </aside>
  );
}
