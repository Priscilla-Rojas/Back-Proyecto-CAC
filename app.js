const express = require('express');
const app = express();
const userRoutes = require('./routes/usuarios')
const port = process.env.PORT || 3008;

app.use(express.json());
app.use('/user', userRoutes);

app.listen(port, ()=>{
  console.log(`**Servidor corriendo en el puerto ${port}**`)
})