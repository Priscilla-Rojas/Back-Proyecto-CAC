const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reserva = sequelize.define('Reserva', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    DNI_usuario: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'DNI'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ID_turno_cancha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Turnos_Cancha',
            key: 'ID'
        }
    },
    estado: {
        type: DataTypes.ENUM('Reservada', 'Cumplida', 'Cancelada'),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'Reserva'
});

module.exports = Reserva;
