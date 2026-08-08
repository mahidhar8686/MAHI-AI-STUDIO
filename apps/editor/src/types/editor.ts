export type EditorTool = "select" | "trim" | "move";

export interface EditorStateSnapshot {
  selectedTool: EditorTool;
  status: string;
}
