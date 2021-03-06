
const { response, request } = require('express')

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

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: "Post API - Controlador",
        nombre,
        edad
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