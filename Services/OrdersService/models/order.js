import mongoose, { Schema, model } from "mongoose";
import { productSchema } from "./product.js";

const orderSchema = new Schema({
    IDUsuario: {
        type: String,
        require: true,
        unique: false
    },
    NIT: {
        type: String,
        require: true
    },
    IDProductos: [productSchema],
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
        unique: false
    },
    Tipo: {
        type: String,
        require: true
    },
    IDDireccion: {
        type: Number,
        require: true
    },
    Direccion: {
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