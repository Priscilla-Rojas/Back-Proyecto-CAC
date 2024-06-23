const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Crear una nueva reserva (Create)
router.post('/', async (req, res) => {
    try {
        const { DNI_usuario, fecha, ID_turno_cancha, estado } = req.body;
        const nuevaReserva = await Reserva.create({ DNI_usuario, fecha, ID_turno_cancha, estado });
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todas las reservas (Read)
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.json(reservas);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener una reserva por ID (Read)
router.get('/:ID', async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.ID);
        if (reserva) {
            res.json(reserva);
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar una reserva (Update)
router.put('/:ID', async (req, res) => {
    try {
        const { DNI_usuario, fecha, ID_turno_cancha, estado } = req.body;
        const [updated] = await Reserva.update(
            { DNI_usuario, fecha, ID_turno_cancha, estado },
            { where: { ID: req.params.ID } }
        );
        if (updated) {
            const updatedReserva = await Reserva.findByPk(req.params.ID);
            res.status(200).json(updatedReserva);
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar una reserva (Delete)
router.delete('/:ID', async (req, res) => {
    try {
        const deleted = await Reserva.destroy({ where: { ID: req.params.ID } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
