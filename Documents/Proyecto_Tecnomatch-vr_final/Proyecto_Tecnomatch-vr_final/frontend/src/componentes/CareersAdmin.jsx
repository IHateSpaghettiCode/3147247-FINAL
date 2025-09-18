import React, { useEffect, useState } from "react";

const API = "http://localhost:3000/api/carreras";

const CareersAdmin = () => {
  const [carreras, setCarreras] = useState([]);
  const [universidades, setUniversidades] = useState([]); // <-- Mueve aquí
  const [nuevaCarrera, setNuevaCarrera] = useState({
    nombre_carrera: "",
    id_universidad: 1
  });

  // Leer universidades
  useEffect(() => {
    fetch("http://localhost:3000/api/universidades")
      .then(res => res.json())
      .then(data => {
        if (data.ok) setUniversidades(data.universidades);
      });
  }, []);

  // Leer carreras
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setCarreras(data.carreras);
      });
  }, []);

  // ...resto del código...

  // Crear carrera
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaCarrera)
    });
    const data = await res.json();
    if (data.ok) setCarreras([...carreras, data.carrera]);
  };

  // Eliminar carrera
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setCarreras(carreras.filter(c => c.id_carrera !== id));
  };

  // Actualizar carrera (ejemplo solo nombre)
  const handleUpdate = async (id, nombre_carrera) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_carrera })
    });
    setCarreras(carreras.map(c => c.id_carrera === id ? { ...c, nombre_carrera } : c));
  };

  return (
    <div>
      <h2>Gestión de Carreras</h2>
      <form onSubmit={handleCreate}>
  <input
    placeholder="Nombre carrera"
    value={nuevaCarrera.nombre_carrera}
    onChange={e => setNuevaCarrera({ ...nuevaCarrera, nombre_carrera: e.target.value })}
  />
  <select
    value={nuevaCarrera.id_universidad}
    onChange={e => setNuevaCarrera({ ...nuevaCarrera, id_universidad: Number(e.target.value) })}
  >
    {universidades.map(u => (
      <option key={u.id_universidad} value={u.id_universidad}>
        {u.nombre_universidad}
      </option>
    ))}
  </select>
  <button type="submit">Crear carrera</button>
</form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Carrera</th>
            <th>Universidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map(c => (
            <tr key={c.id_carrera}>
              <td>{c.id_carrera}</td>
              <td>
                <input
                  value={c.nombre_carrera}
                  onChange={e => handleUpdate(c.id_carrera, e.target.value)}
                />
              </td>
              <td>{c.nombre_universidad}</td>
              <td>
                <button onClick={() => handleDelete(c.id_carrera)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareersAdmin;