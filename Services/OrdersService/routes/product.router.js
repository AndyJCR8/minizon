import express from 'express'
const router=express.Router()

router.get('/buscarProductos', (req, res)=>{
    res.json({ok: true})
})

router.post('/nuevoProducto', (req, res)=>{
    res.json({ok: true})
})

export default router