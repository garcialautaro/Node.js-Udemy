const { Schema, model } = require('mongoose');

const CategoriaShema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El usuario es requerido']
    }
})

CategoriaShema.methods.toJSON = function () {
    const {__v, _id, ...categoria} = this.toObject();
    categoria.cid = _id;
    return categoria;
}

module.exports = model( 'Categoria' , CategoriaShema)