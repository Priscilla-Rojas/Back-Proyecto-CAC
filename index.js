<<<<<<< HEAD
<<<<<<< HEAD
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
=======
=======
>>>>>>> eb4c57f724c4bfd89d982a66f8e91532d0bf8ee2
require('dotenv').config();

const express = require('express');
const app = express();
const usuariosRouter = require('./src/routes/usuarios')
const reservasRouter = require('./src/routes/reservas')
const canchasRouter = require('./src/routes/canchas')

const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use('/canchas', canchasRouter)
// app.use('/usuarios', usuariosRouter)
app.use('/reservas', reservasRouter)

app.listen(PORT, ()=>{
  console.log(`**Servidor corriendo en el puerto ${PORT}**`)
<<<<<<< HEAD
>>>>>>> origen-remoto/Ariel-Cancha
=======
>>>>>>> eb4c57f724c4bfd89d982a66f8e91532d0bf8ee2
});