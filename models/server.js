
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')
const { socketController } = require('../socket/controller')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        //socket config
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',

        }

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //rutas de mi aplicación
        this.routes()

        //call Sockets
        this.sockets()

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

        //middleware para manejo de carga archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true //con esta configuración se permite crear sub carpetas
        }));


    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    //sockets config
    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))

    }
    listen() {
        //socket config
        //this.app.listen(this.port)
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}
module.exports = Server