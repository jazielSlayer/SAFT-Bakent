CREATE DATABASE IF NOT EXISTS LaboratorioDB;
USE LaboratorioDB;

-- Tabla de Usuarios (estudiantes, profesores, personal)
CREATE TABLE IF NOT EXISTS Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tipo_usuario ENUM('estudiante', 'profesor', 'personal') NOT NULL,
    numero_identificacion VARCHAR(20) UNIQUE NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

-- Tabla de Laboratorios
CREATE TABLE IF NOT EXISTS Laboratorios (
    laboratorio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100),
    tipo_laboratorio ENUM('electronica', 'hardware', 'telecomunicaciones', 'redes') NOT NULL,
    capacidad INT NOT NULL,
    responsable_id INT,
    FOREIGN KEY (responsable_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla de Categorías de Equipos
CREATE TABLE IF NOT EXISTS Categorias_Equipos (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla de Equipos
CREATE TABLE IF NOT EXISTS Equipos (
    equipo_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_inventario VARCHAR(50) UNIQUE NOT NULL,
    categoria_id INT,
    laboratorio_id INT,
    estado ENUM('disponible', 'en_uso', 'en_mantenimiento', 'dado_de_baja') DEFAULT 'disponible',
    descripcion TEXT,
    fecha_adquisicion DATE,
    FOREIGN KEY (categoria_id) REFERENCES Categorias_Equipos(categoria_id),
    FOREIGN KEY (laboratorio_id) REFERENCES Laboratorios(laboratorio_id)
);

-- Tabla de Préstamos
CREATE TABLE IF NOT EXISTS Prestamos (
    prestamo_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    equipo_id INT,
    fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion_prevista DATETIME,
    fecha_devolucion_real DATETIME,
    estado ENUM('activo', 'devuelto', 'atrasado') DEFAULT 'activo',
    notas TEXT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (equipo_id) REFERENCES Equipos(equipo_id)
);

-- Tabla de Mantenimiento (registro de reparaciones/mantenimiento de equipos)
CREATE TABLE IF NOT EXISTS Mantenimiento (
    mantenimiento_id INT PRIMARY KEY AUTO_INCREMENT,
    equipo_id INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    descripcion TEXT,
    tecnico VARCHAR(100),
    costo DECIMAL(10,2),
    FOREIGN KEY (equipo_id) REFERENCES Equipos(equipo_id)
);

-- Tabla de Reservas de Laboratorio
CREATE TABLE IF NOT EXISTS Reservas_Laboratorio (
    reserva_id INT PRIMARY KEY AUTO_INCREMENT,
    laboratorio_id INT,
    usuario_id INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    proposito TEXT,
    estado ENUM('pendiente', 'aprobada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (laboratorio_id) REFERENCES Laboratorios(laboratorio_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);