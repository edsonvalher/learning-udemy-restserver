
const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT


        //Middlewares
        this.middlewares()

        //rutas de mi aplicación
        this.routes()

    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //directorio publico
        this.app.use(express.static('public'))

    }
    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: "GET Hola mundo"
            })
        })

        this.app.put('/api', (req, res) => {
            res.status(500).json({ //controlando status
                msg: "PUT Hola mundo"
            })
        })
        this.app.post('/api', (req, res) => {
            res.json({
                msg: "POST Hola mundo"
            })
        })
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: "DELETE Hola mundo"
            })
        })
    }

    listen() {
        this.app.listen(this.port)
    }

}
module.exports = Server