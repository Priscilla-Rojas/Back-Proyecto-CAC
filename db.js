const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) {
    console.error('*Error al conectar a la base de datos:', err);
    return;
  }
  console.log('----Conectado a la base de datos--');
});

module.exports = connection;

