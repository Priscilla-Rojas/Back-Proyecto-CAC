const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next)=>{

  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.status(403).send({ auth: false, message: 'No se encontro token'});

  const token = authHeader.split(' ')[0];
  if(!token) return res.status(403).send({ auth: false, message: 'Token mal formado'});
  
  jwt.verify(token, config.secretKey, (err, decoded)=>{
    if(err) return res.status(500).send({ auth: false, message: 'Fallo la autenticacion del token'});
    console.log('decoded: '. decoded)
    req.userId = decoded.dni;
    next();
  })

}