// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3008;

// app.get('/', (req, res)=>{
//   res.send('<h1>Hola Mundo</h1>')
// });

const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

// GET /canchas
app.get('/canchas', (req, res) => {
  connection.query('SELECT * FROM canchas', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
});

// POST /canchas
app.post('/canchas', (req, res) => {
  const { nombre, material, cubierta } = req.body;
  connection.query('INSERT INTO canchas (nombre, material, cubierta) VALUES (?, ?, ?)', [nombre, material, cubierta], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(`Cancha con ID: ${results.insertId} ha sido agregada`);
  });
});

// GET /canchas/:id
app.get('/canchas/:id', (req, res) => {
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

// PUT /canchas/:id
app.put('/canchas/:id', (req, res) => {
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

// PATCH /canchas/:id
app.patch('/canchas/:id', (req, res) => {
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

// DELETE /canchas/:id
app.delete('/canchas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM canchas WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(`Cancha con ID: ${id} ha sido eliminada`);
  });
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

app.listen(port, ()=>{
  console.log(`**Servidor corriendo en el puerto ${port}**`)
});