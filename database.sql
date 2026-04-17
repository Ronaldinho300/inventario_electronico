-- ============================================================
-- Base de datos: inventario_electronico
-- ============================================================

CREATE DATABASE IF NOT EXISTS inventario_electronico
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inventario_electronico;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(100)   NOT NULL,
    descripcion      TEXT,
    precio           DECIMAL(10,2)  NOT NULL,
    stock            INT            NOT NULL DEFAULT 0,
    fecha_registro   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba
INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Laptop HP',        'Laptop 16GB RAM, 512GB SSD', 3500.00, 10),
('Mouse Logitech',   'Mouse inalámbrico',           80.50,   50),
('Teclado Mecánico', 'Teclado RGB',                 250.00,  20);
