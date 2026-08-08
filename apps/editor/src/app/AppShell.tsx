import { useEffect } from "react";
import AppRouter from "../routes/AppRouter";
import { loadProject } from "../services/projectPersistence";

export default function AppShell() {
  useEffect(() => {
    loadProject();
  }, []);

  return <AppRouter />;
}