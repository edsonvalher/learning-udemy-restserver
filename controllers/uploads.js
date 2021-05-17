const path = require('path') //obtiene path de mi proyecto
const { v4: uuidv4 } = require('uuid')

const { response, request } = require('express');





const cargarArchivo = (req = request, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos en la petición' })
        return;
    }


    const { archivo } = req.files

    //validar extensiones 

    const nombreCortado = archivo.name.split('.') //coloca el nombre en un arreglo
    const extension = nombreCortado[nombreCortado.length - 1] //la uiltima posición del arreglo 

    //valida con las extensiones permitidas
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

    if (!extensionesValidas.includes(extension)) {
        res.status(400).json(
            {
                msg: `La extension ${extension} no es permitida, ${extensionesValidas}`
            }
        )
    }



    const nombreTemp = `${uuidv4()}.${extension}`
    const uploadPath = path.join(__dirname, '../uploads/', nombreTemp)

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json(
                {
                    msg: err
                }
            );
        }

        res.json(
            {
                msg: 'El archivo ha subido ' + uploadPath
            }
        );
    });


}

module.exports = {
    cargarArchivo
}