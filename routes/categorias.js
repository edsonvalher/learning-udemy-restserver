const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helper/db-validators')

const router = Router()

// Obtener todas las categorias - publicas
router.get('/', obtenerCategorias)
//obtener una categoria por id - publica
//validación personalizada en middleware verfificar si existe, si no existe error
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)
//crear una nueva categoria - privada con cualquier role y token válido POST
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//actualizar - privado- cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

], actualizarCategoria)


//borrar  - privado- solo si es admin con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),



], borrarCategoria)


module.exports = router