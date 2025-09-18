const express = require("express");
const router = express.Router();

// GET todos los usuarios
router.get("/", (req, res) => {
  const db = req.app.locals.db;
  db.query(
    "SELECT id_usuario, nombre_usuario, nombre_completo, correo, rol_id, estado FROM usuarios",
    (err, results) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true, usuarios: results });
    }
  );
});

// GET usuario por ID (incluyendo foto_perfil)
router.get("/:id", (req, res) => {
  const db = req.app.locals.db;
  db.query(
    "SELECT id_usuario, nombre_usuario, nombre_completo, correo, rol_id, estado, foto_perfil FROM usuarios WHERE id_usuario = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      if (results.length === 0) return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
      res.json({ ok: true, usuario: results[0] });
    }
  );
});

// POST crear usuario
router.post("/", (req, res) => {
  const db = req.app.locals.db;
  const { nombre_usuario, nombre_completo, correo, password, rol_id, estado } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre_usuario, nombre_completo, correo, password, rol_id, estado) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre_usuario, nombre_completo, correo, password, rol_id, estado],
    (err, result) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true, usuario: { id_usuario: result.insertId, nombre_usuario, nombre_completo, correo, rol_id, estado } });
    }
  );
});

// PUT actualizar usuario (ejemplo: nombre_completo)
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { nombre_completo } = req.body;
  db.query(
    "UPDATE usuarios SET nombre_completo = ? WHERE id_usuario = ?",
    [nombre_completo, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true });
    }
  );
});

// PUT actualizar foto de perfil
router.put("/:id/foto", (req, res) => {
  const db = req.app.locals.db;
  const { foto_perfil } = req.body;
  if (!foto_perfil) return res.status(400).json({ ok: false, error: "Se requiere foto_perfil" });

  db.query(
    "UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?",
    [foto_perfil, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true, msg: "Foto de perfil actualizada" });
    }
  );
});

// DELETE eliminar usuario
router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;
  db.query(
    "DELETE FROM usuarios WHERE id_usuario = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true });
    }
  );
});

module.exports = router;
