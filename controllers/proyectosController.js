const proyectosHome = (req, res) => {
    res.send('Hola');
}

const nuevoProyecto = (req, res) => {
    const { nombre } = req.body;
    console.log('Hola', req.body);

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }

    if (errores.length > 0) {
        console.log('Error');
        return res.status(400).json({
            errores
        });
    }

    // console.log(nombre);
    return res.json({
        nombre
    });
}

module.exports = {
    proyectosHome,
    nuevoProyecto
}