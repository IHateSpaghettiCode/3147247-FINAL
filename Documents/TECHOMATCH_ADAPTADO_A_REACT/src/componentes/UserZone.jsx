import React, { useState } from "react";
import style from "../styles/User.module.css";
import { href } from "react-router-dom";

const UserZone = () => {
  const [user, setUser] = useState({
    nombre: "Juan Pérez",
    correo: "juanperez@mail.com",
    contrasena: "********",
    mbti: null, // cambia a un tipo como "INTJ" para ver el botón de "Retomar test"
  });

  return (
    <div className={style.userzoneContainer}>
      {/* Header */}
      

      {/* Lateral izquierdo */}
      <aside className={`${style.userzoneSidebar} ${style.left}`}>
        <h2>Historial de Carreras</h2>
        <ul>
          <li>Ingeniería en Sistemas</li>
          <li>Diseño Gráfico</li>
          <li>Ciberseguridad</li>
        </ul>
      </aside>

      {/* Tarjeta central */}
      <main className={style.userzoneCard}>
        <div className={style.profilePicContainer}>
          <img
            src="https://via.placeholder.com/150"
            alt="Foto de perfil"
            className={style.profilePic}
          />
          <button className={style.changePicBtn}>Cambiar foto</button>
        </div>

        <div className={style.userInfo}>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Correo:</strong> {user.correo}</p>
          <p><strong>Contraseña:</strong> {user.contrasena}</p>
          <p><strong>Perfil MBTI:</strong> {user.mbti || "Sin definir"}</p>
        

          <a href="/Quiz">
          <button className={style.testBtn}>
            {user.mbti ? "Retomar Test" : "Tomar Test"}
          </button>
          </a>
        </div>
      </main>

      {/* Lateral derecho */}
      <aside className={`${style.userzoneSidebar} ${style.right}`}>
        <h2>Notificaciones</h2>
        <ul>
          <li>Nuevo test disponible</li>
          <li>Se agregó una nueva carrera</li>
          <li>Actualización en tus resultados</li>
        </ul>
      </aside>
    </div>
  );
};

export default UserZone;
