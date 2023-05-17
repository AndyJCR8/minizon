import express from 'express'
import { buscarProductos, buscarProducto, nuevoProducto, editarProducto, eliminarProducto } from '../controllers/product.controller.js';
const router=express.Router()

router.get('/buscarProductos', buscarProductos)
router.get('/buscarProducto', buscarProducto)
router.post('/nuevoProducto', nuevoProducto)
router.put('/editarProducto', editarProducto)
router.delete('/eliminarProducto', eliminarProducto)

export default router