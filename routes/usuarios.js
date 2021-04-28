const { Router } = require('express')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const { check } = require('express-validator')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

//validacion de correo middleware
router.post('/',
    [
        check('correo', 'correo no valido').isEmail()
    ]
    , usuariosPost)


router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;