const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: [true, 'La categoria es requerida']
    },
    descripcion: {
        type: String,
        default: '',
    },
    disponible: {
        type: Boolean,
        default: true,
    },    
    img: {
        type: String,
    },
})

ProductoSchema.methods.toJSON = function () {
    const {__v, _id, ...producto} = this.toObject();
    producto.pid = _id;
    return producto;
}

module.exports = model( 'Producto' , ProductoSchema)