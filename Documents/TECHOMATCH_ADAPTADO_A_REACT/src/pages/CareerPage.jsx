// CareerPage.jsx
import React from "react";
import styles from "../styles/styles_CareerPage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { recommendations } from "../data/recommendations"; // fallback si entra directo

export default function CareerPage() {
  const location = useLocation();
  const params = useParams();

  // 1️⃣ Si viene por navigate con state
  let rec = location.state?.recommendation;

  // 2️⃣ Fallback: si entra directo por URL, buscamos en recommendations usando slug
  if (!rec) {
    const programSlug = params.slug; // <- usamos slug
    for (const key of Object.keys(recommendations)) {
      const found = recommendations[key].find((c) => c.slug === programSlug);
      if (found) {
        rec = found;
        break;
      }
    }
  }

  if (!rec || !rec.program) return <div>Cargando...</div>;

  return (
    <div className={styles["career-page"]}>
      {/* SVG Blobs */}
      <svg className={styles["blob-left"]} viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="300" fill="#FFF7C7" />
      </svg>
      <svg className={styles["blob-right"]} viewBox="0 0 800 400" fill="none">
        <path
          d="M0 200 C150 50 350 350 800 200 L800 400 L0 400 Z"
          fill="#cfecef"
        />
      </svg>

      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <h1>{rec.university}</h1>
          <p>Página de programa: {rec.program}</p>
        </div>
        <nav className={styles.nav}>
          <a href="#about">Descripción</a>
          <a href="#curriculum">Plan</a>
          <a href="#inscripcion">Inscripción</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles["left-column"]}>
          <h2>
            {rec.program?.split(" ")[0]}{" "}
            <span>{rec.program?.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p>{rec.description}</p>

          <div className={styles.cards}>
            {rec.cards?.map((card, index) => (
              <Card key={index} label={card.label} value={card.value} />
            ))}
          </div>

          <div className={styles.buttons}>
            <a href="#inscripcion" className={styles["btn-primary"]}>
              Inscribirme
            </a>
            <a href="#programa" className={styles["btn-secondary"]}>
              Ver plan
            </a>
          </div>
        </section>

        <aside className={styles["right-column"]}>
          <div className={styles["objective-card"]}>
            <h3>Objetivo</h3>
            <p>{rec.objective}</p>
          </div>
          <div className={styles["image-wrapper"]}>
            <img src={rec.image} alt="Ilustración decorativa" />
          </div>
        </aside>
      </main>

      <footer className={styles.footer}>
        <span>© {rec.university}</span>
        <div>Contacto: </div>
      </footer>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className={styles.card}>
      <div className={styles["card-label"]}>{label}</div>
      <div className={styles["card-value"]}>{value}</div>
    </div>
  );
}
