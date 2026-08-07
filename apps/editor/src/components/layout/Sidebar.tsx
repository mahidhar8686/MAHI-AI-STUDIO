import { Link } from "react-router-dom";

const menus = [
  { name: "🏠 Dashboard", url: "/" },
  { name: "🎬 Video Editor", url: "/editor" },
  { name: "📂 Projects", url: "/projects" },
  { name: "📁 Media Library", url: "/media" },
  { name: "🤖 AI Hub", url: "/ai" },
  { name: "🎥 AI Video", url: "/video-ai" },
  { name: "🎤 Voice Studio", url: "/voice" },
  { name: "💬 Captions", url: "/captions" },
  { name: "🌍 Translation", url: "/translation" },
  { name: "🎨 Effects", url: "/effects" },
  { name: "🖼 Images", url: "/images" },
  { name: "📤 Export", url: "/export" },
  { name: "⚙️ Settings", url: "/settings" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        background: "#111827",
        padding: 20,
        borderRight: "1px solid #1F2937",
      }}
    >
      <h2>MAHI AI</h2>

      <div style={{ marginTop: 30 }}>
        {menus.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            style={{
              display: "block",
              padding: 12,
              marginBottom: 10,
              background: "#1F2937",
              borderRadius: 10,
              color: "white",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}