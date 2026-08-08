import type { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { useMediaStore } from "../../../store/mediaStore";

export default function UploadButton() {
  const addFile = useMediaStore((state) => state.addFile);
  const selectFile = useMediaStore((state) => state.selectFile);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    Array.from(files).forEach((file) => {
      const media = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      };

      addFile(media);

      // Automatically preview the last imported file
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
