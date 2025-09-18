import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/App.module.css";
import { useAuth } from "../context/AuthContext";

function Welcome() {
  const { user } = useAuth();

  return (
    <section className={styles.welcome}>
      <header>
        {user ? (
          <div style={{ textAlign: "center" }}>
            <p>
              Bienvenido <strong>{user.nombre_usuario}</strong>
              {user.role && (
                <span style={{ marginLeft: "10px", color: "#888" }}>
                  ({user.rol_nombre === "Administrador" ? "Administrador" : "Usuario"})
                </span>
              )}
            </p>
          </div>
        ) : (
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