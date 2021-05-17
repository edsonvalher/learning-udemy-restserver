const path = require('path') //obtiene path de mi proyecto
const { response, request } = require('express');





const cargarArchivo = (req = request, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos en la petición' })
        return;
    }


    const { archivo } = req.files

    const uploadPath = path.join(__dirname, '../uploads/', archivo.name)

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