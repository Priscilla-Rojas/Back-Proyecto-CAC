drop database padel_alquiler;
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS padel_alquiler;
USE padel_alquiler;

-- Tabla Usuario
CREATE TABLE `usuario` (
    `DNI` VARCHAR(8) PRIMARY KEY,
    `mail` VARCHAR(255) NOT NULL UNIQUE,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `contraseña` VARCHAR(255) NOT NULL,
    `foto` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creacion de nuestros usuarios
INSERT INTO `usuario` VALUES
    (12345671,'danybastias@outlook.com','Daniela Bastias','Padelera100%','https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'),
    (12345672,'azulian093@gmail.com','Ariel A. Zulián','Padelero100%','https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'),
    (12345673,'priscilla.k.rojas@hotmail.com','Priscilla Rojas','Padelera100%','https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'),
    (12345674,'adrian.bulacio.ab@hotmail.com','Adrián Bulacio','Padelero100%',	'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png');

-- Tabla Canchas
CREATE TABLE `canchas` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(45) DEFAULT NULL,
    `material` varchar(45) NOT NULL DEFAULT 'Cristal',
    `cubierta` BOOLEAN NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar datos en Canchas
INSERT INTO `canchas` VALUES 
    (1,'Cancha-1','Cristal',0),
    (2,'Cancha-2','Cemento',0),
    (3,'Cancha-3','Cristal',1),
    (4,'Cancha-4','Cristal',0),
    (5,'Cancha-5','Cristal',1),
    (7,'Cancha-6','Cemento',1);

-- Tabla Turnos
CREATE TABLE `turnos` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `inicio` TIME NOT NULL,
    `fin` TIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar turno predeterminados
INSERT INTO `turnos` (`inicio`, `fin`) VALUES 
    ('10:00:00', '11:30:00'),
    ('11:30:00', '13:00:00'),
    ('13:00:00', '14:30:00'),
    ('14:30:00', '16:00:00'),
    ('16:00:00', '17:30:00'),
    ('17:30:00', '19:00:00');

-- Tabla Turnos_Cancha
CREATE TABLE `Turno_Cancha` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `ID_turno` INT,
    `ID_cancha` INT,
    `disponibilidad` BOOLEAN NOT NULL,
    FOREIGN KEY (`ID_turno`) REFERENCES `turnos`(`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`ID_cancha`) REFERENCES `canchas`(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creacion tabla intermedia con los turnos asociados a las canchas
INSERT INTO `Turno_Cancha` (ID_turno, ID_cancha, disponibilidad)
SELECT t.ID, c.id, TRUE
FROM Turnos t, canchas c;

-- Tabla Reserva
CREATE TABLE `reserva` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `DNI_usuario` VARCHAR(20),
    `fecha` DATE NOT NULL,
    `ID_turno_cancha` INT,
    `estado` ENUM('Reservada', 'Cumplida', 'Cancelada') NOT NULL,
    FOREIGN KEY (`DNI_usuario`) REFERENCES `usuario`(`DNI`) ON DELETE CASCADE,
    FOREIGN KEY (`ID_turno_cancha`) REFERENCES `Turno_Cancha`(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar Reservas Demos
INSERT INTO `reserva` (`DNI_usuario`, `fecha`, `ID_turno_cancha`, `estado` ) 
VALUES 
    ('12345672', '2024-06-30', '5', 'Reservada'),
    ('12345671', '2024-07-02', '3', 'Reservada'),
    ('12345672', '2024-07-02', '5', 'Reservada'),
    ('12345672', '2024-07-02', '10','Reservada'),
    ('12345674', '2024-07-05', '30', 'Reservada'),
    ('12345673', '2024-07-01', '25', 'Reservada');