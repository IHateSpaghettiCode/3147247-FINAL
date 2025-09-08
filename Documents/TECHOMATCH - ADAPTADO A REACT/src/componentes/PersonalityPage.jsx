import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { personalities } from "../data/personalities";
import { recommendations } from "../data/recommendations"; // 👈 importamos tus carreras
import styles from  "../styles/styles_enfj.module.css";

import RecommendationsPopup from "./RecommendationsPopup";
import CareerPage from "../pages/CareerPage";

export default function PersonalityPage() {
  const { type } = useParams();
  const data = personalities[type];

  const [activeIndex, setActiveIndex] = useState(0);

  // popup y carrera seleccionada
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);

  // refs para animaciones
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeIndex, data]);

  if (!data) {
    return <h1>❌ Tipo de personalidad no encontrado</h1>;
  }

  // ✅ Si ya seleccionó una carrera, mostramos CareerPage
  if (selectedCareer) {
    return <CareerPage recommendation={selectedCareer} />;
  }

  return (
    <section className={styles["tab-layout"]}>
      {/* Columna texto */}
      <div className={styles["tab-layout-col"]}>
        <div className={styles["tab-layout-container"]}>
          <div className={styles["tab-container"]}>
            <div className={styles["tab-container-top"]}>
              <h1 className={styles["tab-layout-heading"]}>
                {data.code}
                <span className={styles["subtitle-text"]}>{data.subtitle}</span>
              </h1>

              {/* Tabs */}
              <div
                className={styles["filter-bar"]}
                style={{ backgroundColor: data.theme.accent }}
              >
                {["Descripcion", "Fortalezas", "Debilidades"].map((tab, i) => (
                  <button
                    key={i}
                    className={`${styles["filter-button"]} ${i === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className={styles["filter-button__p"]}>{tab}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido dinámico */}
            <div className={styles["tab-container-bottom"]}>
              <div className={styles["tab-content-wrap"]}>
                <div
                  ref={contentRef}
                  key={activeIndex}
                  className={styles["tab-content-item active"]}
                >
                  <h2 className={styles["tab-content__heading"]}>
                    {data.sections[activeIndex].heading}
                  </h2>
                  <p className={styles["content-p"]}>{data.sections[activeIndex].text}</p>
                </div>
              </div>

              {/* Botón que abre el popup */}
              <button
                className={styles["reco-button"]}
                onClick={() => setShowPopup(true)}
              >
                Ver recomendaciones
              </button>

              {/* Popup */}
              <RecommendationsPopup
                showPopup={showPopup}
                onClose={() => setShowPopup(false)}
                code={data.code}
                onSelectCareer={() => {
                  // 🔑 como en tu archivo hay solo UNA carrera por tipo
                  setSelectedCareer(recommendations[data.code]);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Columna imagen */}
      <div className={styles["tab-layout-col"]}>
        <div className={styles["tab-visual-wrap"]}>
          <div ref={imageRef} key={activeIndex} className={styles["tab-visual-item active"]}>
            <img src={data.images[activeIndex]} alt="" className={styles["tab-image"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
