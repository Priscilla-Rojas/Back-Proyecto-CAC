const express = require('express');
const router = express.Router();
const {
    getAllReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
} = require('../controllers/reservaController');

// Obtener todas las reservas (Read)
router.get('/', getAllReservas);
// Obtener una reserva por ID (Read
router.get('/:id', getReservaById)
// Crear una nueva reserva (Create)
router.post('/', createReserva);

// Actualizar una reserva (Update)
router.patch('/:id', updateReserva);

// Eliminar una reserva (Delete)
router.delete('/:id', deleteReserva);

module.exports = router;
