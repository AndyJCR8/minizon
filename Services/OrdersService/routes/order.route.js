import express from 'express'
import { buscarOrdenes, buscarOrden, nuevaOrden, editarOrden, eliminarOrden } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router=express.Router()

router.get('/buscarOrdenes', buscarOrdenes)
router.post('/nuevaOrden', authMiddleware, nuevaOrden)
router.get('/buscarOrden/:id', buscarOrden)
router.put('/editarOrden/:id', authMiddleware, editarOrden)
router.delete('/eliminarOrden/:id', authMiddleware, eliminarOrden)

export default router