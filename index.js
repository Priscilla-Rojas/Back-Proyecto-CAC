<<<<<<< HEAD
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
=======
require('dotenv').config();

const express = require('express');
const app = express();
const canchasRouter = require('./src/routes/canchas')

const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use('/canchas', canchasRouter)

app.listen(PORT, ()=>{
  console.log(`**Servidor corriendo en el puerto ${PORT}**`)
>>>>>>> origen-remoto/Ariel-Cancha
});