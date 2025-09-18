const express = require("express");
const router = express.Router();
const pool = require("../db"); // conexión MySQL

// =======================
// GET - Historial de carreras vistas por un usuario
// =======================
router.get("/carreras/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT cv.id, u.nombre_usuario, c.nombre_carrera, uni.nombre_universidad, cv.fecha
       FROM carreras_vistas cv
       INNER JOIN usuarios u ON cv.id_usuario = u.id_usuario
       INNER JOIN carreras c ON cv.id_carrera = c.id_carrera
       INNER JOIN universidades uni ON c.id_universidad = uni.id_universidad
       WHERE cv.id_usuario = ?
       ORDER BY cv.fecha DESC`,
      [idUsuario]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error al obtener historial de carreras:", err);
    res.status(500).json({ error: "Error al obtener historial de carreras" });
  }
});

// =======================
// GET - Historial de tests de un usuario
// =======================
router.get("/tests/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT rt.id_resultado, p.nombre_perfil AS resultado_mbti, rt.fecha
       FROM resultados_test rt
       INNER JOIN perfilespsicologicos p ON rt.id_perfil = p.id_perfil
       WHERE rt.id_usuario = ?
       ORDER BY rt.fecha DESC`,
      [idUsuario]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error al obtener historial de tests:", err);
    res.status(500).json({ error: "Error al obtener historial de tests" });
  }
});

// =======================
// GET - Último test de un usuario
// =======================
router.get("/ultimo_test/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT rt.id_resultado, p.nombre_perfil AS resultado_mbti, rt.fecha
       FROM resultados_test rt
       INNER JOIN perfilespsicologicos p ON rt.id_perfil = p.id_perfil
       WHERE rt.id_usuario = ?
       ORDER BY rt.fecha DESC
       LIMIT 1`,
      [idUsuario]
    );

    res.json(rows.length > 0 ? rows[0] : null);
  } catch (err) {
    console.error("Error al obtener el último test:", err);
    res.status(500).json({ error: "Error al obtener el último test" });
  }
});

// =======================
// POST - Registrar nueva vista de carrera
// =======================
router.post("/carreras", async (req, res) => {
  const { idUsuario, idCarrera } = req.body;

  if (!idUsuario || !idCarrera) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    await pool.query(
      `INSERT INTO carreras_vistas (id_usuario, id_carrera) VALUES (?, ?)`,
      [idUsuario, idCarrera]
    );
    res.status(201).json({ message: "Vista registrada correctamente" });
  } catch (err) {
    console.error("Error al registrar vista de carrera:", err);
    res.status(500).json({ error: "Error al registrar vista de carrera" });
  }
});

module.exports = router;
