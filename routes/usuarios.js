const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/', usuariosController.crearUsuario);
router.post('/login', authController.autenticarUsuario);
router.get('/auth',
    auth.authUser,
    authController.usuarioAutenticado
);
router.post('/reestablecer', authController.enviarToken);
router.post('/reestablecer/:token', authController.actualizarPassword);

module.exports = router;