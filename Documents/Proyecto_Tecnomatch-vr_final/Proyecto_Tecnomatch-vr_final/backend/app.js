// app.js
const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Archivos estáticos

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) console.error("❌ Error al conectar a MySQL:", err);
  else console.log("✅ Conexión exitosa a la base de datos MySQL");
});

// Hacer la conexión accesible en rutas
app.locals.db = db;

// Rutas
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const usuariosRoutes = require("./routes/usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

const carrerasRoutes = require("./routes/carreras.routes");
app.use("/api/carreras", carrerasRoutes);

const universidadesRoutes = require("./routes/universidades.routes");
app.use("/api/universidades", universidadesRoutes);

const historialRoutes = require("./routes/historial.routes");
app.use("/api/historial", historialRoutes);


// Ruta raíz para verificar servidor
app.get("/", (req, res) => {
  res.send("✅ Servidor Tecnomatch funcionando!");
});

// Ruta de prueba de base de datos
app.get("/ping", (req, res) => {
  db.query("SELECT NOW() AS fecha", (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true, fecha: results[0].fecha });
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// ...existing code...

// Middleware para mostrar errores en consola y enviar respuesta 500
app.use((err, req, res, next) => {
  console.error('Error interno:', err);
  res.status(500).send('Internal Server Error');
});

// ...existing code...

module.exports = app;
