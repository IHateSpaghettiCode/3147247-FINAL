import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Carousel.module.css"; // Importamos estilos como módulo
import "/Banner2.png";
import "/banner3.png";

// Datos del carrusel
const data = [
  { Link: "https://cdn-3.expansion.mx/dims4/default/a60575a/2147483647/strip/true/crop/2121x1414+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fbe%2Fba%2F50a2f7784150ad7b162c10eeae28%2Fcomo-elegir-laptop-estudiante-universitario.jpg", Name: "Carreras TIC", Description: "¿Te interesa ingresar a alguna?" },
  { Link: "/Banner2.png", Name: "MBTI", Description: "Realiza nuestro test para saber que carrera va con tu personalidad." },
  { Link: "/banner3.png", Name: "¡Registrate!", Description: "Para tener recomendaciones personalizadas." }
];

export default function Carousel() {
  // Estado para mover el carrusel
  const [position, setPosition] = useState(0);

  // Estado que guarda el ancho de cada slide (se calcula dinámicamente)
  const [itemWidth, setItemWidth] = useState(0);

  // Referencias al contenedor principal y a los elementos internos
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  // 🖥️ Detectar tamaño de pantalla y actualizar ancho de los ítems
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setItemWidth(containerRef.current.offsetWidth); // ancho del contenedor
        setPosition(0); // reiniciar posición al redimensionar para evitar cortes
      }
    };

    handleResize(); // calcular al cargar
    window.addEventListener("resize", handleResize); // escuchar cambios de pantalla
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Límite máximo a la izquierda (última imagen)
  const MAX_LEFT = -(itemWidth * (data.length - 1));

  // 👉 Función para mover a la derecha
  const moveRight = () => {
    setPosition((prev) => (prev > MAX_LEFT ? prev - itemWidth : prev));
  };

  // 👉 Función para mover a la izquierda
  const moveLeft = () => {
    setPosition((prev) => (prev < 0 ? prev + itemWidth : prev));
  };

  // Aplicar la posición como variable CSS
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.setProperty("--positionNow", `${position}px`);
    }
  }, [position]);

  return (
    <div className={styles.content} ref={containerRef}>
      {/* Botón izquierdo */}
      <div className={styles.buttonLeft}>
        <span onClick={moveLeft}>&lt;</span>
      </div>

      {/* Carrusel principal */}
      <div className={styles.contentImages} ref={contentRef}>
        <div className={styles.contentAux}>
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.contentImagesItem}
              style={{ backgroundImage: `url(${item.Link})` }}
            >
              <div className={`${styles.itemContentInfo} ${styles.animation}`}>
                <p className={styles.nombre}>{item.Name}</p>
                <p className={styles.descripcion}>{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón derecho */}
      <div className={styles.buttonRight}>
        <span onClick={moveRight}>&gt;</span>
      </div>
    </div>
  );
}
