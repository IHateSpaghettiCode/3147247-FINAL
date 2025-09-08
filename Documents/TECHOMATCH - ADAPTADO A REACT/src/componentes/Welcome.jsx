import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/App.module.css";
import { useAuth } from "../context/AuthContext"; // 🔹 usamos el contexto

function Welcome() {
  const { user, logout } = useAuth(); // 🔹 obtenemos usuario y logout

  return (
    <section className={styles.welcome}>
      <header>
        {/* Si hay usuario → mostrar saludo y botón */}
        {user ? (
          <div style={{ textAlign: "center"}}>
            <p>
              Bienvenido <strong>{user.username}</strong>
            </p>
          </div>
        ) : (
          /* Si NO hay usuario → mostrar link a login */
          <div style={{ textAlign: "center" }}>
            ¡Bienvenido al sistema <strong>EduMatch</strong>,{" "}
            <Link to="/login" className={styles.link}>
              inicia sesión
            </Link>{" "}
            para comenzar el viaje!
          </div>
        )}
      </header>
    </section>
  );
}

export default Welcome;
