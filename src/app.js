require('dotenv').config();

const express = require('express');
const app = express();
const canchaTurnosRouter = require('../routes/turnosCancha');
const reservasRouter = require('../routes/reservas');
const canchasRouter = require('../routes/canchas');
const authRouter = require('../routes/auth')

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/canchas', canchasRouter);
app.use('/canchaTurnos', canchaTurnosRouter);
app.use('/reservas', reservasRouter);
app.use('/auth', authRouter);


module.exports = app