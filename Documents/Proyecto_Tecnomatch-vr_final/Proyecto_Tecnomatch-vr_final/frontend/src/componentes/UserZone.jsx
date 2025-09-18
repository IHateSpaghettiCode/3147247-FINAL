import React, { useEffect, useState, useRef } from "react";
import style from "../styles/User.module.css";
import { useAuth } from "../context/AuthContext";

const UserZone = () => {
  const { user } = useAuth();

  const [historialCarreras, setHistorialCarreras] = useState([]);
  const [historialTests, setHistorialTests] = useState([]);
  const [ultimoMBTI, setUltimoMBTI] = useState(null);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const fileInputRef = useRef(null);

  const BACKEND_URL = "http://localhost:3000";

  // =======================
  // FOTO DE PERFIL
  // =======================
  useEffect(() => {
    if (!user) return;

    fetch(`${BACKEND_URL}/api/usuarios/${user.id_usuario}`)
      .then(res => res.json())
      .then(data => {
        if (data.usuario?.foto_perfil) setProfilePic(data.usuario.foto_perfil);
      })
      .catch(err => console.error("Error cargando foto de perfil:", err));
  }, [user]);

  const handleChangePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const res = await fetch(`${BACKEND_URL}/api/usuarios/${user.id_usuario}/foto`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ foto_perfil: base64data }),
        });
        if (!res.ok) throw new Error("Error subiendo foto");
        console.log("Foto subida correctamente");
      } catch (err) {
        console.error("Error subiendo foto de perfil:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  // =======================
  // HISTORIALES FLEXIBLES
  // =======================
  useEffect(() => {
    if (!user) return;

    const fetchHistoriales = async () => {
      try {
        // Carreras
        const resCarreras = await fetch(`${BACKEND_URL}/api/historial/carreras/${user.id_usuario}`);
        const dataCarreras = await resCarreras.json();
        const carrerasArray = Array.isArray(dataCarreras) ? dataCarreras : dataCarreras.historial || [];
        setHistorialCarreras(carrerasArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));

        // Tests
        const resTests = await fetch(`${BACKEND_URL}/api/historial/tests/${user.id_usuario}`);
        const dataTests = await resTests.json();
        const testsArray = Array.isArray(dataTests) ? dataTests : dataTests.historial || [];
        setHistorialTests(testsArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
        if (testsArray.length > 0) setUltimoMBTI(testsArray[0].resultado_mbti);

      } catch (err) {
        console.error("Error cargando historiales:", err);
        setHistorialCarreras([]);
        setHistorialTests([]);
      }
    };

    fetchHistoriales();
  }, [user]);

  // =======================
  // REGISTRAR VISTA DE CARRERA
  // =======================
  const registrarVistaCarrera = async (idCarrera, nombreCarrera, nombreUniversidad) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/historial/carreras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario: user.id_usuario, idCarrera })
      });
      if (!res.ok) throw new Error("Error registrando carrera");

      setHistorialCarreras(prev => [
        {
          id: Date.now(),
          nombre_carrera: nombreCarrera,
          nombre_universidad: nombreUniversidad,
          fecha: new Date().toISOString()
        },
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  // =======================
  // RENDER
  // =======================
  if (!user) {
    return (
      <div className={style.userzoneContainer}>
        <main className={style.userzoneCard}>
          <p>Debes iniciar sesión para ver tu zona de usuario.</p>
        </main>
      </div>
    );
  }

  if (user.rol_nombre === "Administrador") {
    return (
      <div className={style.userzoneContainer}>
        <main className={style.userzoneCard}>
          <h2>Panel de Control (Admin)</h2>
          <ul>
            <li><a href="/users">Gestión de usuarios</a></li>
            <li><a href="/careers">Gestión de carreras</a></li>
            <li><a href="/reports">Ver reportes</a></li>
          </ul>
        </main>
      </div>
    );
  }

  return (
    <div className={style.userzoneContainer}>
      <aside className={`${style.userzoneSidebar} ${style.left}`}>
        <h2>Historial de Carreras</h2>
        {historialCarreras.length > 0 ? (
          <ul>
            {historialCarreras.map((carrera, i) => (
              <li key={i}>
                {carrera.nombre_carrera} - {carrera.nombre_universidad} ({carrera.fecha ? new Date(carrera.fecha).toLocaleDateString() : "Fecha desconocida"})
              </li>
            ))}
          </ul>
        ) : <p>No has visto carreras aún.</p>}
      </aside>

      <main className={style.userzoneCard}>
        <div className={style.profilePicContainer}>
          <img src={profilePic} alt="Foto de perfil" className={style.profilePic} />
          <button className={style.changePicBtn} onClick={() => fileInputRef.current.click()}>
            Cambiar foto
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleChangePic}
          />
        </div>

        <div className={style.userInfo}>
          <p><strong>Nombre:</strong> {user.nombre_completo || user.username}</p>
          <p><strong>Correo:</strong> {user.correo}</p>
          <p><strong>Perfil MBTI:</strong> {ultimoMBTI || "Sin definir"}</p>
          <a href="/Quiz">
            <button className={style.testBtn}>
              {ultimoMBTI ? "Retomar Test" : "Tomar Test"}
            </button>
          </a>
        </div>
      </main>

      <aside className={`${style.userzoneSidebar} ${style.right}`}>
        <h2>Historial de Tests MBTI</h2>
        {historialTests.length > 0 ? (
          <ul>
            {historialTests.map((test, i) => (
              <li key={i}>
                {test.fecha ? new Date(test.fecha).toLocaleDateString() : "Fecha desconocida"} → {test.resultado_mbti || "Sin resultado"}
              </li>
            ))}
          </ul>
        ) : <p>No has realizado tests aún.</p>}
      </aside>
    </div>
  );
};

export default UserZone;

