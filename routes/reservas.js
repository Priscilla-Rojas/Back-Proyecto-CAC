const express = require('express');
const router = express.Router();
const {
    getAllReservas,
<<<<<<< HEAD
    getReservasOrderByDate,
=======
>>>>>>> 343c37b (Cambiando Estructura en Rama Daniela)
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
} = require('../controllers/reservaController');

// Obtener todas las reservas (Read)
router.get('/', getAllReservas);
<<<<<<< HEAD
// Obtener todas las reservas (Read)
router.get('/orderByDate', getReservasOrderByDate);
=======
>>>>>>> 343c37b (Cambiando Estructura en Rama Daniela)
// Obtener una reserva por ID (Read
router.get('/:id', getReservaById)
// Crear una nueva reserva (Create)
router.post('/', createReserva);

// Actualizar una reserva (Update)
router.patch('/:id', updateReserva);

// Eliminar una reserva (Delete)
router.delete('/:id', deleteReserva);

module.exports = router;
