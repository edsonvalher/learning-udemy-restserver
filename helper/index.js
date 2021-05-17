const dbValidators = require('./db-validators')
const generarJWT = require('./generar-jwt')
const googleVerify = require('./google-verify')
const subirArchivo = require('./subir-archivo')



module.exports = { // los puntos es para exparcir todas sus propiedades asi las puedo tener en el módulo
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}
