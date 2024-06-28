const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const connection = require('../db/db');

// Ver todos los usuarios
const getAllUsuarios = (req, res) => {
  const sql = 'SELECT * FROM usuario';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(results);
  });
};

// Crear un usuario
const registerUsuario = (req, res)=>{
  const { DNI, mail, nombre_completo, password, foto} = req.body;
  const contraseña = bcrypt.hashSync( password, 8);
  const sql = 'INSERT INTO Usuario (DNI, mail, nombre_completo, contraseña, foto) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [DNI, mail, nombre_completo, contraseña, foto], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(config.tokenExpiresIn)
    const token = jwt.sign( { id: results.insertId }, config.secretKey , { expiresIn: config.tokenExpiresIn });
    res.status(201).send({ auth: true, token });
  });
}
const loginUsuario = (req, res)=>{
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
// Actualizar un usuario
const updateUsuario = (req, res) => {
  const { DNI, mail, nombre_completo, contraseña, foto } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE Usuario SET DNI = ?, mail = ?, nombre_completo = ?, contraseña = ?, foto = ? WHERE id = ?';
  connection.query(sql, [DNI, mail, nombre_completo, contraseña, foto, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.status(200).json({ id, DNI, mail, nombre_completo, contraseña, foto });
  });
};

// Eliminar un usuario
const deleteUsuario = (req, res) => {
  const { DNI } = req.params;
  const sql = 'DELETE FROM usuario WHERE DNI = ?';
  connection.query(sql, [DNI], (err, results) => {
    console.log(results)
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send(`usuario con ${DNI} no encontrado`);
      return;
    }
    res.status(200).send(`Usuario con dni: ${DNI}, eliminado`);
  });
};

module.exports = {
  getAllUsuarios,
  registerUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario
};
