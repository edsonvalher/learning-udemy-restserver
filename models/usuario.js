const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es bligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es bligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']

    },
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    },
})
//con esto excluye los campos __v, password
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)
