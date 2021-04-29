
const { response, request } = require('express')

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))
    res.json({
        usuarios
    })


}

const usuariosPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en base de datos

    await usuario.save()

    res.json({
        msg: "Post API - Controlador",
        usuario
    })
}
const usuariosPut = async (req, res = response) => {

    const id = req.params.id
    //los campos anteriores a los puntos serán excluidos
    const { _id, password, google, correo, ...resto } = req.body

    //TODO validar con base de datos
    if (password) {
        //Encripta contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: "DELETE API - Controlador"
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: "PATCH API - Controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}