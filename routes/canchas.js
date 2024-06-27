const express = require('express');
const router = express.Router();
const { 
  getAllCanchas, 
  getCanchaById, 
  createCancha, 
  updateCancha, 
  parcialUpdateCancha, 
  deleteCancha}  = require('../controllers/canchaController')

router.get('/', getAllCanchas);

router.get('/:id', getCanchaById);

router.post('/', createCancha);

router.put('/:id', updateCancha);

router.patch('/:id', parcialUpdateCancha);

router.delete('/:id', deleteCancha);

module.exports = router