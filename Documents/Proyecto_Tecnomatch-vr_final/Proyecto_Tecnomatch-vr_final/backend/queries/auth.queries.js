// queries/auth.queries.js
module.exports = {
  REGISTER_USER: `
    INSERT INTO usuarios (nombre_usuario, nombre_completo, correo, contraseña_hash, rol_id)
    VALUES (?, ?, ?, ?, ?)
  `,
  
  FIND_USER_BY_EMAIL: `
    SELECT * FROM usuarios WHERE correo = ?
  `,

  GET_ALL_USERS: `
    SELECT id_usuario, nombre_usuario, nombre_completo, correo, rol_id
    FROM usuarios
  `
};
