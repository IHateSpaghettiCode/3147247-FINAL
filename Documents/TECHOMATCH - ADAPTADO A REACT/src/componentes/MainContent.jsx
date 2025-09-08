import React from "react";
import CareerCards from "./CareerCards"; 
import styles from "../styles/App.module.css";

function MainContent() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.card}>
        <h2>Novedades</h2>
        <div className={styles.subcard}>Oportunidades de las TIC 2025</div>
        <div className={styles.subcard}>Nuevo llamado jóvenes a la E 2025</div>
      </div>

      <div className={styles.card}>
        <h2>¿Quiénes somos?</h2>
        <p>
          En EduMatch creemos que cada persona tiene un camino único hacia su futuro profesional.
          Por eso, creamos una plataforma que te ayuda a descubrir qué estudiar, basándonos en ti:
          tus conocimientos, tus intereses y lo que te apasiona.
        </p>
        <p>
          A través de un formulario interactivo y dinámico, recogemos información clave sobre ti y la transformamos en recomendaciones de carreras y universidades que realmente se ajustan a tu perfil.
        </p>
        <p>
          No elegimos por ti. Te damos las herramientas para que tú tomes decisiones informadas, con opciones alineadas a tu potencial y metas.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Eventos Universitarios</h2>
        <div className={styles.subcard}>
          <strong>Universidad del Rosario</strong><br />
          Más allá de las finanzas
        </div>
        <div className={styles.subcard}>
          <strong>Universidad del Rosario</strong><br />
          Webinar Gratuito y Certificable <br />
          Auditoría en Salud: el futuro está en tus manos
        </div>
      </div>

      <CareerCards />
    </main>
  );
}

export default MainContent;
