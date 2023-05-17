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
        set: value => parseFloat(value).toFixed(2),
        require: true
    },
    PrecioVenta:{
        type: Number,
        min: 0,
        max: 9999999.99,
        set: value => parseFloat(value).toFixed(2),
        require: true
    },
    Descripcion:{
        type: String,
        require: true
    },
    Categoria:{
        type: String,
        require:true
    },
    SubCategoria:{
        type: String,
        require: false
    },
    RutasImagen:{
        type: String,
        imagePath: {
            original: { type: String, required: true },
            thumbnail: { type: String, required: true }
        },
        require: true
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