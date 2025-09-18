-- =====================================
-- CREAR BASE DE DATOS
-- =====================================
drop database if exists tecnomatch;
CREATE DATABASE tecnomatch CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE tecnomatch;

-- =====================================
-- TABLA DE ROLES
-- =====================================
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- =====================================
-- TABLA DE USUARIOS
-- =====================================
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    rol_id INT DEFAULT 2, -- 1=Admin, 2=Usuario
    estado TINYINT DEFAULT 1, -- 1=activo, 0=inactivo
    foto_perfil LONGTEXT, -- campo para la foto en Base64
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

ALTER TABLE usuarios ADD COLUMN intentos_fallidos INT DEFAULT 0;
-- =====================================
-- TABLAS UNIVERSIDADES Y CARRERAS
-- =====================================
DROP TABLE IF EXISTS carreras;
DROP TABLE IF EXISTS universidades;

CREATE TABLE universidades (
  id_universidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre_universidad VARCHAR(100) NOT NULL,
  ciudad VARCHAR(50) NOT NULL,
  snies VARCHAR(20) UNIQUE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE carreras (
  id_carrera INT AUTO_INCREMENT PRIMARY KEY,
  nombre_carrera VARCHAR(100) NOT NULL,
  id_universidad INT NOT NULL,
  FOREIGN KEY (id_universidad) REFERENCES universidades(id_universidad)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================
-- TABLA DE PERFILES PSICOLÓGICOS
-- =====================================
DROP TABLE IF EXISTS perfilespsicologicos;
CREATE TABLE perfilespsicologicos (
  id_perfil INT AUTO_INCREMENT PRIMARY KEY,
  nombre_perfil VARCHAR(100) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB;

-- =====================================
-- TABLA RESULTADOS DEL TEST
-- =====================================
DROP TABLE IF EXISTS resultados_test;
CREATE TABLE resultados_test (
  id_resultado INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_perfil INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_perfil) REFERENCES perfilespsicologicos(id_perfil)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =====================================
-- TABLA RECOMENDACIONES
-- =====================================
DROP TABLE IF EXISTS recomendaciones;
CREATE TABLE recomendaciones (
  id_recomendacion INT AUTO_INCREMENT PRIMARY KEY,
  id_resultado INT NOT NULL,
  id_carrera INT NOT NULL,
  id_universidad INT NOT NULL,
  tipo VARCHAR(50) DEFAULT 'perfil',
  fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_resultado) REFERENCES resultados_test(id_resultado)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_universidad) REFERENCES universidades(id_universidad)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================
-- TABLA AUDITORÍA DE USUARIOS
-- =====================================
DROP TABLE IF EXISTS auditoria_usuarios;
CREATE TABLE auditoria_usuarios (
  id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  accion VARCHAR(50) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- =====================================
-- TABLA HISTORIAL DE VISTAS DE UNIVERSIDADES
-- =====================================
DROP TABLE IF EXISTS universidades_vistas;
CREATE TABLE universidades_vistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  id_universidad INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_universidad) REFERENCES universidades(id_universidad)
);

-- =====================================
-- TABLA HISTORIAL DE VISTAS DE CARRERAS
-- =====================================
DROP TABLE IF EXISTS carreras_vistas;
CREATE TABLE carreras_vistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_carrera INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- =====================================
-- INSERTAR DATOS DE PRUEBA
-- =====================================
-- Roles
INSERT INTO roles (nombre) VALUES
('Administrador'),
('Usuario');

-- Usuarios
INSERT INTO usuarios (nombre_usuario, nombre_completo, correo, password, rol_id, estado) VALUES
('usua1', 'Luis Pérez', 'luis@correo.com', 'hash1', 1, 1),
('ana99', 'Ana Gómez', 'ana@correo.com', 'hash2', 2, 1),
('crivas', 'Carlos Rivas', 'carlos@correo.com', 'hash3', 2, 1),
('juanp', 'Juan Pérez', 'juan@mail.com', 'hash4', 2, 1),
('mariag', 'María García', 'maria@mail.com', 'hash5', 2, 1);

-- Universidades
INSERT INTO universidades (nombre_universidad, ciudad, snies) VALUES
('Universidad Sergio Arboleda', 'Bogotá', '1728'),
('Universidad Nacional de Colombia', 'Bogotá', '1101'),
('Universidad de los Andes', 'Bogotá', '1816'),
('Pontificia Universidad Javeriana', 'Bogotá', '953'),
('Universidad Jorge Tadeo Lozano', 'Bogotá', NULL),
('Universidad Externado de Colombia', 'Bogotá', NULL),
('Politécnico Grancolombiano', 'Bogotá', NULL),
('Universidad Central', 'Bogotá', NULL);

-- Carreras
INSERT INTO carreras (nombre_carrera, id_universidad) VALUES
  ('Ingeniería de Sistemas', 1),
  ('Diseño Interactivo', 2),
  ('Administración en Redes', 3),
  ('Seguridad Informática', 1),
  ('Ingeniería de Software', 1),
  ('Ciencia de Datos', 2),
  ('Investigación en IA', 2),
  ('Arquitectura de Software', 3),
  ('Gestión de Proyectos TI', 3),
  ('Dirección de Producto (PM)', 4),
  ('Product Management', 3),
  ('Innovación / Startups', 2),
  ('UX Research', 3),
  ('Ética de Datos', 2),
  ('Redacción Técnica', 2),
  ('Diseño Multimedial', 5),
  ('EdTech (Formación Digital)', 3),
  ('Gestión de Comunidad Tech', 2),
  ('Marketing Digital', 3),
  ('UX Writing', 2),
  ('QA / Testing', 2),
  ('Administración de Sistemas', 4),
  ('Soporte TI', 6),
  ('Documentación Técnica', 3),
  ('IT Service Management', 3),
  ('Operaciones TI', 7),
  ('Customer Success (SaaS)', 5),
  ('Implementación de Software', 3),
  ('DevOps / SRE', 2),
  ('Redes y Telecomunicaciones', 7),
  ('Diseño UI', 5),
  ('Animación / Motion', 7),
  ('Ventas Técnicas', 8),
  ('Ciberseguridad Ofensiva', 3),
  ('Community Manager', 5),
  ('Event Tech', 7);


-- Perfiles Psicológicos
INSERT INTO perfilespsicologicos (nombre_perfil) VALUES
('ENFJ'), ('ENFP'), ('ENTJ'), ('ENTP'), ('ESFJ'), ('ESFP'), ('ESTJ'), ('ESTP'),
('INFJ'), ('INFP'), ('INTJ'), ('INTP'), ('ISFJ'), ('ISFP'), ('ISTJ'), ('ISTP');

-- Resultados de Test
INSERT INTO resultados_test (id_usuario, id_perfil) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 2);

