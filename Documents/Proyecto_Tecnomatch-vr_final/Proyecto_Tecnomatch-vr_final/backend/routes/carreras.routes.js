const express = require("express");
const router = express.Router();

// GET todas las carreras con su universidad
router.get("/", (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT c.id_carrera, c.nombre_carrera, u.nombre_universidad
    FROM carreras c
    JOIN universidades u ON c.id_universidad = u.id_universidad
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true, carreras: results });
  });
});

// POST crear carrera
router.post("/", (req, res) => {
  const db = req.app.locals.db;
  const { nombre_carrera, id_universidad } = req.body;
  db.query(
    "INSERT INTO carreras (nombre_carrera, id_universidad) VALUES (?, ?)",
    [nombre_carrera, id_universidad],
    (err, result) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true, carrera: { id_carrera: result.insertId, nombre_carrera, id_universidad } });
    }
  );
});

// PUT actualizar carrera (ejemplo: nombre_carrera)
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { nombre_carrera } = req.body;
  db.query(
    "UPDATE carreras SET nombre_carrera = ? WHERE id_carrera = ?",
    [nombre_carrera, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true });
    }
  );
});

// DELETE eliminar carrera
router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;
  db.query(
    "DELETE FROM carreras WHERE id_carrera = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true });
    }
  );
});

module.exports = router;