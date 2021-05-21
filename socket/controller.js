const { Socket } = require("socket.io")
const { comprobarJWT } = require("../helper")

const { ChatMensajes } = require('../models')

const chatMensajes = new ChatMensajes()

//*solo para fines de desarrollo new Socket()
const socketController = async (socket = new Socket(), io) => {

    //console.log('cliente conectado', socket.id)
    //console.log(socket.handshake.headers['x-token'])
    const token = socket.handshake.headers['x-token']

    const usuario = await comprobarJWT(token)
    if (!usuario) {
        return socket.disconnect()
    }

    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    //Conectarlo a una sala privada
    socket.join(usuario.id)// salas global, socket.id, usuario.id


    //limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {

        if (uid) {

            socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje })

        } else {

            //console.log(payload)
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }


    })




    console.log('Se conecto: ' + usuario.nombre)

}

module.exports = {
    socketController
}