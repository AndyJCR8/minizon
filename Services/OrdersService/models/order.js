import {Schema, model} from "mongoose";

const orderSchema=new Schema({
    IDUsuario: {
        type: String,
        require: true,
        unique: true
    },
    IDProductos: [{ 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'payment',
        require: true
    }],
    CodigoPedido:{
        type: Number,
        require: true
    },
    EstadoPedido:{
        type: String,
        require: true
    }

})

export const Order = model('order', orderSchema)