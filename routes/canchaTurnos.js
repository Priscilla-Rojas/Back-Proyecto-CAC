const express = require('express');
const router = express.Router();
const connection = require('../db/db')

router.get('/', (req, res) => {
  connection.query(`
    SELECT 
        c.id AS ID_CANCHA, 
        c.nombre AS NOMBRE_CANCHA, 
        JSON_ARRAYAGG(JSON_OBJECT('ID_TURNO', t.ID, 'TURNO_INICIO', t.inicio, 'TURNO_FIN', t.fin)) AS TURNOS 
    FROM 
        Turno_Cancha ct 
    JOIN 
        canchas c ON ct.ID_cancha = c.id 
    JOIN 
        turnos t ON ct.ID_turno = t.ID 
    GROUP BY 
        c.id, c.nombre;
  `, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
});


module.exports = router