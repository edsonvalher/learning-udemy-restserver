const path = require('path')
const fs = require('fs')

const claudinary = require('cloudinary').v2

claudinary.config(process.env.CLOUDINARY_URL)

const { response, request } = require('express');
const { subirArchivo } = require('../helper');

const { Usuario, Producto } = require('../models')



const cargarArchivo = async (req = request, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs') //undefined toma por defecto los argumentos establecidos jpg, png, etc
        res.json(
            {
                nombre
            }
        )
    } catch (msg) {
        res.status(400).json({ msg })

    }
}
const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo
    switch (coleccion) {

        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un usuario con el id ${id}`
                    }
                )
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un producto con el id ${id}`
                    }
                )
            }

            break;

        default:
            return res.status(500).json(
                {
                    msg: 'Se me olvidó validar esto'
                }
            )
    }

    //limpiar imagenes previas
    if (modelo.img) {
        //borrar imagen de servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)//el cual borra el archivo
        }

    }


    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre

    await modelo.save()


    res.json(
        {
            modelo
        }
    )

}

const mostrarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo
    switch (coleccion) {

        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un usuario con el id ${id}`
                    }
                )
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un producto con el id ${id}`
                    }
                )
            }

            break;

        default:
            return res.status(500).json(
                {
                    msg: 'Se me olvidó validar esto'
                }
            )
    }
    if (modelo.img) {
        //borrar imagen de servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }

    }

    const pathImagen = path.join(__dirname, '../assets', 'no-image.jpg')
    return res.sendFile(pathImagen)



}


const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo
    switch (coleccion) {

        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un usuario con el id ${id}`
                    }
                )
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json(
                    {
                        msg: `No existe un producto con el id ${id}`
                    }
                )
            }

            break;

        default:
            return res.status(500).json(
                {
                    msg: 'Se me olvidó validar esto'
                }
            )
    }

    //limpiar imagenes previas
    if (modelo.img) {
        //borrar imagen de servidor cloud
    }
    const { tempFilePath } = req.files.archivo
    const { secure_url } = await claudinary.uploader.upload(tempFilePath)

    modelo.img = secure_url

    await modelo.save()


    res.json(
        {
            modelo
        }
    )


}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}