import React, { useRef } from "react"; 
import styles from "../styles/Login.module.css";
import background from "/Background.png";
import { useAuth } from "../context/AuthContext";  // 🔹 usamos el contexto
import { useNavigate } from "react-router-dom";    // 🔹 para redirigir

function LoginRegister() {
  const formularioLogin = useRef(null);
  const formularioRegister = useRef(null);
  const contenedorLoginRegister = useRef(null);
  const cajaTraseraLogin = useRef(null);
  const cajaTraseraRegister = useRef(null);

  const { login } = useAuth(); // función de login del contexto
  const navigate = useNavigate();

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

  // 🔹 Manejo del formulario de login
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.Usuario.value;
    const password = e.target.contrasena.value;

    // 🔹 usar la función del contexto
    login(username, password);

    // 🔹 redirigir al index si el login fue correcto
    navigate("/");
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
          {/* 🔹 LOGIN */}
          <form ref={formularioLogin} onSubmit={handleLogin} className={styles.formularioLogin}>
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Usuario" name="Usuario" />
            <input type="password" placeholder="Contraseña" name="contrasena" />
            <button type="submit">Entrar</button>
          </form>

          {/* 🔹 REGISTER */}
          <form ref={formularioRegister} className={styles.formularioRegister}>
            <h2>Regístrarse</h2>
            <input type="text" placeholder="Nombre completo" name="nombre_completo" />
            <input type="text" placeholder="Correo Electronico" name="correo" />
            <input type="text" placeholder="Usuario" name="usuario" />
            <input type="password" placeholder="Contraseña" name="contrasena" />
            <button>Regístrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginRegister;
