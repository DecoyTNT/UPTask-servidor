const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
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

const enviarToken = async (req, res) => {
    console.log('Enviar token');
    try {
        const usuario = await Usuarios.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe esa cuenta'
            });
        }

        usuario.token = crypto.randomBytes(20).toString('hex');
        usuario.expiracion = Date.now() + 3600000;

        await usuario.save();

        // url de reset
        const resetUrl = `http://localhost:3000/reestablecer/${usuario.token}`;

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

const actualizarPassword = async (req, res) => {
    try {
        // Verifica si el token es valido y la fecha de expiración
        const usuario = await Usuarios.findOne({
            where: {
                token: req.params.token,
                expiracion: {
                    [Op.gte]: Date.now()
                }
            }
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya expiro el token'
            });
        }

        // Hashear el password
        usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        usuario.token = null;
        usuario.expiracion = null;

        // guardamos el nuevo password
        await usuario.save();

        res.json({
            ok: true,
            msg: 'Cambiaste tu password correctamente'
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
    usuarioAutenticado,
    enviarToken,
    actualizarPassword
}