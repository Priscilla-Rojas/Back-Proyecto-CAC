const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin1234',
  database: 'database_padel'
});

connection.connect((err)=>{
  if(err){
    console.error('Error al conectar con la base de datos ', err);
    return
  }
  console.log('---Base de datos conectada----');

  connection.query('CREATE DATABASE IF NOT EXISTS database_padel', (err, result)=>{
    if (err){
      console.error('Error al crear la base de daatos: ', err);
      return;
    }
    console.log('Base de datos creada');

    connection.changeUser({database:'database_padel'}, (err)=>{
      if(err){
        console.error('Error al buscar la base de datos database_padel: '. err);
        return;
      }
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users( 
          dni NUMERIC PRIMARY KEY, 
          email VARCHAR(40) NOT NULL, 
          name VARCHAR(30) NOT NULL, 
          password VARCHAR(10) NOT NULL, 
          foto VARCHAR(255)
        );
      `;
      connection.query(createTableQuery, (err, result)=>{
        if(err){
          console.error('Error al crear la tabla: ', err);
          return;
        }
        console.log('Tabla Users creada')
      })
    })
  })
})

module.exports = connection;