const Role = require('../models/rol')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const correoExiste = async(correo='') => {
    const existeCorreo = await Usuario.findOne({correo})
    if (existeCorreo) {
        throw new Error(`El email ${correo} ya se encuentra registrado en la DB`);
    }
}

const usuarioExiste = async(id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El usuario con id ${id} no se encuentra registrado en la DB`);
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioExiste,
}