const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')
const connection = require('../db/db');

const register = (req, res)=>{
  const { DNI, mail, nombre_completo, password, foto} = req.body;
  const contraseña = bcrypt.hashSync( password, 8);
  const sql = 'INSERT INTO Usuario (DNI, mail, nombre_completo, contraseña, foto) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [DNI, mail, nombre_completo, contraseña, foto], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const token = jwt.sign( { id: results.insertId }, config.secretKey , { expiresIn: config.tokenExpiresIn });
    res.status(201).send({ auth: true, token });
  });
}
const login = (req, res)=>{
  const { mail, contraseña } = req.body;
  const sql = 'SELECT * FROM usuario WHERE mail = ?';
  connection.query( sql, [mail], (err, results) => {
      if (err) {
      res.status(500).send(err);
      return;
      }
      if (results.length === 0) {
          res.status(404).send('usuario no encontrado');
          return;
      }
      // console.log(results)
      const passwordValid = bcrypt.compareSync(contraseña, results[0].contraseña);
      if (!passwordValid) return res.status(401).send({auth: false, token: null})
      
      const token = jwt.sign( { id: results[0].insertId }, config.secretKey , { expiresIn: config.tokenExpiresIn });

      // res.status(200).send(results[0]);
      res.status(200).send({auth: true, token});
  });
}

module.exports= {
  register,
  login
}