const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn, renovarToken } = require('../controllers/auth')
const { validarCampos, validarJWT } = require('../middlewares')

const router = Router()

router.post('/login',
    [
        check('correo', 'correo debe ser obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login)

router.post('/google',
    [
        check('id_token', 'el id_token es necesario').not().isEmpty(),
        validarCampos
    ], googleSignIn)

router.get('/', validarJWT, renovarToken)

module.exports = router