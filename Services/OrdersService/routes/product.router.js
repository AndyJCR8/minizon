import express from 'express'
import { todosLosProductos, buscarProducto, nuevoProducto, editarProducto, eliminarProducto, buscarProductos, buscarProductosCat, buscarProductosCatLimit } from '../controllers/product.controller.js';
import multer from 'multer';
import { v4 } from 'uuid'
import { authMiddleware } from '../middlewares/authMiddleware.js';

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

router.get('/productos', todosLosProductos)
router.get('/buscarProductos', buscarProductos)
router.get('/buscarProductosCat', buscarProductosCat)
router.get('/buscarProductosCatLimit', buscarProductosCatLimit)
router.get('/buscarProducto/:id', buscarProducto)

router.post('/nuevoProducto', authMiddleware, upload.single("image"), nuevoProducto)
router.put('/editarProducto/:id', authMiddleware, editarProducto)
router.delete('/eliminarProducto/:id', authMiddleware, eliminarProducto)

export default router 