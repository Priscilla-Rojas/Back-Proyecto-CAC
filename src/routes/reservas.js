const express = require('express');
const router = express.Router();
const connection = require('../../db')

// Obtener todas las reservas (Read)
router.get('/', (req, res) => {
    connection.query('SELECT * FROM reserva', (err, results) => {
        if (err) {
        res.status(500).send(err);
        return;
        }
        res.status(200).json(results);
    });
});
// Obtener una reserva por ID (Read
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM reserva WHERE id = ?', [id], (err, results) => {
        if (err) {
        res.status(500).send(err);
        return;
        }
        if (results.length === 0) {
            res.status(404).send('Reserva no encontrada');
            return;
        }
        res.status(200).json(results[0]);
    });
})
// Crear una nueva reserva (Create)
router.post('/', (req, res) => {
    const { DNI_usuario, fecha, ID_turno_cancha, estado } = req.body;
    connection.query('INSERT INTO reserva (DNI_usuario, fecha, ID_turno_cancha, estado) VALUES (?, ?, ?, ?)', [DNI_usuario, fecha, ID_turno_cancha, estado], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        console.log(results)
        res.status(201).send(`La reserva: ${results.insertId} ha sido agregada`);
        });
});

// Actualizar una reserva (Update)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    connection.query('UPDATE reserva SET ? WHERE id = ?', [updates, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
        });
});

// Eliminar una reserva (Delete)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM reserva WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(`Reserva con ID: ${id} ha sido eliminada`);
        });
});

module.exports = router;
