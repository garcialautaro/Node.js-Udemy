const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCategorias, 
        crearCategoria, 
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');
const { categoriaExiste } = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        esAdminRol, } = require('../middlewares/index');

const router =  Router();

//Obtener todas las categorias
router.get('/', obtenerCategorias);

//Obtener una categoria en particular
router.get('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos,
] ,obtenerCategoria);

//Crear una categoria (necesita token)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria);

//Actualizar una categoria (necesita token)
router.put('/:id',[
    validarJWT,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( categoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCategoria);

//Borrar una categoria (necesita token)
router.delete('/:id', [
    validarJWT,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( categoriaExiste ),
    esAdminRol,
    validarCampos,
] , borrarCategoria);
module.exports = router;