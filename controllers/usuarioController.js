const connection = require('../db/db');

const getAllUsuarios = (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
};

const getUsuarioById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM usuarios WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.status(200).json(results[0]);
  });
};

const createUsuario = (req, res) => {
  const { nombre, email, password } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [nombre, email, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(`Usuario creado con ID: ${results.insertId}`);
  });
};

const updateUsuario = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const sql = 'UPDATE usuarios SET ? WHERE id = ?';
  connection.query(sql, [updates, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Usuario con ID: ${id} ha sido actualizado`);
  });
};

const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Usuario con ID: ${id} ha sido eliminado`);
  });
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
