const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControler');
const authMIddlerware = require('../middlewares/authMidleware');

router.post('/register', register);
router.post('/login', login);
router.get('/pageProtected', authMIddlerware, (req, res)=>{
  res.status(200).send(`Bienvenido usuario: ${req.userId}`)
});

module.exports = router