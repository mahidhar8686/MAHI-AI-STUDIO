import type { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { useMediaStore } from "../../../store/mediaStore";
import { saveMedia } from "../../../services/mediaStorage";

export default function UploadButton() {
  const addFile = useMediaStore((state) => state.addFile);
  const setMediaUrl = useMediaStore((state) => state.setMediaUrl);
  const selectFile = useMediaStore((state) => state.selectFile);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    Array.from(files).forEach((file) => {
      const id = crypto.randomUUID();
      const blob = file.slice(0, file.size, file.type);
      const url = URL.createObjectURL(blob);

      const media = {
        id,
        name: file.name,
        type: file.type,
        available: true,
      };

      saveMedia(id, blob, {
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: new Date().toISOString(),
      }).catch(() => {
        // IDB save failed; media remains session-only with available=true
      });

      addFile(media);
      setMediaUrl(id, url);
      selectFile(media);
    });

    event.target.value = "";
  };

  return (
    <label className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-sky-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-sky-500">
      <Upload className="h-3.5 w-3.5" />
      <span>Import</span>

      <input
        hidden
        multiple
        type="file"
        accept="video/*,audio/*,image/*"
        onChange={handleUpload}
      />
    </label>
  );
}
