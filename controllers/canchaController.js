const connection = require('../db/db');

const getAllCanchas = (req, res)=>{
  const sql = 'SELECT * FROM canchas';
  connection.query( sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
}

const getCanchaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM canchas WHERE id = ?';
  connection.query( sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Cancha no encontrada');
      return;
    }
    res.status(200).json(results[0]);
  });
}

const createCancha = (req, res) => {
  const { nombre, material, cubierta } = req.body;
  const sql = 'INSERT INTO canchas (nombre, material, cubierta) VALUES (?, ?, ?)';
  
  connection.query( sql, [nombre, material, cubierta], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).send(`Cancha con ID: ${results.insertId} ha sido agregada`);
  });
}

const updateCancha = (req, res) => {
  const { id } = req.params;
  const { nombre, material, cubierta } = req.body;
  const sql = 'UPDATE canchas SET nombre = ?, material = ?, cubierta = ? WHERE id = ?';
  connection.query( sql, [nombre, material, cubierta, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
  });
}

const parcialUpdateCancha = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const sql = 'UPDATE canchas SET ? WHERE id = ?';
  connection.query( sql, [updates, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
  });
}

const deleteCancha = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM canchas WHERE id = ?';
  connection.query( sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido eliminada`);
  });
}

module.exports = {
  getAllCanchas,
  getCanchaById,
  createCancha,
  updateCancha,
  parcialUpdateCancha,
  deleteCancha
}