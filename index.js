const express = require('express');
const app = express();
const port = process.env.PORT || 3008;

app.get('/', (req, res)=>{
  res.send('<h1>Hola Mundo</h1>')
});

app.listen(port, ()=>{
  console.log(`**Servidor corriendo en el puerto ${port}**`)
});