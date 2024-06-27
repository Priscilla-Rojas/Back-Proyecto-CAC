// config/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'tu_usuario',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  database: process.env.DB_NAME || 'nombre_de_tu_base_de_datos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;

