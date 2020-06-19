const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

const obtenerTareasProyecto = async (req, res) => {
    try {
        const tareas = await Tareas.findAll({
            where: {
                proyectoId: req.params.proyectoId
            }
        });
        res.json({
            ok: true,
            tareas
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

const nuevaTarea = async (req, res) => {
    try {
        const { nombre, proyectoId } = req.body;

        const proyecto = await Proyectos.findOne({
            where: {
                id: proyectoId
            }
        });

        if (!proyecto) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el proyecto'
            });
        }

        const tarea = await Tareas.create({ nombre, proyectoId });

        res.json({
            ok: true,
            tarea
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

const editarTarea = async (req, res) => {
    try {
        await Tareas.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        const tarea = await Tareas.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            ok: true,
            tarea
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

const eliminarTarea = async (req, res) => {
    try {
        await Tareas.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            ok: true,
            msg: 'Tarea eliminada'
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
    obtenerTareasProyecto,
    nuevaTarea,
    editarTarea,
    eliminarTarea
}