const path = require('path') //obtiene path de mi proyecto
const { v4: uuidv4 } = require('uuid')

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files
        //validar extensiones 
        const nombreCortado = archivo.name.split('.') //coloca el nombre en un arreglo
        const extension = nombreCortado[nombreCortado.length - 1] //la uiltima posición del arreglo 
        //valida con las extensiones permitidas
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, ${extensionesValidas}`)
        }
        const nombreTemp = `${uuidv4()}.${extension}`
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(nombreTemp)

        });
    })



}

module.exports = {
    subirArchivo
}