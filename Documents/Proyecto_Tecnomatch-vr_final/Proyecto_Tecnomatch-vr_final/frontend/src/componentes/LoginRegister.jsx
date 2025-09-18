import React, { useRef } from "react";
import styles from "../styles/Login.module.css";
import background from "/Background.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

function LoginRegister() {
  const formularioLogin = useRef(null);
  const formularioRegister = useRef(null);
  const contenedorLoginRegister = useRef(null);
  const cajaTraseraLogin = useRef(null);
  const cajaTraseraRegister = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Animación y responsive
  const anchoPage = () => {
    if (window.innerWidth > 850) {
      cajaTraseraRegister.current.style.display = "block";
      cajaTraseraLogin.current.style.display = "block";
    } else {
      cajaTraseraRegister.current.style.display = "block";
      cajaTraseraRegister.current.style.opacity = "1";
      cajaTraseraLogin.current.style.display = "none";
      formularioLogin.current.style.display = "block";
      contenedorLoginRegister.current.style.left = "0px";
      formularioRegister.current.style.display = "none";
    }
  };

  const iniciarSesion = () => {
    if (window.innerWidth > 850) {
      formularioLogin.current.style.display = "block";
      contenedorLoginRegister.current.style.left = "10px";
      formularioRegister.current.style.display = "none";
      cajaTraseraRegister.current.style.opacity = "1";
      cajaTraseraLogin.current.style.opacity = "0";
    } else {
      formularioLogin.current.style.display = "block";
      contenedorLoginRegister.current.style.left = "0px";
      formularioRegister.current.style.display = "none";
      cajaTraseraRegister.current.style.display = "block";
      cajaTraseraLogin.current.style.display = "none";
    }
  };

  const register = () => {
    if (window.innerWidth > 850) {
      formularioRegister.current.style.display = "block";
      contenedorLoginRegister.current.style.left = "410px";
      formularioLogin.current.style.display = "none";
      cajaTraseraRegister.current.style.opacity = "0";
      cajaTraseraLogin.current.style.opacity = "1";
    } else {
      formularioRegister.current.style.display = "block";
      contenedorLoginRegister.current.style.left = "0px";
      formularioLogin.current.style.display = "none";
      cajaTraseraRegister.current.style.display = "none";
      cajaTraseraLogin.current.style.display = "block";
      cajaTraseraLogin.current.style.opacity = "1";
    }
  };

  React.useEffect(() => {
    anchoPage();
    window.addEventListener("resize", anchoPage);
    return () => window.removeEventListener("resize", anchoPage);
  }, []);

  // LOGIN con BD
const handleLogin = async (e) => {
  e.preventDefault();
  const correo = e.target.correo.value;
  const password = e.target.password.value;

  try {
    await login({ correo, password }); // Usa el contexto, que ya maneja el token y el usuario
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Error al iniciar sesión");
  }
};

  // REGISTER con BD y validación Gmail
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    if (!data.correo.endsWith("@gmail.com")) {
      alert("⚠️ Debes completar tu correo con @gmail.com");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/auth/register`, data);
      alert("✅ " + res.data.message);
      e.target.reset();
      iniciarSesion();
    } catch (err) {
      alert(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <main
      className={styles.loginRegister}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "25px 25px",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className={styles.contenedorTodo}>
        <div className={styles.cajaTrasera}>
          <div ref={cajaTraseraLogin} className={styles.cajaTraseraLogin}>
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button onClick={iniciarSesion}>Iniciar Sesión</button>
          </div>
          <div ref={cajaTraseraRegister} className={styles.cajaTraseraRegister}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button onClick={register}>Regístrarse</button>
          </div>
        </div>

        <div ref={contenedorLoginRegister} className={styles.contenedorLoginRegister}>
          {/* LOGIN */}
          <form ref={formularioLogin} onSubmit={handleLogin} className={styles.formularioLogin}>
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo" name="correo" required />
            <input type="password" placeholder="Contraseña" name="password" required />
            <button type="submit">Entrar</button>
          </form>

          {/* REGISTER */}
          <form ref={formularioRegister} onSubmit={handleRegister} className={styles.formularioRegister}>
            <h2>Regístrarse</h2>
            <input type="text" name="nombre_completo" placeholder="Nombre completo" required />
            <input type="text" name="nombre_usuario" placeholder="Usuario" required />
            <input type="email" name="correo" placeholder="Correo" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Regístrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginRegister;
// ...fin del archivo...