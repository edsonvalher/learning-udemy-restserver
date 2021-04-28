
const { response } = require('express')

const usuariosGet = (req, res = response) => {

    res.json({
        msg: "GET API - Controlador"
    })
}

const usuariosPost = (req, res = response) => {

    res.json({
        msg: "Post API - Controlador"
    })
}
const usuariosPut = (req, res = response) => {

    res.json({
        msg: "PUT API - Controlador"
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