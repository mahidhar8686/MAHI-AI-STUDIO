import { Lock, Unlock } from "lucide-react";
import { useMediaStore } from "../../../store/mediaStore";
import { useEditorStore } from "../../../stores/editorStore";
import { cn } from "../../../utils/cn";

/* --------------------------------------------------------------------------- */
/* Shared sub-sections                                                         */
/* --------------------------------------------------------------------------- */

function ReadOnlyRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md bg-slate-800/40 px-3 py-2">
      <span className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="text-xs text-slate-200">{value}</span>
    </div>
  );
}

function TransformSection() {
  return (
    <section>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Transform
      </p>
      <div className="space-y-1.5">
        <ReadOnlyRow label="Position" value="0, 0" />
        <ReadOnlyRow label="Scale" value="100%" />
        <ReadOnlyRow label="Rotation" value="0°" />
        <ReadOnlyRow label="Opacity" value="100%" />
      </div>
      <p className="mt-2 text-[9px] text-slate-600">
        Transform properties not yet adjustable
      </p>
    </section>
  );
}

function PlaybackSection() {
  const previewVolume = useEditorStore((s) => s.previewVolume);
  const setPreviewVolume = useEditorStore((s) => s.setPreviewVolume);

  return (
    <section>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Playback
      </p>
      <div className="space-y-2.5">
        <ReadOnlyRow label="Speed" value="1.0×" />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              Volume
            </span>
            <span className="text-xs text-slate-200">
              {Math.round(previewVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={previewVolume}
            onChange={(e) => setPreviewVolume(parseFloat(e.target.value))}
            className="w-full cursor-pointer"
            aria-label="Preview volume"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* Main inspector                                                              */
/* --------------------------------------------------------------------------- */

export default function InspectorPanel() {
  const selected = useMediaStore((s) => s.selected);
  const selectedClip = useMediaStore((s) => s.selectedClip);
  const timeline = useMediaStore((s) => s.timeline);
  const files = useMediaStore((s) => s.files);
  const toggleLock = useMediaStore((s) => s.toggleLock);
  const mediaUrls = useMediaStore((s) => s.mediaUrls);

  const clip = selectedClip
    ? timeline.find((c) => c.id === selectedClip)
    : undefined;

  const mediaForClip = clip
    ? files.find((f) => f.id === clip.mediaId)
    : undefined;

  return (
    <aside className="flex h-full flex-col bg-slate-900 p-4 text-slate-100">
      <h2 className="mb-4 text-xs font-semibold tracking-wide text-white">
        Inspector
      </h2>

      {/* --- Empty state --- */}
      {!selected && !clip && (
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center">
          <p className="text-xs text-slate-400">
            Select a media item or timeline clip to edit its properties.
          </p>
        </div>
      )}

      {/* --- Clip selected --- */}
      {clip && (
        <div className="space-y-5">
          {/* Clip properties */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Clip
            </p>
            <div className="space-y-1.5">
              <ReadOnlyRow label="Name" value={clip.mediaName} />
              <ReadOnlyRow
                label="Media Type"
                value={mediaForClip?.type ?? "Unknown"}
              />
              <ReadOnlyRow
                label="Start"
                value={`${clip.start.toFixed(2)}s`}
              />
              <ReadOnlyRow
                label="Duration"
                value={`${clip.duration.toFixed(2)}s`}
              />
              <ReadOnlyRow label="Track" value={`Track ${clip.track + 1}`} />

              <div className="flex items-center justify-between rounded-md bg-slate-800/40 px-3 py-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Locked
                </span>
                <button
                  type="button"
                  onClick={() => toggleLock(clip.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors",
                    clip.locked
                      ? "bg-red-600/10 text-red-300 hover:bg-red-600/20"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600",
                  )}
                  aria-label={clip.locked ? "Unlock clip" : "Lock clip"}
                >
                  {clip.locked ? (
                    <>
                      <Lock className="h-3 w-3" />
                      Yes
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3 w-3" />
                      No
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <TransformSection />
          <PlaybackSection />
        </div>
      )}

      {/* --- Media file selected (no clip) --- */}
      {selected && !clip && (
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Media
            </p>
            <div className="space-y-1.5">
              <ReadOnlyRow label="Name" value={selected.name} />
              <ReadOnlyRow label="Type" value={selected.type} />
              <div className="flex items-center justify-between rounded-md bg-slate-800/40 px-3 py-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  URL
                </span>
                <span
                  className="max-w-[140px] truncate text-xs text-slate-200"
                  title={mediaUrls[selected.id] ?? ""}
                >
                  {mediaUrls[selected.id] ?? ""}
                </span>
              </div>
            </div>
          </div>

          <TransformSection />
          <PlaybackSection />
        </div>
      )}
    </aside>
  );
}
