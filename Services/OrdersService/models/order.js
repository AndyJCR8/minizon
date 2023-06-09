import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
    IDUsuario: {
        type: String,
        require: true
    },
    NIT: {
        type: String,
        require: true
    },
    IDProductos: [{
        producto: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'payment',
            require: true
        },
        cantidad: {
            type: Number,
            require: true
        }
    }],
    CodigoPedido: {
        type: Number,
        require: true
    },
    EstadoPedido: {
        type: String,
        require: true
    },
     IDTarjeta: {
        type: String,
        require: true,
        unique: true
    },
    Tipo: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: Date,
        require: false
    },
    UpdatedAt: {
        type: Date,
        require: false
    }
});

export const Order = model('order', orderSchema);