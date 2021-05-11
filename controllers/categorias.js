const { response, request } = require('express')
const { Categoria } = require('../models')

//obtener categorias  - paginado - total - populate

const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(filtro),
        Categoria.find(filtro)
            .populate('usuario', 'nombre') //con esto traigo la referencia relacional --> en este caso el nombre de la tabla usuario
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    })

}

//obtener categoria - populate 
const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json(categoria)
}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    //valida si existe
    const categoriaDB = await Categoria.findOne({ nombre })
    if (categoriaDB) {
        return res.status(400).json(
            {
                msg: `la categoria ${categoriaDB.nombre}, ya existe`
            }
        )
    }
    //generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save()

    return res.status(201).json(
        {
            categoria
        }
    )

}

//actualizar categoria -- el otro nombre no debe existir
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params

    const { estado, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id //dueño del token

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }); //el new devuelve el nuevo registro

    res.json(categoria)


}
//borrar categoria - borrado logico

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(categoriaBorrada)

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}