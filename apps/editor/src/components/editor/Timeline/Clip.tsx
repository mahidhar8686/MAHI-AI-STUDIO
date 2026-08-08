import { useState } from "react";
import { useMediaStore } from "../../../store/mediaStore";

interface Props {
  id: string;
  title: string;
  start: number;
  duration: number;
}

export default function Clip({
  id,
  title,
  start,
  duration,
}: Props) {
  const zoom = useMediaStore((s) => s.zoom);

  const moveClip = useMediaStore((s) => s.moveClip);
  const resizeClip = useMediaStore((s) => s.resizeClip);

  const selectedClip = useMediaStore((s) => s.selectedClip);
  const selectClip = useMediaStore((s) => s.selectClip);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const selected = selectedClip === id;

  return (
    <div
      onMouseDown={(e) => {
        if (resizing || e.button !== 0) return;

        e.preventDefault();
        e.stopPropagation();

        const previousUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = "none";

        selectClip(id);

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

          moveClip(id, nextStart);
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

        cursor: dragging
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
      <span
        style={{
          width: "100%",

          overflow: "hidden",

          whiteSpace: "nowrap",

          textOverflow: "ellipsis",

          padding: "0 10px",

          textAlign: "center",

          pointerEvents: "none",
        }}
      >
        🎬 {title}
      </span>

      {/* LEFT HANDLE */}

      <div
        style={{
          position: "absolute",

          left: 0,

          top: 0,

          width: 6,

          height: "100%",

          background:
            "rgba(255,255,255,.35)",

          cursor: "ew-resize",
        }}
      />

      {/* RIGHT HANDLE */}

      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const previousUserSelect = document.body.style.userSelect;
          document.body.style.userSelect = "none";

          setResizing(true);

          const startX = e.clientX;
          const original = duration;

          const move = (ev: MouseEvent) => {
            const delta = ev.clientX - startX;
            const value = original + Math.round(delta / zoom);

            resizeClip(id, Math.max(1, value));
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

          cursor: "ew-resize",
        }}
      />
    </div>
  );
}