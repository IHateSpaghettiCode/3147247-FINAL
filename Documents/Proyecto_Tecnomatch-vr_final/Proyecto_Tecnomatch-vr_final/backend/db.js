// db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.getConnection()
  .then(() => console.log("✅ Conexión exitosa a la base de datos MySQL"))
  .catch(err => console.error("❌ Error al conectar con la base de datos:", err));

module.exports = db;
