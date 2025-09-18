import React from "react";
import logo from "/edumatch.png";
import styles from "../styles/App.module.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.mainHeader}>
      <label htmlFor="btnNav" className={styles.btnNav}>
        <i className="fas fa-bars"></i>
      </label>
      <input type="checkbox" id="btnNav" />

      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar" />
        <i className="fas fa-search"></i>
      </div>

      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="logo" className={styles.logoIcon} />
        </a>
      </div>

      <nav className="sideNav">
        <ul className={styles.navigation}>
          {!user && (
            <li>
              <a href="/login">Inicia sesión</a>
            </li>
          )}

          {user && user.rol_nombre === "Administrador" && (
            <>
              <li>
                <a href="/User">Panel de control</a>
              </li>
              <li>
                <a href="/users">Gestión de usuarios</a>
              </li>
              <li>
                <a href="/careers">Gestión de carreras</a>
              </li>
              <li>
                <a href="/reports">Ver reportes</a>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}

          {user && user.rol_nombre !== "Administrador" && (
            <>
              <li>
                <a href="/User">Ver perfil</a>
              </li>
              <li>
                <a href="/Quiz/">Realizar test</a>
              </li>
              <li>
                <a href="/personality/:type">Revisar resultados</a>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;