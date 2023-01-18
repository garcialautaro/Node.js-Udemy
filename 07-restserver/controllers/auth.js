const { response, request } = require('express')
const bcryptjs = require('bcryptjs');
var Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const {password, correo} = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo / Password incorrecto',
            })
        }

        //verificar que el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario inhabilitado',
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) { 
            return res.status(400).json({
                msg: 'Password / Correo incorrecto',
            })
        }
        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Algo salio mal',
        })
    }


}

module.exports = {
    login,
}