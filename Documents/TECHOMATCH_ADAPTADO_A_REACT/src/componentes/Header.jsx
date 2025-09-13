import React from "react";
import logo from "/edumatch.png";
import styles from "../styles/App.module.css";
import { useAuth } from "../context/AuthContext"; // 👈 Importamos el contexto

function Header() {
  const { user, logout } = useAuth(); // 👈 Obtenemos usuario y la función logout

  return (
    <header className={styles.mainHeader}>
      {/* Botón menú hamburguesa */}
      <label htmlFor="btnNav" className={styles.btnNav}>
        <i className="fas fa-bars"></i>
      </label>
      <input type="checkbox" id="btnNav" />

      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar" />
        <i className="fas fa-search"></i>
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="logo" className={styles.logoIcon} />
        </a>
      </div>

      {/* Menú lateral */}
      <nav className="sideNav">
        <ul className={styles.navigation}>
          {/* Si NO hay usuario → solo mostrar login */}
          {!user && (
            <li>
              <a href="/login">Inicia sesión</a>
            </li>
          )}

          {/* Si hay usuario → mostrar opciones adicionales */}
          {user && (
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
                {/* Botón cerrar sesión */}
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
