const { Router } = require('express')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const { check } = require('express-validator')
const Role = require('../models/role')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

//validacion de correo middleware
router.post('/',
    [
        check('nombre', 'nombre es obligatorio').not().isEmpty(), //not es para que valide que no tiene que venir vacio
        check('correo', 'correo no valido').isEmail(),
        check('password', 'password mas de 6 letras').isLength({ min: 6 }),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(async (rol = '') => {
            const existeRol = await Role.findOne({ rol })
            if (!existeRol) {
                throw new Error(`no existe rol ${rol} en base de datos`)
            }

        }),
        validarCampos
    ]
    , usuariosPost)


router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;