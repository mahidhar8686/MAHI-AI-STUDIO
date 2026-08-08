import { useEffect } from "react";
import { useMediaStore } from "../../../store/mediaStore";

import TimelineControls from "./TimelineControls";
import TimeRuler from "./TimeRuler";
import Playhead from "./Playhead";
import TimelineTrack from "./TimelineTrack";
import { Clapperboard, Music, Captions, Sparkles } from "lucide-react";

export default function Timeline() {
  const selectedClip = useMediaStore(
    (state) => state.selectedClip
  );

  const timeline = useMediaStore(
    (state) => state.timeline
  );

  const playhead = useMediaStore(
    (state) => state.playhead
  );

  const zoom = useMediaStore(
    (state) => state.zoom
  );

  const deleteClip = useMediaStore(
    (state) => state.deleteClip
  );

  const splitClip = useMediaStore(
    (state) => state.splitClip
  );

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Delete selected clip
      if (
        event.key === "Delete" &&
        selectedClip
      ) {
        deleteClip(selectedClip);
      }

      // Split selected clip at playhead
      if (
        event.key.toLowerCase() === "s" &&
        selectedClip
      ) {
        const clip = timeline.find(
          (c) => c.id === selectedClip
        );

        if (!clip) return;

        splitClip(
          selectedClip,
          playhead / zoom - clip.start
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    selectedClip,
    timeline,
    playhead,
    zoom,
    deleteClip,
    splitClip,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Controls */}

      <TimelineControls />

      {/* Time Ruler */}

      <TimeRuler />

      {/* Timeline */}

      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "auto",
        }}
      >
        {/* Playhead */}

        <Playhead />

        {/* Tracks */}

        <TimelineTrack
          title="Video Track 1"
          track={0}
          icon={Clapperboard}
        />

        <TimelineTrack
          title="Video Track 2"
          track={1}
          icon={Clapperboard}
        />

        <TimelineTrack
          title="Audio Track"
          track={2}
          icon={Music}
        />

        <TimelineTrack
          title="Captions Track"
          track={3}
          icon={Captions}
        />

        <TimelineTrack
          title="Effects Track"
          track={4}
          icon={Sparkles}
        />
      </div>

      {/* Footer */}

      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          background: "#0F172A",
          borderTop: "1px solid #374151",
          color: "#9CA3AF",
          fontSize: 12,
        }}
      >
        <span>Timeline Ready</span>

        <span>
          Delete = Remove Clip | S = Split Clip
        </span>
      </div>
    </div>
  );
}