
const { response, request } = require('express')

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true }

    /*REF
     OPTIMIZACION correr en paralelo para que esto no corra en serie sino en paralelo
    const usuarios = await Usuario.find(filtro) //esto corre en serie
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await Usuario.countDocuments(filtro) //esto corre en serie
    */

    //se desestructura posicionalmente el resultado de las promesas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(filtro),
        Usuario.find(filtro).skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total,
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
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params

    //ESTE ES UN DELETE DEFINITIVO PERO ES MEJOR HACERLO LOGICO
    //const usuario = await Usuario.findByIdAndDelete(id)
    //res.json(usuario)
    //DELETE LOGICO

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    //obtengo la propiedad puesta desde el middleware vlaidar-jwt
    const uid = req.uid
    res.json(
        {
            usuario,
            uid
        }
    )

}

const usuariosPatch = (req, res = response) => {


    res.json({

    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}