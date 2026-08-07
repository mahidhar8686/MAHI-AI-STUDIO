import MainLayout from "../components/layout/MainLayout";

const cards = [
  "Continue Editing",
  "Recent Projects",
  "GPU Usage",
  "Storage",
  "AI Models",
  "Recent Exports",
];

export default function Dashboard() {
  return (
    <MainLayout>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          marginTop: 25,
        }}
      >
        {cards.map((card) => (
          <div
            key={card}
            style={{
              background: "#1F2937",
              borderRadius: 12,
              padding: 25,
              minHeight: 160,
            }}
          >
            <h3>{card}</h3>
            <p>Coming soon...</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}