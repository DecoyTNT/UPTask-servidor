const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

module.exports = function () {

    // Proyectos
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


    // Tareas
    router.get('/tareas/proyecto/:proyectoId', tareasController.obtenerTareasProyecto);
    router.post('/tareas', tareasController.nuevaTarea);
    router.put('/tareas/:id', tareasController.editarTarea);
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    return router;
}