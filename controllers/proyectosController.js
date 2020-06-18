const Proyectos = require('../models/Proyectos');

const obtenerProyectos = async (req, res) => {
    console.log('Obteniendo proyectos');
    try {
        const proyectos = await Proyectos.findAll({
            where: {
                usuarioId: req.usuario.id
            }
        });

        res.json({
            ok: true,
            proyectos
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }

}

const proyectoPorId = async (req, res) => {

    try {
        const proyecto = await Proyectos.findOne({
            where: {
                id: req.params.id,
                usuarioId: req.usuario.id
            }
        });

        if (!proyecto) {
            return res.status(400).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            })
        }

        res.json({
            ok: true,
            proyecto
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }

}

const nuevoProyecto = async (req, res) => {
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }

    if (errores.length > 0) {
        console.log('Error');
        return res.status(400).json({
            ok: false,
            errores
        });
    } else {
        const usuarioId = req.usuario.id;
        try {
            const proyecto = await Proyectos.create({ nombre, usuarioId });
            res.json({
                ok: true,
                proyecto
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            })
        }
    }

    // console.log(nombre);
}

const editarProyecto = async (req, res) => {
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }

    if (errores.length > 0) {
        console.log('Error');
        return res.status(400).json({
            ok: false,
            errores
        });
    }

    try {
        await Proyectos.update(req.body, {
            where: {
                id: req.params.id,
                usuarioId: req.usuario.id
            }
        });

        const proyecto = await Proyectos.findOne({
            where: {
                id: req.params.id,
                usuarioId: req.usuario.id
            }
        })
        res.json({
            ok: true,
            proyecto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

const eliminarProyecto = async (req, res) => {
    try {
        await Proyectos.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            ok: true,
            msg: 'Proyecto eliminado'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}


module.exports = {
    nuevoProyecto,
    obtenerProyectos,
    proyectoPorId,
    editarProyecto,
    eliminarProyecto
}