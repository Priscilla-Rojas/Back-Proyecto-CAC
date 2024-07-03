const express = require('express');
const router = express.Router();
const getAllTurnosCancha = require('../controllers/turnosCanchaController');

router.get('/', getAllTurnosCancha);

module.exports = router;