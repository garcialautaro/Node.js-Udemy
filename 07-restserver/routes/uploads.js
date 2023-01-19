const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, 
        validarUndefined } = require('../middlewares');

const { cargarArchivo, 
        actualizarImagen, 
        mostrarImagen} = require('../controllers/uploads');

const { coleccionesPermitidas } = require('../helpers/db-validators');

const router =  Router();

router.post('/', validarUndefined , cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id es incorrecto').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarUndefined,
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El id es incorrecto').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)
module.exports = router;