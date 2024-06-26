const express = require('express');
const router = express.Router();

const canchaRoutes = require('./cancha');
const usuarioRoutes = require('./usuarios');
const reservaRoutes = require('./reservas');

router.use('/canchas', canchaRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/reservas', reservaRoutes);

module.exports = router;
