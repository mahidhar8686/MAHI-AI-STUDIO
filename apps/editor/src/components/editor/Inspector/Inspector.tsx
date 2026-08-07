export default function Inspector() {
  return (
    <div
      style={{
        padding: 20,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2>🎛 Inspector</h2>

      <hr />

      {[
        "Position",
        "Scale",
        "Rotation",
        "Opacity",
        "Speed",
      ].map((item) => (
        <div
          key={item}
          style={{
            marginBottom: 15,
          }}
        >
          <label>{item}</label>

          <input
            style={{
              width: "100%",
              marginTop: 5,
              padding: 8,
            }}
          />
        </div>
      ))}
    </div>
  );
}