const Usuarios = require('../models/Usuarios');

const crearUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuarios.create({ email, password });
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    crearUsuario
}