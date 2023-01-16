const { response } = require('express')

const usuariosGet = (req, res = response) => {
    const {id, nombre, apikey, page = 10} = req.query;

    res.json({
        msg: 'get API - controlador',
        id,
        nombre,
        apikey,
        page
    });
}

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API - controlador',
        id: id
    });
}

const usuariosPost = (req, res = response) => {
    let {nombre, edad} = req.body;
    nombre = nombre.toUpperCase();
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad,
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
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
