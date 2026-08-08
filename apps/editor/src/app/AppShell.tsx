import { useEffect } from "react";
import AppRouter from "../routes/AppRouter";
import { loadProject, restoreMediaBlobs } from "../services/projectPersistence";
import { useEditorStore } from "../stores/editorStore";

export default function AppShell() {
  const isSaved = useEditorStore((state) => state.isSaved);
  const setStatus = useEditorStore((state) => state.setStatus);

  useEffect(() => {
    const init = async () => {
      setStatus("Restoring project...");
      const result = loadProject();
      if (result.restored) {
        setStatus("Restoring media...");
        await restoreMediaBlobs();
        setStatus("Project restored");
      }
    };
    init();
  }, [setStatus]);

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
