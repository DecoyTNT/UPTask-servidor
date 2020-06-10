const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {

    router.get('/proyectos', proyectosController.obtenerProyectos);

    router.get('/proyectos/:id', proyectosController.proyectoPorId);

    router.post('/proyectos',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    router.put('/proyectos/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.editarProyecto
    );
    router.delete('/proyectos/:id', proyectosController.eliminarProyecto);

    return router;
}