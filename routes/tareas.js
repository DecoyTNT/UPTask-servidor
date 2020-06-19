const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const auth = require('../middlewares/auth');

router.get('/proyecto/:proyectoId',
    auth.authUser,
    tareasController.obtenerTareasProyecto
);
router.post('/',
    tareasController.nuevaTarea
);
router.put('/:id',
    auth.authUser,
    tareasController.editarTarea
);
router.delete('/:id',
    auth.authUser,
    tareasController.eliminarTarea
);

module.exports = router;