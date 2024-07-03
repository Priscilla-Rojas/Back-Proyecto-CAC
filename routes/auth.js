const express = require('express');
const router = express.Router();
const { register, login, updateUsername } = require('../controllers/authControler');
const authMIddlerware = require('../middlewares/authMidleware');

router.post('/register', register);
router.post('/login', login);
router.post('/', updateUsername);

router.get('/user', authMIddlerware, (req, res)=>{
  res.status(200).send({auth: true})
});

module.exports = router