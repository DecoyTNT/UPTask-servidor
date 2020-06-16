const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {

        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos de acceso incorrectos'
            })
        }

        const passCorrecto = await bcrypt.compareSync(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos de acceso incorrectos'
            })
        }

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            // 60 segundos,
            // 60 minutos
            expiresIn: 60 * 60
        }, (err, token) => {
            if (err) throw err;
            res.json({
                ok: true,
                token,
                usuario
            })
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

const usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({
            where: {
                id: req.usuario.id
            }
        });
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    autenticarUsuario,
    usuarioAutenticado
}