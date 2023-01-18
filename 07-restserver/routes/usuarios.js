const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        esAdminRol,
        tieneRol } = require('../middlewares/index');

const { esRolValido, 
        correoExiste, 
        usuarioExiste} = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPatch, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router =  Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', "No es un ID valido").isMongoId(),
        check('id').custom( usuarioExiste ),
        check('rol').custom( esRolValido ),
        validarCampos,
] , usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}), 
        check('correo', 'El correo no es valido').isEmail(), 
        check('correo').custom( correoExiste ), 
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USUARIO_ROL']), 
        check('rol').custom( esRolValido ), 
        validarCampos,
] ,usuariosPost);

router.delete('/:id', [
        validarJWT,
        //esAdminRol,
        tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
        check('id', "No es un ID valido").isMongoId(),
        check('id').custom( usuarioExiste ),
        validarCampos,
] , usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;