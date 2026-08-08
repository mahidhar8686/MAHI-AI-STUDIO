import { create } from "zustand";

import type { EditorTool } from "../types/editor";

export type SaveState = "saved" | "unsaved" | "saving" | "failed";

export type EditorPanelTool =
  | "media"
  | "audio"
  | "text"
  | "stickers"
  | "effects"
  | "filters"
  | "transitions"
  | "captions"
  | "ai";

interface EditorStore {
  projectName: string;
  selectedTool: EditorTool;
  activePanelTool: EditorPanelTool;
  setActivePanelTool: (tool: EditorPanelTool) => void;
  status: string;
  isSaved: boolean;
  saveState: SaveState;
  setProjectName: (name: string) => void;
  setSelectedTool: (tool: EditorTool) => void;
  setStatus: (status: string) => void;
  setSaved: (saved: boolean) => void;
  setSaveState: (state: SaveState) => void;
  markUnsaved: () => void;

  // ==========================
  // PREVIEW UI STATE
  // ==========================
  previewFit: "contain" | "cover" | "fill";
  isFullscreen: boolean;
  previewVolume: number;
  setPreviewFit: (mode: "contain" | "cover" | "fill") => void;
  setFullscreen: (value: boolean) => void;
  setPreviewVolume: (value: number) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  projectName: "Untitled project",
  selectedTool: "select",
  activePanelTool: "media",
  setActivePanelTool: (activePanelTool) => set({ activePanelTool }),
  status: "Ready",
  isSaved: true,
  saveState: "saved",

  setProjectName: (projectName) =>
    set({
      projectName,
      isSaved: false,
      saveState: "unsaved",
    }),

  setSelectedTool: (selectedTool) => set({ selectedTool }),

  setStatus: (status) => set({ status }),

  setSaved: (isSaved) =>
    set({
      isSaved,
      saveState: isSaved ? "saved" : "unsaved",
    }),

  setSaveState: (saveState) =>
    set({
      saveState,
      isSaved: saveState === "saved",
    }),

  markUnsaved: () =>
    set({
      isSaved: false,
      saveState: "unsaved",
    }),

  // ==========================
  // PREVIEW UI STATE DEFAULTS
  // ==========================
  previewFit: "contain",
  isFullscreen: false,
  previewVolume: 1,
  setPreviewFit: (mode) => set({ previewFit: mode }),
  setFullscreen: (value) => set({ isFullscreen: value }),
  setPreviewVolume: (value) => set({ previewVolume: value }),
}));
