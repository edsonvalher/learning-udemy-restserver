const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`no existe rol ${rol} en base de datos`)
    }

}
const existeEmail = async (correo) => {
    console.log(correo)
    const existe = await Usuario.findOne({ correo })
    if (existe) {
        throw new Error(`el correo ${correo} ya existe`)
    }
}

const existeUsuarioPorId = async (id) => {
    console.log(correo)
    const existe = await Usuario.findById({ id })
    if (!existe) {
        throw new Error(`el ID ${ID} no existe`)
    }
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}