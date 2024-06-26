const express = require('express');
const router = express.Router();
const connection = require('../../db')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM canchas', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, material, cubierta } = req.body;
  connection.query('INSERT INTO canchas (nombre, material, cubierta) VALUES (?, ?, ?)', [nombre, material, cubierta], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(`Cancha con ID: ${results.insertId} ha sido agregada`);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM canchas WHERE id = ?', [id], (err, results) => {
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
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, material, cubierta } = req.body;
  connection.query('UPDATE canchas SET nombre = ?, material = ?, cubierta = ? WHERE id = ?', [nombre, material, cubierta, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  connection.query('UPDATE canchas SET ? WHERE id = ?', [updates, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM canchas WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido eliminada`);
  });
});

module.exports = router