const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

// Obtener todas las categorias - publicas
router.get('/', (req, res) => {
    res.json(
        {
            msg: 'get'
        }
    )
})
//obtener una categoria por id - publica
router.get('/:id', (req, res) => {
    res.json(
        {
            msg: 'get Id'
        }
    )
})
//crear una nueva categoria - privada con cualquier role y token válido POST
router.post('/', (req, res) => {
    res.json(
        {
            msg: 'post'
        }
    )
})

//actualizar - privado- cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json(
        {
            msg: 'put'
        }
    )
})


//borrar  - privado- solo si es admin con token valido
router.delete('/:id', (req, res) => {
    res.json(
        {
            msg: 'delete'
        }
    )
})


module.exports = router