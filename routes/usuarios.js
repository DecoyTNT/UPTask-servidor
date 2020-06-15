const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

router.post('/', usuariosController.crearUsuario);
router.post('/login', authController.autenticarUsuario);

module.exports = router;