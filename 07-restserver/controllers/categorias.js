const { response, request } = require("express");
const Categoria = require("../models/categoria");

//obtener categorias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [totalCategorias, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    
    const categoriasConsulta = categorias.length;
    
    res.status(200).json({totalCategorias, categoriasConsulta, categorias});
}

//obtener categorias - populate
const obtenerCategoria = async(req = request, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id);

    res.status(200).json(categoria);
}

const crearCategoria = async(req = request, res = response) => {
    let {nombre} = req.body;
    nombre = nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.Usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

//actualizar categorias
const actualizarCategoria = async(req = request, res = response) => {
    const {id} = req.params;

    let {nombre} = req.body;
    nombre = nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.Usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.status(201).json(categoria);
}

//borrar categorias
const borrarCategoria = async(req = request, res = response) => {
    const {id} = req.params;

    const data = {
        estado: false,
        usuario: req.Usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.status(201).json(categoria);
}

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}