import { useEffect } from "react";
import AppRouter from "../routes/AppRouter";
import { loadProject } from "../services/projectPersistence";
import { useEditorStore } from "../stores/editorStore";

export default function AppShell() {
  const isSaved = useEditorStore((state) => state.isSaved);

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

  return <AppRouter />;
}
