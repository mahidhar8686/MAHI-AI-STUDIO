import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Editor from "../pages/Editor";
import Captions from "../pages/Captions";
import Effects from "../pages/Effects";
import Images from "../pages/Images";
import Export from "../pages/Export";
import Settings from "../pages/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/captions" element={<Captions />} />
        <Route path="/effects" element={<Effects />} />
        <Route path="/images" element={<Images />} />
        <Route path="/export" element={<Export />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
