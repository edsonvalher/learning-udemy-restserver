const { response, request } = require('express');

const cargarArchivo = (req = request, res = response) => {

    res.json({
        msg: "Cargar archivo"
    })

}

module.exports = {
    cargarArchivo
}