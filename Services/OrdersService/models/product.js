import {Schema, model} from "mongoose";

const productSchema=new Schema({
    Nombre:{
        type: String,
        require: true
    },
    Codigo:{
        type: String,
        require: true
    },
    PrecioBeneficio:{
        type: Number,
        min: 0,
        max: 9999999.99,
        set: value => parseFloat(value).toFixed(2)
    },
    PrecioVenta:{
        type: Number,
        min: 0,
        max: 9999999.99,
        set: value => parseFloat(value).toFixed(2)
    },
    Descripcion:{
        type: String,
        require: true
    },
    RutasImagen:{
        type: String,
        imagePath: {
            original: { type: String, required: true },
            thumbnail: { type: String, required: true }
        },
        require: false
    },
    CreatedAt:{
        type: Date, 
        default: Date.now,
        require: false 
    },
    UpdatedAt:{
        type: Date, 
        default: Date.now,
        require: false 
    }
})

export const Product = model('product', productSchema)