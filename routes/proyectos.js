const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const proyectosController = require('../controllers/proyectosController');
const auth = require('../middlewares/auth');

router.get('/', auth.authUser, proyectosController.obtenerProyectos);

router.get('/:id', proyectosController.proyectoPorId);

router.post('/',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
);

router.put('/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.editarProyecto
);

router.delete('/:id', proyectosController.eliminarProyecto);

module.exports = router;