const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde se usara passport
const Usuarios = require('../models/Usuarios');

// Local Strategy - Login con credenciales propias
passport.use(
    new LocalStrategy(
        // Por defecto passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email
                    }
                });

                // Verificar password
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Email o password incorrecto'
                    });
                }
                return done(null, usuario);
            } catch (error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Email o password incorrecto'
                });
            }
        }
    )
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;