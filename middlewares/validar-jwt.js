const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
    //obtener del token  desde el header
    const token = req.header('x-token')
    //valida que contenga token
    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la petición"
        })
    }
    //validación de token
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)
        //agrego una propiedad uid dentro del request para que sea leida desde el controlador metodo delete
        //req.uid = uid
        //si existe
        if (!usuario) {
            return res.status(401).json(
                {
                    msg: "Token no valido - usuario no existe en db"
                }
            )
        }

        //verifica estado true
        if (!usuario.estado) {
            return res.status(401).json(
                {
                    msg: "Token no valido - estado false"
                }
            )
        }
        //esta propiedad estará disponible cuando estas validaciones estén correctas
        req.usuario = usuario


        next()

    } catch (error) {
        res.status(401).json(
            {
                msg: "Token inválido"
            }
        )

    }


}

module.exports = {
    validarJWT
}