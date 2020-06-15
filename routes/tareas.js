const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const tareasController = require('../controllers/tareasController');

router.get('/proyecto/:proyectoId', tareasController.obtenerTareasProyecto);
router.post('/', tareasController.nuevaTarea);
router.put('/:id', tareasController.editarTarea);
router.delete('/:id', tareasController.eliminarTarea);

module.exports = router;