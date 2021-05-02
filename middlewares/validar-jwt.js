const { response, request } = require('express')
const jwt = require('jsonwebtoken')


const validarJWT = (req = request, res = response, next) => {
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

        //agrego una propiedad uid dentro del request para que sea leida desde el controlador metodo delete
        req.uid = uid

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