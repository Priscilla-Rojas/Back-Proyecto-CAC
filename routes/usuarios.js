const express = require('express');
const router = express.Router();
const {
  getAllUsuarios,
  registerUsuario,
  updateUsuario,
  loginUsuario,
  deleteUsuario
} = require('../controllers/authUsuarioController');

router.get('/', getAllUsuarios);
router.get('/login', loginUsuario);
router.post('/register', registerUsuario);
router.delete('/:DNI', deleteUsuario);

module.exports = router;