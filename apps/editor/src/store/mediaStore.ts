import { create } from "zustand";
import { useEditorStore } from "../stores/editorStore";
import { deleteMedia } from "../services/mediaStorage";

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  available?: boolean;
}

export interface TimelineClip {
  id: string;

  mediaId: string;
  mediaName: string;

  track: number;

  start: number;
  duration: number;

  selected: boolean;

  locked: boolean;

  color: string;
}

interface MediaStore {
  // ==========================
  // MEDIA LIBRARY
  // ==========================

  files: MediaFile[];
  selected?: MediaFile;
  mediaUrls: Record<string, string>;

  addFile: (file: MediaFile) => void;

  selectFile: (file: MediaFile) => void;

  setMediaUrl: (mediaId: string, url: string) => void;

  clearMediaUrl: (mediaId: string) => void;

  removeFile: (mediaId: string) => Promise<
    | { ok: true; clipsRemoved: number; idbError?: string }
    | { ok: false; needsConfirmation: true; clipCount: number }
  >;

  removeMediaWithClips: (mediaId: string) => Promise<
    { ok: true; clipsRemoved: number; idbError?: string }
  >;

  // ==========================
  // TIMELINE
  // ==========================

  timeline: TimelineClip[];

  selectedClip?: string;

  addClip: (
    media: MediaFile,
    track: number,
    start?: number
  ) => void;

  moveClip: (
    id: string,
    start: number
  ) => void;

  resizeClip: (
    id: string,
    duration: number
  ) => void;

  trimClip: (
    id: string,
    start: number,
    duration: number
  ) => void;

  selectClip: (
    id: string
  ) => void;

  splitClip: (
    id: string,
    position: number
  ) => void;

  deleteClip: (
    id: string
  ) => void;

  toggleLock: (
    id: string
  ) => void;

  // ==========================
  // PLAYBACK
  // ==========================

  playhead: number;

  currentTime: number;

  isPlaying: boolean;

  play: () => void;

  pause: () => void;

  stop: () => void;

  setPlayhead: (
    value: number
  ) => void;

  setCurrentTime: (
    value: number
  ) => void;

  // ==========================
  // TIMELINE
  // ==========================

  zoom: number;

  zoomIn: () => void;

  zoomOut: () => void;
}

