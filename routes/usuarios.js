const express = require('express');
const router = express.Router();
// const { body } = require('express-validator/check');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/', usuariosController.crearUsuario);
router.post('/login', authController.autenticarUsuario);
router.get('/auth', auth.authUser, authController.usuarioAutenticado);

module.exports = router;