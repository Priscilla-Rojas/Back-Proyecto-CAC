drop database padel_alquiler;
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS padel_alquiler;
USE padel_alquiler;

-- Tabla Usuario
CREATE TABLE `Usuario` (
    `DNI` VARCHAR(20) PRIMARY KEY,
    `mail` VARCHAR(255) NOT NULL UNIQUE,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `contraseña` VARCHAR(255) NOT NULL,
    `foto` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla Canchas
CREATE TABLE `canchas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `material` varchar(45) NOT NULL DEFAULT 'Cristal',
  `cubierta` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar datos en Canchas
INSERT INTO `canchas` VALUES (1,'Cancha-1','Cristal',0),(2,'Cancha-2','Cemento',0),(3,'Cancha-3','Cristal',1),(4,'Cancha-4','Cristal',0),(5,'Cancha-5','Cristal',1),(7,'Cancha-6','Cemento',1);

-- Tabla Turnos
CREATE TABLE `Turnos` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `rango_horario` TIME NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla Turnos_Cancha
CREATE TABLE `Turnos_Cancha` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `ID_turno` INT,
    `disponibilidad` BOOLEAN NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`ID_turno`) REFERENCES `Turnos`(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla Reserva
CREATE TABLE `Reserva` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `DNI_usuario` VARCHAR(20),
    `fecha` DATE NOT NULL,
    `ID_turno_cancha` INT,
    `estado` ENUM('Reservada', 'Cumplida', 'Cancelada') NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`DNI_usuario`) REFERENCES `Usuario`(`DNI`) ON DELETE CASCADE,
    FOREIGN KEY (`ID_turno_cancha`) REFERENCES `Turnos_Cancha`(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
