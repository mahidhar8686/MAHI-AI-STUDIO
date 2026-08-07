import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Editor", path: "/editor" },
  { name: "Captions", path: "/captions" },
  { name: "Effects", path: "/effects" },
  { name: "Images", path: "/images" },
  { name: "AI Video", path: "/ai-video" },
  { name: "Voice", path: "/voice" },
  { name: "Audio", path: "/audio" },
  { name: "Export", path: "/export" },
  { name: "Settings", path: "/settings" },
];

export default function MainLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        height: "100vh",
        background: "#020617",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          background: "#111827",
          padding: 20,
          borderRight: "1px solid #1F2937",
        }}
      >
        <h2
          style={{
            marginBottom: 30,
            color: "#60A5FA",
          }}
        >
          MAHI AI STUDIO
        </h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "block",
              padding: "12px",
              marginBottom: 8,
              borderRadius: 8,
              textDecoration: "none",
              color:
                location.pathname === item.path
                  ? "#60A5FA"
                  : "#E5E7EB",
              background:
                location.pathname === item.path
                  ? "#1E293B"
                  : "transparent",
            }}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            height: 70,
            background: "#111827",
            borderBottom: "1px solid #1F2937",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <h2>🎬 MAHI AI STUDIO</h2>

          <div
            style={{
              display: "flex",
              gap: 20,
              fontSize: 22,
            }}
          >
            🔔 👤 ⚙️
          </div>
        </header>

        <main
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}