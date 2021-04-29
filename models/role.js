const { Schema, model } = require('mongoose')

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es bligatorio']
    },

})

module.exports = model('Role', RolSchema)