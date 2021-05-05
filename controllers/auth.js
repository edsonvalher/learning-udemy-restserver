const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helper/generar-jwt')
const { googleVerify } = require('../helper/google-verify')

const login = async (req, res = response) => {

    const { correo, password } = req.body
    const filtro = { estado: true }
    try {
        //verificar si el email existe
        //si el usuario está activo
        const usuario = await Usuario.findOne({ correo })
        if (!usuario || !usuario.estado) {
            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrecto - correo'
                }
            )
        }
        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrecto - password'
                }
            )
        }
        //generar jwt
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "algo salio mal"
        })
    }
}

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body

    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true

            }
            usuario = new Usuario(data)
            await usuario.save()
        }
        //si el usuario en base de datos tiene el estado en false 
        if (!usuario.estado) {
            return res.status(401).json(
                {
                    msg: 'Usuario está bloqueado'
                }
            )
        }

        const token = await generarJWT(usuario.id)
        res.json(
            {
                usuario,
                token
            }
        )

        res.json(
            {
                msg: "Todo ok!",
                googleUser
            }
        )
    } catch (error) {
        res.json.status(400).json(
            {
                msg: 'Token de google no es válido'
            }
        )

    }
}

module.exports = {
    login,
    googleSignIn
}