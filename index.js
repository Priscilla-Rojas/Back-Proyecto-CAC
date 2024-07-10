const app = require('./src/app');
const { PORT } = require( './config/config');

app.listen(PORT, ()=>{
  console.log(`**Servidor corriendo en el puerto ${PORT}`);
});