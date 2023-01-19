const { response } = require("express");
const path = require("path");
const fs = require("fs");

const { subirArchivo } = require("../helpers/subir-archivo");
const {Usuario, Producto} = require("../models/index");

const cargarArchivo = async(req, res = response) => {

    try {
    const pathCompleto = await subirArchivo(req.files, ['jpg', 'jpeg', 'gif', 'png'], 'cosas')
    res.status(201).json({
        msg: `Archivo '${pathCompleto}' subido correctamente.`
    })
    } catch (msg) {
        res.status(400).json({ msg})
    }
}

const actualizarImagen = async(req, res = response) => {

    const {id, coleccion} = req.params;
    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe el producto'
                })
            }
        break;

        default:
            return res.status(500).json({ 
                msg: 'Invalid coleccion'
            });
    }

    //Limpiar imagenes previas: 
    try {
        if (modelo.img) {

            //Borrar imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }

        }
    }catch (e) {
        console.log(e);
    }


    const nombre = await subirArchivo(req.files, ['jpg', 'jpeg', 'gif', 'png'], coleccion)
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
}

const mostrarImagen = async (req, res = response) => {
    const {id, coleccion} = req.params;
    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe el producto'
                })
            }
        break;

        default:
            return res.status(500).json({ 
                msg: 'Invalid coleccion'
            });
    }

    //Limpiar imagenes previas: 
    try {
        if (modelo.img) {
            //Descargar imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)) {
                return res.status(200).sendFile(pathImagen)
            }
        }
    }catch (e) {
        console.log(e);
    }

    const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg');
    return res.status(200).sendFile(pathNoImagen)
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}