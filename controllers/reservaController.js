const connection = require('../db/db');

const getAllReservas = (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const sql = `
    SELECT 
    r.ID,
    r.DNI_usuario,
    r.fecha,
    JSON_OBJECT(
        'id_cancha', c.id,
        'Nombre_cancha', c.nombre
    ) AS cancha,
    JSON_OBJECT(
        'Id_turno', t.ID,
        'Nombre_turno', t.nombre,
        'Inicio', t.inicio,
        'Fin', t.fin
    ) AS turno,
    r.estado
    FROM 
        reserva r
    JOIN 
        Turno_Cancha tc ON r.ID_Turno_Cancha = tc.ID
    JOIN 
        canchas c ON tc.ID_cancha = c.ID
    JOIN 
        turnos t ON tc.ID_turno = t.ID;
  `;
  connection.query( sql, (err, results) => {
      if (err) {
      res.status(500).send(err);
      return;
      }
      res.status(200).json(results);
  });
}
const getReservasOrderByDate = (req, res) => {
  const sql = `
    SELECT
    r.fecha,
    JSON_OBJECTAGG(
        nombre_cancha,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'Id_reserva', id_reserva,
                'Estado', estado,
                'DNI_usuario', DNI,
                'Inicio', inicio,
                'Fin', fin
            )
        )
    ) AS Reservas
FROM (
    SELECT
        r.fecha,
        c.nombre AS nombre_cancha,
        r.id,
        r.estado,
        u.DNI,
        t.inicio,
        t.fin
    FROM
        reserva r
    JOIN
        reserva r ON r.id
    JOIN
        canchas c ON c.ID
    JOIN
        usuario u ON u.DNI
    JOIN
        turnos t ON t.ID
) AS subquery
GROUP BY
    fecha_reserva, nombre_cancha;
  `;
  // const sql = `
  //   SELECT
  //   r.fecha,
  //   JSON_OBJECTAGG(
  //     c.nombre,
  //     JSON_ARRAYAGG(
  //       JSON_OBJECT(
  //         'Id_Reserva', r.id,
  //         'Estado', r.estado,
  //         'DNI_usuario', u.DNI,
  //         'Inicio', t.inicio,
  //         'Fin', t.fin
  //       )
  //     )
  //   ) AS reservas
  //   FROM
  //       reserva r
  //   JOIN
  //       canchas c ON c.id
  //   JOIN
  //       usuario u ON u.DNI
  //   JOIN
  //       turnos t ON t.ID
  //   GROUP BY
  //       r.fecha;
  // `;



=======
  const sql = 'SELECT * FROM reserva';
>>>>>>> 343c37b (Cambiando Estructura en Rama Daniela)
=======
  const sql = 'SELECT * FROM reserva';
>>>>>>> 39843acb3a6ecd65cb29a5b026ad6edc49ed53cb
  connection.query( sql, (err, results) => {
      if (err) {
      res.status(500).send(err);
      return;
      }
      res.status(200).json(results);
  });
}

const getReservaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM reserva WHERE id = ?';
  connection.query( sql, [id], (err, results) => {
      if (err) {
      res.status(500).send(err);
      return;
      }
      if (results.length === 0) {
          res.status(404).send('Reserva no encontrada');
          return;
      }
      res.status(200).json(results[0]);
  });
}

const createReserva = (req, res) => {
  const { DNI_usuario, fecha, ID_turno_cancha, estado } = req.body;
  const sql = 'INSERT INTO reserva (DNI_usuario, fecha, ID_turno_cancha, estado) VALUES (?, ?, ?, ?)';
  connection.query( sql, [DNI_usuario, fecha, ID_turno_cancha, estado], (err, results) => {
      if (err) {
          res.status(500).send(err);
          return;
      }
      console.log(results)
      res.status(201).send(`La reserva: ${results.insertId} ha sido agregada`);
      });
}

const updateReserva = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const sql = 'UPDATE reserva SET ? WHERE id = ?';
  connection.query( sql, [updates, id], (err, results) => {
      if (err) {
          res.status(500).send(err);
          return;
      }
      res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
      });
}

const deleteReserva = (req, res) => {
  const { id } = req.params;
  const sql  = 'DELETE FROM reserva WHERE id = ?';
  connection.query( sql, [id], (err, results) => {
      if (err) {
          res.status(500).send(err);
          return;
      }
      res.status(200).send(`Reserva con ID: ${id} ha sido eliminada`);
      });
}

module.exports = {
  getAllReservas,
<<<<<<< HEAD
<<<<<<< HEAD
  getReservasOrderByDate,
=======
>>>>>>> 343c37b (Cambiando Estructura en Rama Daniela)
=======
>>>>>>> 39843acb3a6ecd65cb29a5b026ad6edc49ed53cb
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
}