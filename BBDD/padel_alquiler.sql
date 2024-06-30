drop database padel_alquiler;
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS padel_alquiler;
USE padel_alquiler;
LAS tablas Son 

-- Tabla Usuario
CREATE TABLE `usuario` (
    `DNI` VARCHAR(8) PRIMARY KEY,
    `mail` VARCHAR(255) NOT NULL UNIQUE,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `foto` VARCHAR(255) DEFAULT 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creacion de nuestros usuarios
/* INSERT INTO `usuario` (`DNI`, `mail`, `nombre_completo`, `password`, `foto`) VALUES
    ('12345672', 'priscilla.k.rojas@hotmail.com', 'Priscilla Rojas', 'Padelera100%', 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'), 
    ('12345671', 'danybastias@outlook.com', 'Daniela Bastias', 'Padelera100%', 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'),
    ('12345673', 'azulian093@gmail.com', 'Ariel A. Zulián', 'Padelero100%', 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'),
    ('12345674', 'adrian.bulacio.ab@hotmail.com', 'Adrián Bulacio', 'Padelero100%', 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'); */

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
    (6,'Cancha-6','Cemento',1);

-- Tabla Turnos
CREATE TABLE `turnos` (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `inicio` TIME NOT NULL,
    `fin` TIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar turno predeterminados
INSERT INTO `turnos` (`nombre`,`inicio`, `fin`) VALUES 
    ('Primero','10:00:00', '11:30:00'),
    ('Segundo','11:30:00', '13:00:00'),
    ('Tercero','13:00:00', '14:30:00'),
    ('Cuarto','14:30:00', '16:00:00'),
    ('Quinto','16:00:00', '17:30:00'),
    ('Sexto','17:30:00', '19:00:00');

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
    `mail_usuario` VARCHAR(250),
    `fecha` DATE NOT NULL,
    `ID_turno_cancha` INT,
    `estado` ENUM('Reservado', 'Cumplido', 'Cancelado') NOT NULL,
    FOREIGN KEY (`mail_usuario`) REFERENCES `usuario`(`mail`) ON DELETE CASCADE,
    FOREIGN KEY (`ID_turno_cancha`) REFERENCES `Turno_Cancha`(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar Reservas Demos
INSERT INTO `reserva` (`mail_usuario`, `fecha`, `ID_turno_cancha`, `estado`) 
VALUES
    ('azulian093@gmail.com', '2024-06-30', '5', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-02', '3', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-02', '5', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-02', '10','Reservado'),
    ('danybastias@outlook.com', '2024-07-05', '30', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-01', '25', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-01', '5', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-01', '5', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-02', '3', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-03', '5', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-04', '10', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-05', '30', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-06', '25', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-07', '18', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-01', '12', 'Cumplido'),
    ('priscilla.k.rojas@hotmail.com', '2024-06-30', '19', 'Cancelado'),
    ('azulian093@gmail.com', '2024-06-29', '2', 'Cumplido'),
    ('adrian.bulacio.ab@hotmail.com', '2024-06-28', '22', 'Cancelado'),
    ('danybastias@outlook.com', '2024-07-01', '8', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-02', '15', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-03', '3', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-04', '21', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-05', '9', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-06', '7', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-07', '11', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-01', '14', 'Cumplido'),
    ('danybastias@outlook.com', '2024-06-30', '29', 'Cancelado'),
    ('priscilla.k.rojas@hotmail.com', '2024-06-29', '27', 'Cumplido'),
    ('azulian093@gmail.com', '2024-06-28', '1', 'Cancelado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-01', '4', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-02', '6', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-03', '20', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-04', '26', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-05', '24', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-06', '13', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-07', '23', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-01', '28', 'Cumplido'),
    ('adrian.bulacio.ab@hotmail.com', '2024-06-30', '31', 'Cancelado'),
    ('danybastias@outlook.com', '2024-06-29', '16', 'Cumplido'),
    ('priscilla.k.rojas@hotmail.com', '2024-06-28', '32', 'Cancelado'),
    ('azulian093@gmail.com', '2024-07-01', '33', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-02', '34', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-03', '35', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-04', '36', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-05', '1', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-06', '2', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-07', '3', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-01', '4', 'Cumplido'),
    ('azulian093@gmail.com', '2024-06-30', '5', 'Cancelado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-06-29', '6', 'Cumplido'),
    ('danybastias@outlook.com', '2024-06-28', '7', 'Cancelado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-01', '8', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-02', '9', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-03', '10', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-04', '11', 'Reservado'),
    ('priscilla.k.rojas@hotmail.com', '2024-07-05', '12', 'Reservado'),
    ('azulian093@gmail.com', '2024-07-06', '13', 'Reservado'),
    ('adrian.bulacio.ab@hotmail.com', '2024-07-07', '14', 'Reservado'),
    ('danybastias@outlook.com', '2024-07-01', '15', 'Cumplido'),
    ('priscilla.k.rojas@hotmail.com', '2024-06-30', '16', 'Cancelado'),
    ('azulian093@gmail.com', '2024-06-29', '17', 'Cumplido'),
    ('adrian.bulacio.ab@hotmail.com', '2024-06-28', '18', 'Cancelado'),
    ('danybastias@outlook.com', '2024-07-01', '19','Reservado');