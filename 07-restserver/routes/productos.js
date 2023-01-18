const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProducto, 
        obtenerProductos,
        crearProducto, 
        actualizarProducto,
        borrarProducto} = require('../controllers/productos');

const { categoriaExiste, productoExiste } = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        esAdminRol, } = require('../middlewares/index');

const router =  Router();

//Obtener todas las categorias
router.get('/', obtenerProductos);

//Obtener una categoria en particular
router.get('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos,
] ,obtenerProducto);

//Crear una categoria (necesita token)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', "No es un ID valido").isMongoId(),
    check('categoria').custom( categoriaExiste ),
    validarCampos,
], crearProducto);

//Actualizar una categoria (necesita token)
router.put('/:id',[
    validarJWT,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( productoExiste ),
    check('categoria', "No es un ID valido").isMongoId(),
    check('categoria').custom( categoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarProducto);

//Borrar una categoria (necesita token)
router.delete('/:id', [
    validarJWT,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( productoExiste ),
    esAdminRol,
    validarCampos,
] , borrarProducto);
module.exports = router;