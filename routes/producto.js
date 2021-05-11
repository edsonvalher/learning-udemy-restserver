const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorId } = require('../helper/db-validators')
const { existeCategoriaPorId } = require('../helper/db-validators')

const router = Router()

// Obtener todas las Productos - publicas
router.get('/', obtenerProductos)
//obtener una Producto por id - publica
//validación personalizada en middleware verfificar si existe, si no existe error
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)
//crear una nueva Producto - privada con cualquier role y token válido POST
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'categoría no tiene un id válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
], crearProducto)

//actualizar - privado- cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos

], actualizarProducto)


//borrar  - privado- solo si es admin con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto)


module.exports = router