export const useMediaStore =
  create<MediaStore>((set, get) => ({
    // ==========================
    // INITIAL STATE
    // ==========================

    files: [],

    selected: undefined,

    mediaUrls: {},

    timeline: [],

    selectedClip: undefined,

    playhead: 0,

    currentTime: 0,

    isPlaying: false,

    zoom: 40,
        // ==========================
    // MEDIA LIBRARY
    // ==========================

    addFile: (file) => {
      set((state) => ({
        files: [...state.files, file],
      }));

      useEditorStore.getState().markUnsaved();
    },

    selectFile: (file) =>
      set({
        selected: file,
      }),

    setMediaUrl: (mediaId, url) =>
      set((state) => ({
        mediaUrls: { ...state.mediaUrls, [mediaId]: url },
      })),

    clearMediaUrl: (mediaId) =>
      set((state) => {
        const existing = state.mediaUrls[mediaId];
        if (existing) {
          try {
            URL.revokeObjectURL(existing);
          } catch {
            // ignore
          }
        }
        const next = { ...state.mediaUrls };
        delete next[mediaId];
        return { mediaUrls: next };
      }),

    removeFile: async (mediaId) => {
      const state = get();
      const clipCount = state.timeline.filter((c) => c.mediaId === mediaId).length;

      if (clipCount > 0) {
        return { ok: false as const, needsConfirmation: true, clipCount };
      }

      const existing = state.mediaUrls[mediaId];
      if (existing) {
        try {
          URL.revokeObjectURL(existing);
        } catch {
          // ignore
        }
      }

      const nextUrls = { ...state.mediaUrls };
      delete nextUrls[mediaId];

      set({
        files: state.files.filter((f) => f.id !== mediaId),
        mediaUrls: nextUrls,
        selected:
          state.selected?.id === mediaId ? undefined : state.selected,
      });

      useEditorStore.getState().markUnsaved();

      const idbResult = await deleteMedia(mediaId);

      return {
        ok: true as const,
        clipsRemoved: 0,
        idbError: idbResult.error,
      };
    },

    removeMediaWithClips: async (mediaId) => {
      const state = get();
      const existing = state.mediaUrls[mediaId];
      if (existing) {
        try {
          URL.revokeObjectURL(existing);
        } catch {
          // ignore
        }
      }

      const nextUrls = { ...state.mediaUrls };
      delete nextUrls[mediaId];

      const clipsToRemove = state.timeline.filter((c) => c.mediaId === mediaId);
      const removedIds = new Set(clipsToRemove.map((c) => c.id));

      set({
        files: state.files.filter((f) => f.id !== mediaId),
        mediaUrls: nextUrls,
        selected:
          state.selected?.id === mediaId ? undefined : state.selected,
        selectedClip:
          state.selectedClip && removedIds.has(state.selectedClip)
            ? undefined
            : state.selectedClip,
        timeline: state.timeline.filter((c) => c.mediaId !== mediaId),
      });

      useEditorStore.getState().markUnsaved();

      const idbResult = await deleteMedia(mediaId);

      return {
        ok: true as const,
        clipsRemoved: clipsToRemove.length,
        idbError: idbResult.error,
      };
    },

    // ==========================
    // PLAYBACK
    // ==========================

    play: () =>
      set({
        isPlaying: true,
      }),

    pause: () =>
      set({
        isPlaying: false,
      }),

    stop: () =>
      set({
        isPlaying: false,
        currentTime: 0,
        playhead: 0,
      }),

    setCurrentTime: (value) =>
      set((state) => ({
        currentTime: value,
        playhead: value * state.zoom,
      })),

    setPlayhead: (value) =>
      set((state) => ({
        playhead: Math.max(0, value),
        currentTime: Math.max(0, value / state.zoom),
      })),

    // ==========================
    // TIMELINE
    // ==========================

    addClip: (
      media,
      track,
      start = 0
    ) => {
      set((state) => ({
        timeline: [
          ...state.timeline,
          {
            id: crypto.randomUUID(),

            mediaId: media.id,

            mediaName: media.name,

            track,

            start,

            duration: 5,

            selected: false,

            locked: false,

            color: "#2563EB",
          },
        ],
      }));

      useEditorStore.getState().markUnsaved();
    },

    selectClip: (id) =>
      set((state) => ({
        selectedClip: id,

        timeline: state.timeline.map((clip) => ({
          ...clip,
          selected: clip.id === id,
        })),
      })),
          // ==========================
    // MOVE CLIP
    // ==========================

    moveClip: (id, start) => {
      set((state) => ({
        timeline: state.timeline.map((clip) =>
          clip.id === id
            ? {
                ...clip,
                start: Math.max(0, start),
              }
            : clip
        ),
      }));

      useEditorStore.getState().markUnsaved();
    },

    // ==========================
    // RESIZE CLIP
    // ==========================

    resizeClip: (id, duration) => {
      set((state) => ({
        timeline: state.timeline.map((clip) =>
          clip.id === id
            ? {
                ...clip,
                duration: Math.max(1, duration),
              }
            : clip
        ),
      }));

      useEditorStore.getState().markUnsaved();
    },

    // ==========================
    // TRIM CLIP
    // ==========================

    trimClip: (id, start, duration) => {
      set((state) => ({
        timeline: state.timeline.map((clip) =>
          clip.id === id
            ? {
                ...clip,
                start: Math.max(0, start),
                duration: Math.max(1, duration),
              }
            : clip
        ),
      }));

      useEditorStore.getState().markUnsaved();
    },

    // ==========================
    // SPLIT CLIP
    // ==========================

    splitClip: (id, position) => {
      const state = get();

      const clip = state.timeline.find(
        (c) => c.id === id
      );

      if (!clip) return;

      if (
        position <= 0 ||
        position >= clip.duration
      )
        return;

      const left: TimelineClip = {
        ...clip,
        duration: position,
      };

      const right: TimelineClip = {
        ...clip,
        id: crypto.randomUUID(),
        start: clip.start + position,
        duration: clip.duration - position,
        selected: false,
      };

      set({
        timeline: [
          ...state.timeline.filter(
            (c) => c.id !== id
          ),
          left,
          right,
        ],
        selectedClip: left.id,
      });

      useEditorStore.getState().markUnsaved();
    },

    // ==========================
    // DELETE CLIP
    // ==========================

    deleteClip: (id) => {
      set((state) => ({
        timeline: state.timeline.filter(
          (clip) => clip.id !== id
        ),

        selectedClip:
          state.selectedClip === id
            ? undefined
            : state.selectedClip,
      }));

      useEditorStore.getState().markUnsaved();
    },

    // ==========================
    // LOCK / UNLOCK
    // ==========================

    toggleLock: (id) => {
      set((state) => ({
        timeline: state.timeline.map((clip) =>
          clip.id === id
            ? {
                ...clip,
                locked: !clip.locked,
              }
            : clip
        ),
      }));

      useEditorStore.getState().markUnsaved();
    },
          // ==========================
    // ZOOM
    // ==========================

    zoomIn: () =>
      set((state) => ({
        zoom: Math.min(120, state.zoom + 10),
      })),

    zoomOut: () =>
      set((state) => ({
        zoom: Math.max(20, state.zoom - 10),
      })),

}));