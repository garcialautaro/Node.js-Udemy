const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
]

const buscarUsuario = async (termino = '', res = response) => { 
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const nombreOCorreo = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    })
    if(nombreOCorreo) {
        return res.status(200).json({
            results: nombreOCorreo ? [nombreOCorreo] : []
        })
    }
}

const buscarProducto = async (termino = '', res = response) => { 
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.status(200).json({
            results: producto ? [producto] : []
        })
    }
}

const buscarCategoria = async (termino = '', res = response) => { 
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            results: categoria ? [categoria] : []
        })
    }
}

const buscar = (req= request, res = response) => {

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
        break;
        case 'productos':
            buscarProducto(termino, res)
        break;
        case 'categorias':
            buscarCategoria(termino, res)
        break;
        default:
            res.status(500).json({
                msg: `Busqueda no implementada`
            })
    }
}

module.exports = {
    buscar,
}