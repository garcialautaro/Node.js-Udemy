const { response, request } = require("express");
const { Producto } = require("../models");

//obtener categorias - paginado - total - populate
const obtenerProductos = async(req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [totalProductos, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    
    const productosConsulta = productos.length;
    
    res.status(200).json({totalProductos, productosConsulta, productos});
}

//obtener categorias - populate
const obtenerProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id);

    res.status(200).json(producto);
}

const crearProducto = async(req = request, res = response) => {
    let {nombre} = req.body;
    nombre = nombre.toUpperCase();
    
    const { precio, 
            categoria,
            descripcion } = req.body;

    const productoDB = await Producto.findOne({nombre});
    if( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.Usuario._id,
        precio,
        categoria,
        descripcion,
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

//actualizar categorias
const actualizarProducto = async(req = request, res = response) => {
    const {id} = req.params;

    let {nombre} = req.body;
    nombre = nombre.toUpperCase();

    const { precio, 
            categoria,
            descripcion } = req.body;

    const data = {  nombre,
                    usuario: req.Usuario._id,
                    precio,
                    categoria,
                    descripcion }

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.status(201).json(producto);
}

//borrar categorias
const borrarProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const data = {
        estado: false,
        usuario: req.Usuario._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.status(200).json(producto);
}

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
}