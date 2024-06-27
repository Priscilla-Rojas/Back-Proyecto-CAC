const express = require('express');
const router = express.Router();
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuarioController');

// Obtener todos los usuarios (Read)
router.get('/', getAllUsuarios);
// Obtener un usuario por ID (Read)
router.get('/:id', getUsuarioById);
// Crear un nuevo usuario (Create)
router.post('/', createUsuario);
// Actualizar un usuario (Update)
router.patch('/:id', updateUsuario);
// Eliminar un usuario (Delete)
router.delete('/:id', deleteUsuario);

module.exports = router;
