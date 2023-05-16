import {Schema, model} from "mongoose";

const paymentSchema=new Schema({
    IDTarjeta: {
        type: String,
        require: true,
        unique: true
    },
    Tipo:{
        type: String,
        require: true
    }

})

export const Payment = model('payment', paymentSchema)