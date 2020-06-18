const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un email válido'
            },
            notEmpty: {
                msg: 'El email es obligatorio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password es obligatorio'
            }
        }
    },
    token: {
        type: Sequelize.STRING
    },
    expiracion: {
        type: Sequelize.DATE
    }
},
    {
        hooks: {
            beforeCreate(usuario) {
                usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            }
        }
    }
);

// // Métodos personalizados
// Usuarios.prototype.verificarPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

// Excluir el password, para no retornarlo
Usuarios.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
}

// Un usuario puede crear multiples proyectos
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;