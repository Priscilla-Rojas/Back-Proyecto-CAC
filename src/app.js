const express = require('express');
const app = express();
const routes = require('./src/routes');
const sequelize = require('./db');

// Middlewares
app.use(express.json());

// Routes
app.use('/api', routes);

// Sincronización con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });

module.exports = app;
