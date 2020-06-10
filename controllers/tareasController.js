const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

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

module.exports = {
    nuevaTarea
}