// app.js

const express = require('express');
const app = express();
const canchasRouter = require('./src/routes/canchas');
const reservasRouter = require('./src/routes/reservas');
const usuariosRouter = require('./src/routes/usuarios');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/canchas', canchasRouter);
app.use('/reservas', reservasRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;