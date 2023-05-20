import express from 'express'
import { buscarPagos, buscarPago, nuevoPago, editarPago, eliminarPago } from '../controllers/payment.controller.js';
const router=express.Router()

router.get('/buscarPagos', buscarPagos)
router.post('/nuevoPago', nuevoPago)
router.get('/buscarPago/:id', buscarPago)
router.put('/editarPago/:id', editarPago)
router.delete('/eliminarPago/:id', eliminarPago)

export default router