export default function InspectorPanel() {
  return (
    <section
      style={{
        background: "#1F2937",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        🎛 Inspector
      </h2>

      <hr />

      {[
        "Position",
        "Scale",
        "Rotation",
        "Opacity",
        "Speed",
      ].map((field) => (
        <div
          key={field}
          style={{ marginBottom: 15 }}
        >
          <label>{field}</label>

          <input
            style={{
              width: "100%",
              padding: 8,
              marginTop: 5,
            }}
          />
        </div>
      ))}
    </section>
  );
}