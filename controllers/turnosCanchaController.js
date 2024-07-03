const connection = require('../db/db');

const getAllTurnosCancha = (req, res) => {
  const sql = `
    SELECT 
        c.id AS ID_CANCHA, 
        c.nombre AS NOMBRE_CANCHA, 
<<<<<<< HEAD
<<<<<<< HEAD
        JSON_ARRAYAGG(JSON_OBJECT('ID_TURNO', t.ID, 'TURNO_NOMBRE', t.nombre, 'TURNO_INICIO', t.inicio, 'TURNO_FIN', t.fin)) AS TURNOS 
=======
        JSON_ARRAYAGG(JSON_OBJECT('ID_TURNO', t.ID, 'TURNO_INICIO', t.inicio, 'TURNO_FIN', t.fin)) AS TURNOS 
>>>>>>> 343c37b (Cambiando Estructura en Rama Daniela)
=======
        JSON_ARRAYAGG(JSON_OBJECT('ID_TURNO', t.ID, 'TURNO_INICIO', t.inicio, 'TURNO_FIN', t.fin)) AS TURNOS 
>>>>>>> 39843acb3a6ecd65cb29a5b026ad6edc49ed53cb
    FROM 
        Turno_Cancha ct 
    JOIN 
        canchas c ON ct.ID_cancha = c.id 
    JOIN 
        turnos t ON ct.ID_turno = t.ID 
    GROUP BY 
        c.id, c.nombre;
  `;
  connection.query( sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
}

module.exports = getAllTurnosCancha;