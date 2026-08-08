import { create } from "zustand";

import type {
  ClipSelection,
  TimelineDuration,
  TimelineTrack,
} from "../types/timeline";

interface TimelineStore {
  tracks: TimelineTrack[];
  selectedTrackId?: string;
  selection: ClipSelection;
  duration: TimelineDuration;

  setTracks: (tracks: TimelineTrack[]) => void;
  addTrack: (track: TimelineTrack) => void;
  removeTrack: (trackId: string) => void;
  selectTrack: (trackId?: string) => void;
  setSelection: (selection: Partial<ClipSelection>) => void;
  setDuration: (duration: TimelineDuration) => void;
  resetSelection: () => void;
}

export const useTimelineStore = create<TimelineStore>((set) => ({
  tracks: [],
  selectedTrackId: undefined,
  selection: {},
  duration: 0,

  setTracks: (tracks) => set({ tracks }),

  addTrack: (track) =>
    set((state) => ({
      tracks: [...state.tracks, track],
    })),

  removeTrack: (trackId) =>
    set((state) => ({
      tracks: state.tracks.filter((track) => track.id !== trackId),
      selectedTrackId:
        state.selectedTrackId === trackId ? undefined : state.selectedTrackId,
      selection:
        state.selection.trackId === trackId
          ? { ...state.selection, trackId: undefined, clipId: undefined }
          : state.selection,
    })),

  selectTrack: (selectedTrackId) => set({ selectedTrackId }),

  setSelection: (selection) =>
    set((state) => ({
      selection: {
        ...state.selection,
        ...selection,
      },
    })),

  setDuration: (duration) => set({ duration }),

  resetSelection: () =>
    set({
      selectedTrackId: undefined,
      selection: {},
    }),
}));
