import UploadButton from "./UploadButton";
import MediaList from "./MediaList";

export default function MediaLibrary() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        📂 Media Library
      </h2>

      <UploadButton />

      <div
        style={{
          marginTop: 20,
          flex: 1,
          overflowY: "auto",
        }}
      >
        <MediaList />
      </div>
    </div>
  );
}