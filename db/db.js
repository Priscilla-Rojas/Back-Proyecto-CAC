const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../config/config')

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('*Error al conectar a la base de datos:', err);
    return;
  }
  console.log('----Conectado a la base de datos--');
});

module.exports = connection;