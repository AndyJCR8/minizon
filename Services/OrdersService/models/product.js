import {Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

export const productSchema=new Schema({
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
    Imagen: {
        type: String,
        required: true
    },
    Stock: {
        type: Number,
        require: true
    },
    CreatedAt:{
        type: Date, 
        require: false 
    },
    UpdatedAt:{
        type: Date, 
        require: false 
    }
})

productSchema.plugin(mongoosePaginate)

export const Product = model('product', productSchema)