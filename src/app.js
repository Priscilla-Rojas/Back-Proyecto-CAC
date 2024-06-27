require('dotenv').config();

const express = require('express');
const app = express();
const usuariosRouter = require('../routes/usuarios');
const canchaTurnosRouter = require('../routes/turnosCancha');
const reservasRouter = require('../routes/reservas');
const canchasRouter = require('../routes/canchas');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/canchas', canchasRouter);
app.use('/canchaTurnos', canchaTurnosRouter);
// app.use('/usuarios', usuariosRouter)
app.use('/reservas', reservasRouter);


module.exports = app