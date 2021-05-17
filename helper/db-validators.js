
const { dbConnection } = require('../database/config')
const { Role, Usuario, Categoria, Producto } = require('../models')

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`no existe rol ${rol} en base de datos`)
    }

}
const existeEmail = async (correo) => {
    const existe = await Usuario.findOne({ correo })
    if (existe) {
        throw new Error(`el correo ${correo} ya existe`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existe = await Usuario.findById({ id })
    if (!existe) {
        throw new Error(`el ID ${ID} no existe`)
    }
}

const existeCategoriaPorId = async (id) => {
    const existe = await Categoria.findById(id)
    if (!existe) {
        throw new Error(`el ID ${id} no existe`)
    }
}
const existeProductoPorId = async (id) => {
    const existe = await Producto.findById(id)
    if (!existe) {
        throw new Error(`el ID ${id} no existe`)
    }
}

//Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)
    if (!incluida) {
        throw new Error(`La coleccion  '${coleccion}' no es permitida, ${colecciones}`)
    }
    return true

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas

}