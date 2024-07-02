const express = require('express');
const router = express.Router();
const {
    getAllReservas,
    getReservasOrderByDate,
    getReservaById,
    getReservaByUser,
    createReserva,
    updateReserva,
    deleteReserva
} = require('../controllers/reservaController');

// Obtener todas las reservas (Read)
router.get('/', getAllReservas);
// Obtener todas las reservas (Read)
router.get('/orderByDate', getReservasOrderByDate);
// Obtener una reserva por ID (Read
router.get('/:id', getReservaById)
router.get('/user/:mail_usuario', getReservaByUser)
// Crear una nueva reserva (Create)
router.post('/', createReserva);

// Actualizar una reserva (Update)
router.patch('/:id', updateReserva);

// Eliminar una reserva (Delete)
router.delete('/:id', deleteReserva);

module.exports = router;
