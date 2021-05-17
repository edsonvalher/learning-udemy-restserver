const { response, request } = require('express')
const { ObjectId } = require('mongoose').Types

const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esmongoID = ObjectId.isValid(termino)
    if (esmongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    //expresion regulares
    const regex = new RegExp(termino, 'i') //insensible a las minusculas o mayusculas y texto parecidos a los terminos

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    })

    const cantidad = await Usuario.count({
        $or: [{ nombre: regex }, { correo: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    })

    res.json(
        {
            cantidad,
            results: usuarios
        }
    )
}

const buscarCategorias = async (termino = '', res = response) => {

    const esmongoID = ObjectId.isValid(termino)
    if (esmongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    //expresion regulares
    const regex = new RegExp(termino, 'i') //insensible a las minusculas o mayusculas y texto parecidos a los terminos

    const categorias = await Categoria.find({
        $or: [{ nombre: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    })

    const cantidad = await Categoria.count({
        $or: [{ nombre: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    })

    res.json(
        {
            cantidad,
            results: categorias
        }
    )
}


const buscarProducto = async (termino = '', res = response) => {

    const esmongoID = ObjectId.isValid(termino)
    if (esmongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre').populate('usuario', 'nombre') //este populate es para mostrar joins de campos
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    //expresion regulares
    const regex = new RegExp(termino, 'i') //insensible a las minusculas o mayusculas y texto parecidos a los terminos

    const productos = await Producto.find({
        $or: [{ nombre: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    }).populate('categoria', 'nombre').populate('usuario', 'nombre') //este populate es para mostrar joins de campos

    const cantidad = await Producto.count({
        $or: [{ nombre: regex }], //este sirve para buscar por varios campos tomando en cuenta la expresion regular 
        $and: [{ estado: true }] //y toma en cuenta el estado
    })

    res.json(
        {
            cantidad,
            results: productos
        }
    )
}
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
            break

        case 'productos':
            buscarProducto(termino, res)
            break

        case 'usuarios':
            buscarUsuarios(termino, res)
            break


        default:
            res.status(500).json(
                {
                    msg: "Se le olvido hacer esta busqueda"
                }
            )
            break
    }


}

module.exports = {
    buscar
}