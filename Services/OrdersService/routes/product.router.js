import express from 'express'
import { buscarProductos, buscarProducto, nuevoProducto, editarProducto, eliminarProducto } from '../controllers/product.controller.js';
import multer from 'multer';
import { v4 } from 'uuid'

const router=express.Router()

const storage = multer.diskStorage({
  destination: "public/",
  filename: function(req, file, cb) {
    const extension = file.originalname.split(".").pop()
    const filename = `${v4()}.${extension}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get('/buscarProductos', buscarProductos)
router.post('/nuevoProducto', upload.single("image"), nuevoProducto)
router.get('/buscarProducto/:id', buscarProducto)
router.put('/editarProducto/:id', editarProducto)
router.delete('/eliminarProducto/:id', eliminarProducto)

export default router 