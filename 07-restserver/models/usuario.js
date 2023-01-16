const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'USUARIO_ROL']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
    
})


module.exports = model( 'Usuario' , UsuarioSchema)