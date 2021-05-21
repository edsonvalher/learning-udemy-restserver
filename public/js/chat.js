const url = (window.location.hostname.includes('localhost')) ? 'http://localhost:8080/api/auth/' : 'https://curso-nodejs-restserver-ed.herokuapp.com/api/auth/'

let usuario = null
let socket = null

//referencia HTML

const txtUid = document.querySelector("#txtUid")
const txtMensaje = document.querySelector("#txtMensaje")
const ulUsuarios = document.querySelector("#ulUsuarios")
const ulMensajes = document.querySelector("#ulMensajes")
const btnSalir = document.querySelector("#btnSalir")



const validarJWT = async () => {
    const token = localStorage.getItem('token') || ''
    if (token.length <= 10) {
        window.location = 'index.html'
        throw new Error('no hay token en el servidor')
    }
    const resp = await fetch(url,
        {
            headers: { 'x-token': token }
        })
    const { usuario: userDB, token: tokenDB } = await resp.json() //*userDB y tokenDB es la manera de renovar un criterio
    //con esto le renovamos la vida al token
    localStorage.setItem('token', tokenDB)
    usuario = userDB
    document.title = usuario.nombre

    await conectarSocket()
}

const conectarSocket = async () => {
    socket = io(
        {
            'extraHeaders': {
                'x-token': localStorage.getItem('token')
            }
        }
    )

    socket.on('connect', () => {
        console.log("socket online")
    })

    socket.on('disconnect', () => {
        console.log("socket offline")
    })

    socket.on('recibir-mensajes', dibujarMensajes) //esto es lo mismo que lo de abajo solo que optimizado
    socket.on('usuarios-activos', (payload) => {
        //console.log(payload)
        dibujarUsuarios(payload)
        //TODO
    })
    socket.on('mensaje-privado', (payload) => {
        console.log('privado', payload)
    })


}
const dibujarMensajes = (mensajes = []) => {

    let mensajesHtml = ''
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajesHtml += `
        <li>
            <p>
                <span class="text-primary">${nombre}:</span>
                <span>${mensaje}</span>
            </p>

        </li>
        `
    })

    ulMensajes.innerHTML = mensajesHtml

}


const dibujarUsuarios = (usuarios = []) => {

    let usersHtml = ''
    usuarios.forEach(({ nombre, uid }) => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>

        </li>
        `
    })

    ulUsuarios.innerHTML = usersHtml

}


txtMensaje.addEventListener('keyup', ({ keyCode }) => {

    const mensaje = txtMensaje.value
    const uid = txtUid.value


    if (keyCode !== 13) { return }
    if (ulMensajes.length === 0) { return }

    socket.emit('enviar-mensaje', { mensaje, uid })
    txtMensaje.value = ''



})

const main = async () => {

    //validar
    await validarJWT()

}
main()
