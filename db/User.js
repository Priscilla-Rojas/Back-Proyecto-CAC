const { error } = require('console');
const db = require('../src/db');

const getUser = (req, res)=>{
  const { id } = req.params;

  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (error, result)=>{
    if(error) console.log(error);
    res.json(result);
  })
}
const newUser = (req, res)=>{
  
}