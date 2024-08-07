const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')
const connection = require('../db/db');

const register = (req, res)=>{
  const { DNI, mail, nombre_completo, pass} = req.body;
  const password = bcrypt.hashSync( pass, 8);
  const sql = 'INSERT INTO Usuario (DNI, mail, nombre_completo, password) VALUES (?, ?, ?, ?)';
  connection.query(sql, [DNI, mail, nombre_completo, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const token = jwt.sign( { id: results.id, mail: results.mail, nombre_completo: results.nombre_completo }, config.secretKey , { expiresIn: config.tokenExpiresIn });
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
      const passwordValid = bcrypt.compareSync(contraseña, results[0].password);
      if (!passwordValid) return res.status(401).send({auth: false, token: null})
      const token = jwt.sign( 
        {
          foto: results[0].foto,
          mail: results[0].mail,
          nombre_completo:results[0].nombre_completo,
          dni: results[0].DNI,
          password: contraseña,
        },
        config.secretKey,
        { expiresIn: config.tokenExpiresIn });

      // res.status(200).send(results);
      res.status(200).send({auth: true, token});
  });
}

const updateUsername = (req, res) => {
  const { token, newUsername, mail } = req.body;

  try {
    const decodedToken = jwt.verify(token, config.secretKey);

    if (decodedToken.mail !== mail) {
      return res.status(403).send({message:'No tienes permisos para modificar este usuario'});
    }
    const sql = 'UPDATE usuario SET nombre_completo = ? WHERE mail = ?';
    connection.query( sql, [newUsername, decodedToken.mail], (error, results) => {
      // console.log(results)
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send({message: 'Nombre de usuario actualizado correctamente', results});
    });
  } catch (error) {
    res.status(401).send('Token inválido');
  }
}

module.exports= {
  register,
  login,
  updateUsername
}