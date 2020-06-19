const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    // Leer el token del header
    const token = req.header('token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token, permiso denegado'
        });
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    authUser
}