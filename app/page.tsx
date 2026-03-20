export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Arial, sans-serif",
        background: "#f7f3eb",
        color: "#2f2a24",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          South Jersey Sourdough Share Server
        </h1>
        <p style={{ fontSize: "1rem", maxWidth: "40rem", lineHeight: 1.6 }}>
          This server exists to provide proper social sharing previews for South
          Jersey Sourdough product links.
        </p>
      </div>
    </main>
  );
}