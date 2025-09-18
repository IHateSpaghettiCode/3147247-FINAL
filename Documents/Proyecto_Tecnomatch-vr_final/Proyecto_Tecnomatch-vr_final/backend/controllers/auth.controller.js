// controllers/auto.controller.js
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = (req, res) => {
  const db = req.app.locals.db;
  const { nombre_usuario, nombre_completo, correo, password } = req.body;

  if (!nombre_usuario || !nombre_completo || !correo || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const rol_id = 2; // usuario normal
  const plainPassword = password; // guardar tal cual

  const sql = `
    INSERT INTO usuarios (nombre_usuario, nombre_completo, correo, password, rol_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre_usuario, nombre_completo, correo, plainPassword, rol_id], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "El usuario o correo ya existe" });
      }
      return res.status(500).json({ message: "Error en la base de datos", error: err });
    }

    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuarioId: result.insertId
    });
  });
};

// Login de usuario con bloqueo tras 5 intentos fallidos
exports.login = (req, res) => {
  console.log("BODY:", req.body);
  const db = req.app.locals.db;
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  // Cambia la consulta para incluir el nombre del rol
  const sql = `
    SELECT u.*, r.nombre AS rol_nombre
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    WHERE u.correo = ?
    LIMIT 1
  `;

  db.query(sql, [correo], (err, results) => {
    if (err) return res.status(500).json({ message: "Error en la base de datos", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    // Revisar si el usuario está bloqueado
    if (user.bloqueado) {
      return res.status(403).json({ message: "⚠️ Usuario bloqueado por seguridad. Contacta al administrador." });
    }

    // Contraseña incorrecta
    if (password !== user.password) {
      const nuevosIntentos = user.intentos_fallidos + 1;
      let bloqueado = false;

      if (nuevosIntentos >= 5) bloqueado = true;

      // Actualizar intentos y bloqueo en DB
      const updateSql = "UPDATE usuarios SET intentos_fallidos = ?, bloqueado = ? WHERE id_usuario = ?";
      db.query(updateSql, [nuevosIntentos, bloqueado, user.id_usuario], (err) => {
        if (err) console.error("Error actualizando intentos:", err);
      });

      return res.status(401).json({
        message: bloqueado
          ? "⚠️ Usuario bloqueado tras 5 intentos fallidos. Contacta al administrador."
          : `Contraseña incorrecta. Intentos restantes: ${5 - nuevosIntentos}`
      });
    }

    // Login exitoso: reiniciar intentos
    const resetSql = "UPDATE usuarios SET intentos_fallidos = 0 WHERE id_usuario = ?";
    db.query(resetSql, [user.id_usuario], (err) => {
      if (err) console.error("Error reiniciando intentos:", err);
    });

    // Generar token JWT
    const token = jwt.sign(
      { id_usuario: user.id_usuario, correo: user.correo, rol_id: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        correo: user.correo,
        rol_id: user.rol_id,
        rol_nombre: user.rol_nombre // <-- aquí envías el nombre del rol
      }
    });
  });
};