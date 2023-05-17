import express from 'express'
import { buscarProductos, buscarProducto, nuevoProducto, editarProducto, eliminarProducto } from '../controllers/product.controller.js';
const router=express.Router()

router.get('/buscarProductos', buscarProductos)
router.post('/nuevoProducto', nuevoProducto)
router.get('/buscarProducto/:id', buscarProducto)
router.put('/editarProducto/:id', editarProducto)
router.delete('/eliminarProducto/:id', eliminarProducto)

export default router