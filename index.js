const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('./config/passport');

// Crear la conexión a la base de datos
const db = require('./config/db');

// import el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());

app.use(cors());

app.use('/', routes());

app.listen(4000);