const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('Tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
// Una tarea pertenece a un proyecto
Tareas.belongsTo(Proyectos);

module.exports = Tareas;