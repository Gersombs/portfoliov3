import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "2rem", background: "#08090d", color: "#f7f6f2", textAlign: "center" }}>
      <div>
        <p style={{ color: "#77a8ff", fontFamily: "var(--font-geist-mono)", fontSize: ".7rem", letterSpacing: ".08em" }}>ERROR / 404</p>
        <h1 style={{ margin: "1rem 0", fontSize: "clamp(3rem, 12vw, 7rem)", letterSpacing: "-.07em", lineHeight: ".9" }}>Este espacio aún no existe.</h1>
        <Link href="/" style={{ display: "inline-block", marginTop: "1rem", padding: ".9rem 1.2rem", border: "1px solid rgba(255,255,255,.2)", borderRadius: "999px" }}>Volver al portafolio</Link>
      </div>
    </main>
  );
}
