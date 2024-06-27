const connection = require('../db/db');

const getAllReservas = (req, res) => {
  const sql = 'SELECT * FROM reserva';
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
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
}