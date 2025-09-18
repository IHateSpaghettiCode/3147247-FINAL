import React, { useEffect, useState } from "react";

const API = "http://localhost:3000/api/usuarios";

const UsersAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre_usuario: "",
    nombre_completo: "",
    correo: "",
    password: "",
    rol_id: 2,
    estado: "activo"
  });

  // Leer usuarios
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setUsuarios(data.usuarios);
      });
  }, []);

  // Crear usuario
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });
    const data = await res.json();
    if (data.ok) setUsuarios([...usuarios, data.usuario]);
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsuarios(usuarios.filter(u => u.id_usuario !== id));
  };

  // Actualizar usuario (ejemplo solo nombre)
  const handleUpdate = async (id, nombre_completo) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_completo })
    });
    setUsuarios(usuarios.map(u => u.id_usuario === id ? { ...u, nombre_completo } : u));
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Usuario" value={nuevoUsuario.nombre_usuario}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre_usuario: e.target.value })} />
        <input placeholder="Nombre completo" value={nuevoUsuario.nombre_completo}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre_completo: e.target.value })} />
        <input placeholder="Correo" value={nuevoUsuario.correo}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />
        <input placeholder="Contraseña" type="password" value={nuevoUsuario.password}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
        <button type="submit">Crear usuario</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombre_usuario}</td>
              <td>
                <input
                  value={u.nombre_completo}
                  onChange={e => handleUpdate(u.id_usuario, e.target.value)}
                />
              </td>
              <td>{u.correo}</td>
              <td>{u.rol_id}</td>
              <td>{u.estado}</td>
              <td>
                <button onClick={() => handleDelete(u.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;