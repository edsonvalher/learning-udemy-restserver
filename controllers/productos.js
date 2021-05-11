const { response, request } = require('express')
const { Producto } = require('../models')

//obtener Productos  - paginado - total - populate

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(filtro),
        Producto.find(filtro)
            .populate('usuario', 'nombre') //con esto traigo la referencia relacional --> en este caso el nombre de la tabla usuario
            .populate('categoria', 'nombre') //con esto traigo la referencia relacional --> en este caso el nombre de la tabla categoria
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
}

//obtener Producto - populate 
const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    res.json(producto)
}


const crearProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body
    //valida si existe
    const productoDB = await Producto.findOne({ nombre: body.nombre })
    if (productoDB) {
        return res.status(400).json(
            {
                msg: `El Producto ${productoDB.nombre}, ya existe`
            }
        )
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    await producto.save()

    return res.status(201).json(
        {
            producto
        }
    )


}

//actualizar Producto -- el otro nombre no debe existir
const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params

    const { estado, usuario, ...data } = req.body

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id //dueño del token

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true }); //el new devuelve el nuevo registro

    res.json(producto)


}
//borrar Producto - borrado logico

const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(productoBorrado)
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}