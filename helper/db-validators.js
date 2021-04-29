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
    const buscar = await Usuario.findOne({ correo })
    if (buscar) {
        throw new Error(`el correo ${correo} ya existe`)
    }
}

module.exports = {
    esRoleValido,
    existeEmail
}