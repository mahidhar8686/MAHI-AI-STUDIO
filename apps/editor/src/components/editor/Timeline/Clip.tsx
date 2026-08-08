import { useState } from "react";
import { useMediaStore } from "../../../store/mediaStore";
import { Film } from "lucide-react";
import {
  buildSnapTargets,
  snapTimelinePosition,
} from "../../../utils/timelineSnapping";

interface Props {
  id: string;
  title: string;
  start: number;
  duration: number;
  locked: boolean;
}

export default function Clip({
  id,
  title,
  start,
  duration,
  locked,
}: Props) {
  const zoom = useMediaStore((s) => s.zoom);
  const timeline = useMediaStore((s) => s.timeline);
  const playhead = useMediaStore((s) => s.playhead);

  const moveClip = useMediaStore((s) => s.moveClip);
  const resizeClip = useMediaStore((s) => s.resizeClip);
  const trimClip = useMediaStore((s) => s.trimClip);

  const selectedClip = useMediaStore((s) => s.selectedClip);
  const selectClip = useMediaStore((s) => s.selectClip);
  const toggleLock = useMediaStore((s) => s.toggleLock);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const selected = selectedClip === id;

  return (
    <div
      onMouseDown={(e) => {
        if (resizing || e.button !== 0) return;

        e.preventDefault();
        e.stopPropagation();

        selectClip(id);

        if (locked) return;

        const previousUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = "none";

        const startX = e.clientX;
        const originalStart = start;

        setDragging(true);

        const move = (ev: MouseEvent) => {
          const delta = ev.clientX - startX;
          const seconds = Math.round(delta / zoom);
          const nextStart = Math.max(
            0,
            originalStart + seconds
          );

          const targets = buildSnapTargets(
            id,
            timeline,
            playhead,
            zoom
          );

          const snapped = snapTimelinePosition({
            candidate: nextStart,
            targets,
            zoom,
          });

          moveClip(id, snapped);
        };

        const up = () => {
          setDragging(false);
          document.body.style.userSelect = previousUserSelect;

          window.removeEventListener(
            "mousemove",
            move
          );

          window.removeEventListener(
            "mouseup",
            up
          );
        };

        window.addEventListener(
          "mousemove",
          move
        );

        window.addEventListener(
          "mouseup",
          up
        );
      }}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      style={{
        position: "absolute",

        left: start * zoom + 20,

        top: 12,

        width: duration * zoom,

        height: 46,

        background: selected
          ? "#3B82F6"
          : "#2563EB",

        border: selected
          ? "2px solid #93C5FD"
          : "1px solid #1D4ED8",

        borderRadius: 8,

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#fff",

        fontWeight: 600,

        cursor: locked
          ? "default"
          : dragging
            ? "grabbing"
            : "grab",

        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",

        overflow: "hidden",

        boxSizing: "border-box",

        transition: dragging
          ? "none"
          : "0.1s",

        boxShadow: selected
          ? "0 0 12px rgba(59,130,246,.45)"
          : "none",
      }}
    >
      <div className="flex items-center justify-center gap-1.5 overflow-hidden px-2">
        <Film className="h-3 w-3 flex-shrink-0" />
        <span className="truncate text-xs font-medium">{title}</span>
      </div>

      {/* LEFT HANDLE */}

      <div
        onMouseDown={(e) => {
          if (e.button !== 0) return;

          if (locked) return;

          e.preventDefault();
          e.stopPropagation();

          const previousUserSelect = document.body.style.userSelect;
          document.body.style.userSelect = "none";

          selectClip(id);
          setResizing(true);

          const startX = e.clientX;
          const originalStart = start;
          const originalDuration = duration;

          const move = (ev: MouseEvent) => {
            const delta = ev.clientX - startX;
            const deltaSeconds = Math.round(delta / zoom);
            const nextStart = Math.max(
              0,
              originalStart + deltaSeconds
            );

            const targets = buildSnapTargets(
              id,
              timeline,
              playhead,
              zoom
            );

            const snapped = snapTimelinePosition({
              candidate: nextStart,
              targets,
              zoom,
            });

            const nextDuration = Math.max(
              1,
              originalStart + originalDuration - snapped
            );

            trimClip(id, snapped, nextDuration);
          };

          const up = () => {
            setResizing(false);
            document.body.style.userSelect = previousUserSelect;

            window.removeEventListener(
              "mousemove",
              move
            );

            window.removeEventListener(
              "mouseup",
              up
            );
          };

          window.addEventListener(
            "mousemove",
            move
          );

          window.addEventListener(
            "mouseup",
            up
          );
        }}
        style={{
          position: "absolute",

          left: 0,

          top: 0,

          width: 6,

          height: "100%",

          background:
            "rgba(255,255,255,.35)",

          cursor: locked
            ? "not-allowed"
            : "ew-resize",

          opacity: locked ? 0.4 : 1,
        }}
      />

      {/* RIGHT HANDLE */}

      <div
        onMouseDown={(e) => {
          if (e.button !== 0) return;

          if (locked) return;

          e.preventDefault();
          e.stopPropagation();

          const previousUserSelect = document.body.style.userSelect;
          document.body.style.userSelect = "none";

          selectClip(id);
          setResizing(true);

          const startX = e.clientX;
          const original = duration;

          const move = (ev: MouseEvent) => {
            const delta = ev.clientX - startX;
            const value = original + Math.round(delta / zoom);

            const end = start + value;

            const targets = buildSnapTargets(
              id,
              timeline,
              playhead,
              zoom
            );

            const snappedEnd = snapTimelinePosition({
              candidate: end,
              targets,
              zoom,
            });

            const snappedDuration = Math.max(
              1,
              snappedEnd - start
            );

            resizeClip(id, snappedDuration);
          };

          const up = () => {
            setResizing(false);
            document.body.style.userSelect = previousUserSelect;

            window.removeEventListener(
              "mousemove",
              move
            );

            window.removeEventListener(
              "mouseup",
              up
            );
          };

          window.addEventListener(
            "mousemove",
            move
          );

          window.addEventListener(
            "mouseup",
            up
          );
        }}
        style={{
          position: "absolute",

          right: 0,

          top: 0,

          width: 8,

          height: "100%",

          background:
            "rgba(255,255,255,.45)",

          cursor: locked
            ? "not-allowed"
            : "ew-resize",

          opacity: locked ? 0.4 : 1,
        }}
      />

      {/* LOCK BUTTON */}

      {selected && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleLock(id);
          }}
          className="absolute top-1 right-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/40 text-white transition-colors hover:bg-black/60"
          title={locked ? "Unlock clip" : "Lock clip"}
        >
          {locked ? (
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 018 0m-8 0v4h8v-4m-8 0H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-8 0h8" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}