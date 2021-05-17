
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',

        }

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //rutas de mi aplicación
        this.routes()

    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //parseo y lectura de body
        this.app.use(express.json())//con esto serializa el objeto

        //directorio publico
        this.app.use(express.static('public'))

    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port)
    }

}
module.exports = Server