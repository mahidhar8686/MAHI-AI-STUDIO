import { create } from "zustand";

import type { EditorTool } from "../types/editor";

interface EditorStore {
  projectName: string;
  selectedTool: EditorTool;
  status: string;
  isSaved: boolean;
  setProjectName: (name: string) => void;
  setSelectedTool: (tool: EditorTool) => void;
  setStatus: (status: string) => void;
  setSaved: (saved: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  projectName: "Untitled project",
  selectedTool: "select",
  status: "Ready",
  isSaved: true,
  setProjectName: (projectName) => set({ projectName }),
  setSelectedTool: (selectedTool) => set({ selectedTool }),
  setStatus: (status) => set({ status }),
  setSaved: (isSaved) => set({ isSaved }),
}));
