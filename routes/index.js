const express = require('express');
const router = express.Router();

module.exports = function () {

    // Proyectos
    router.use('/proyectos', require('./proyectos'));

    // Tareas
    router.use('/tareas', require('./tareas'));

    // Usuarios
    router.use('/usuarios', require('./usuarios'));

    return router;
}