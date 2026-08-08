import type { MediaFile, TimelineClip } from "../store/mediaStore";
import { useMediaStore } from "../store/mediaStore";
import { useEditorStore } from "../stores/editorStore";

export const PROJECT_STORAGE_KEY = "mahi-ai-studio:project:v1";
export const PROJECT_VERSION = 1;

export interface SaveResult {
  ok: boolean;
  error?: string;
}

export interface LoadResult {
  ok: boolean;
  restored: boolean;
  error?: string;
}

export function handleSaveProject(
  setSaveState: (state: "saved" | "unsaved" | "saving" | "failed") => void,
  setSaved: (saved: boolean) => void,
  setStatus: (status: string) => void
): SaveResult {
  setSaveState("saving");
  setStatus("Saving project...");

  const result = saveProject();

  if (result.ok) {
    setSaved(true);
    setStatus("Project saved");
  } else {
    setSaveState("failed");
    setStatus(`Save failed: ${result.error ?? "unknown error"}`);
  }

  return result;
}

interface PersistedProjectState {
  version: number;
  savedAt: string;
  zoom: number;
  project: {
    name: string;
    media: { files: MediaFile[] };
    timeline: { clips: TimelineClip[]; selectedClip?: string };
  };
}

export function saveProject(): SaveResult {
  try {
    const editor = useEditorStore.getState();
    const media = useMediaStore.getState();

    const state: PersistedProjectState = {
      version: PROJECT_VERSION,
      savedAt: new Date().toISOString(),
      zoom: media.zoom,
      project: {
        name: editor.projectName,
        media: { files: media.files },
        timeline: {
          clips: media.timeline,
          selectedClip: media.selectedClip,
        },
      },
    };

    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state));

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown storage error",
    };
  }
}

export function loadProject(): LoadResult {
  let raw: string | null;

  try {
    raw = localStorage.getItem(PROJECT_STORAGE_KEY);
  } catch (error) {
    return {
      ok: false,
      restored: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not read localStorage",
    };
  }

  if (raw === null) {
    return { ok: true, restored: false };
  }

  const parsed = parsePersistedProject(raw);

  if (!parsed) {
    useEditorStore.getState().setStatus("Saved project ignored");

    return {
      ok: false,
      restored: false,
      error: "Saved project data is invalid or incompatible",
    };
  }

  const validFiles = parsed.project.media.files.map((file) => {
    let available = true;
    try {
      new URL(file.url);
    } catch {
      available = false;
    }
    return { ...file, available };
  });

  useMediaStore.setState({
    files: validFiles,
    timeline: parsed.project.timeline.clips.map((clip) => ({
      ...clip,
      selected: clip.id === parsed.project.timeline.selectedClip,
    })),
    selectedClip: parsed.project.timeline.selectedClip,
    selected: undefined,
    playhead: 0,
    currentTime: 0,
    isPlaying: false,
    zoom: parsed.zoom,
  });

  const editor = useEditorStore.getState();

  editor.setProjectName(parsed.project.name);
  editor.setSaveState("saved");
  editor.setStatus("Project restored");

  return { ok: true, restored: true };
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidMediaFile(
  value: unknown
): value is MediaFile {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string" &&
    typeof value.url === "string"
  );
}

function isValidTimelineClip(
  value: unknown
): value is TimelineClip {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.mediaId === "string" &&
    typeof value.mediaName === "string" &&
    typeof value.track === "number" &&
    Number.isFinite(value.track) &&
    typeof value.start === "number" &&
    Number.isFinite(value.start) &&
    typeof value.duration === "number" &&
    Number.isFinite(value.duration) &&
    typeof value.selected === "boolean" &&
    typeof value.locked === "boolean"
  );
}

function parsePersistedProject(
  raw: string
): PersistedProjectState | null {
  let value: unknown;

  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(value)) return null;

  if (value.version !== PROJECT_VERSION) return null;

  const project = value.project;

  if (!isRecord(project)) return null;

  if (!isRecord(project.media)) return null;

  if (!isRecord(project.timeline)) return null;

  const name =
    typeof project.name === "string" &&
    project.name.length > 0
      ? project.name
      : "Untitled project";

  const rawZoom = typeof value.zoom === "number" && Number.isFinite(value.zoom) ? value.zoom : 40;
  const files = Array.isArray(project.media.files)
    ? project.media.files.filter(isValidMediaFile)
    : [];

  const clips = Array.isArray(project.timeline.clips)
    ? project.timeline.clips
        .filter(isValidTimelineClip)
        .map((clip) => ({
          ...clip,
          start: Math.max(0, clip.start),
          duration: Math.max(1, clip.duration),
          track: Math.max(0, Math.round(clip.track)),
        }))
    : [];

  const rawSelectedClip = project.timeline.selectedClip;

  const selectedClip =
    typeof rawSelectedClip === "string" &&
    clips.some((clip) => clip.id === rawSelectedClip)
      ? rawSelectedClip
      : undefined;

  return {
    version: PROJECT_VERSION,
    savedAt:
      typeof value.savedAt === "string" ? value.savedAt : "",
    zoom: rawZoom,
    project: {
      name,
      media: { files },
      timeline: { clips, selectedClip },
    },
  };
}
