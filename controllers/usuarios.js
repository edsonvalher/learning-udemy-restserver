
const { response, request } = require('express')

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey, page = 1, limit } = req.query //define el 1 como un valor por defecto como ejemplo

    res.json({
        msg: "GET API - Controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    //verfiicar si existe el correo de manera manual
    /*
    const existeEmail = await Usuario.findOne({ correo: correo })
    if (existeEmail) {
        return res.status(400).json({
            msg: 'correo ya existe'
        })
    }
    */

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
const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: "PUT API - Controlador",
        id
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