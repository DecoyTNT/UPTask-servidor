const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const proyectosController = require('../controllers/proyectosController');
const auth = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/',
    auth.authUser,
    proyectosController.obtenerProyectos
);

router.get('/:id',
    auth.authUser,
    proyectosController.proyectoPorId
);

router.post('/',
    [
        auth.authUser,
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty().trim().escape(),
        validarCampos
    ],
    proyectosController.nuevoProyecto
);

router.put('/:id',
    [
        auth.authUser,
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty().trim().escape(),
        validarCampos
    ],
    proyectosController.editarProyecto
);

router.delete('/:id',
    auth.authUser,
    proyectosController.eliminarProyecto
);

module.exports = router;