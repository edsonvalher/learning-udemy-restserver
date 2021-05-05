const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

//OPTIMIZANDO imports
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helper/db-validators')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('correo', 'correo no valido').isEmail(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom((rol) => esRoleValido(rol)),
        validarCampos
    ], usuariosPut)

//validacion de correo middleware
router.post('/',
    [
        check('nombre', 'nombre es obligatorio').not().isEmpty(), //not es para que valide que no tiene que venir vacio
        check('correo', 'correo no valido').isEmail(),
        check('correo').custom((correo) => existeEmail(correo)),
        check('password', 'password mas de 6 letras').isLength({ min: 6 }),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom((rol) => esRoleValido(rol)), //tambien puede quedar así custom(esRoleValido) porque el argumento obtenido es el mismo que el enviado
        validarCampos
    ]
    , usuariosPost)


router.delete('/:id',
    [
        validarJWT,
        //esAdminRole, //si esto se corre primero da error en la primera validacion
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        //validarCampos

    ],
    usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;