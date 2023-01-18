const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {
    //const {id, nombre, apikey, page = 10} = req.query;

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    
    const [totalUsuarios, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    
    const usuariosConsulta = usuarios.length;

    res.json({
        totalUsuarios,
        usuariosConsulta,
        usuarios
    });
}

const usuariosPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if (password) { 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //ENCRIPTAR PASSWORD
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async(req = request, res = response) => {
    const {id} = req.params;

    const usuarioAuth = req.Usuario;

    //! BORRADO FISICO (NO HACER)
    //! const usuario = await Usuario.findByIdAndDelete(id);

    //? BORRADO LOGICO
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json({
        usuario,
        usuarioAuth
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,

}
