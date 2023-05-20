import express from 'express'
import { buscarOrdenes, buscarOrden, nuevaOrden, editarOrden, eliminarOrden } from '../controllers/order.controller.js';
const router=express.Router()

router.get('/buscarOrdenes', buscarOrdenes)
router.post('/nuevaOrden', nuevaOrden)
router.get('/buscarOrden/:id', buscarOrden)
router.put('/editarOrden/:id', editarOrden)
router.delete('/eliminarOrden/:id', eliminarOrden)

export default router