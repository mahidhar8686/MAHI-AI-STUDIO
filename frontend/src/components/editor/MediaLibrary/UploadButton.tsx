import { ChangeEvent } from "react";
import { useMediaStore } from "../../../store/mediaStore";

export default function UploadButton() {
  const addFile = useMediaStore((state) => state.addFile);
  const selectFile = useMediaStore((state) => state.selectFile);

  const handleUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
    <label
      style={{
        display: "block",
        width: "100%",
        background: "#2563EB",
        color: "#fff",
        textAlign: "center",
        padding: "12px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        boxSizing: "border-box",
      }}
    >
      📂 Import Media

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