-- Recomendaciones
INSERT INTO recomendaciones (id_resultado, id_carrera, id_universidad, tipo) VALUES
(1, 1, 1, 'perfil'),
(2, 2, 2, 'perfil'),
(3, 3, 3, 'perfil'),
(4, 4, 1, 'perfil'),
(5, 1, 1, 'perfil');

-- =====================================
-- VISTA DE RECOMENDACIONES (última por estudiante)
-- =====================================
DROP VIEW IF EXISTS vista_recomendaciones;
CREATE OR REPLACE VIEW vista_recomendaciones AS
SELECT
    u.nombre_usuario AS estudiante,
    u.nombre_completo,
    p.nombre_perfil,
    ca.nombre_carrera,
    un.nombre_universidad,
    r.fecha_generacion,
    r.tipo
FROM usuarios u
JOIN resultados_test rt ON u.id_usuario = rt.id_usuario
JOIN perfilespsicologicos p ON rt.id_perfil = p.id_perfil
JOIN recomendaciones r ON rt.id_resultado = r.id_resultado
JOIN carreras ca ON r.id_carrera = ca.id_carrera
JOIN universidades un ON r.id_universidad = un.id_universidad
WHERE r.fecha_generacion = (
    SELECT MAX(r2.fecha_generacion)
    FROM recomendaciones r2
    WHERE r2.id_resultado = r.id_resultado
);

-- =====================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================
SELECT * FROM usuarios;
SELECT * FROM resultados_test;
SELECT * FROM recomendaciones;
SELECT * FROM vista_recomendaciones;
SELECT * FROM universidades_vistas;

-- =====================================
-- CREAR USUARIO MYSQL CON PERMISOS
-- =====================================
DROP USER IF EXISTS 'tecnomatch'@'localhost';
CREATE USER 'tecnomatch'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON tecnomatch.* TO 'tecnomatch'@'localhost';
FLUSH PRIVILEGES;
