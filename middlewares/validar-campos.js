const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => { //es lo que hay que llamar cuando el middleware pasa es next
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()//pasa check por check xq son middleware

}


module.exports = {
    validarCampos
}