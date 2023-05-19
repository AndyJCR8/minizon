import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { decode, encode } from '../jwt/encription.js'
const router = express.Router()

router.get('/verifyToken', authMiddleware, async (req, res) => {
  res.json("TokenVerificado")
})

router.post('/decodeToken', authMiddleware, async (req, res) => {
  try {
    if(!req.query.token) { res.status(401).json({ error: 'No se proporcionó un token de autenticación' }); return null; }
    const payload = (await decode(req.query.token)).Payload

    res.json({data: payload, message: "token decodificado correctamente"})

  } catch (error) {
    res.json({message: `Error: ${error.message}`})
  }
})

router.post("/modifyToken", authMiddleware, async (req, res) => {
  try {
    if(!req.query.token) res.status(401).json({ error: 'No se proporcionó un token de autenticación' });

    const payload = (await decode(req.query.token)).Payload

    const newData = { ...payload, "newData": "Dato agregado al token" }
    const token = await encode(newData)
    res.json({token: token, message: "token modificado correctamente"})
    
  } catch (error) {
    res.json({message: `Error: ${error.message}`})
  }
})

router.post('/createToken', async (req, res) => {
  try {
    const token = await encode(req.body, req.body.expiresIn ?? 25200)
    res.json({"token": token})

  } catch (error) {
    res.json({message: `Error: ${error.message}`})
  }
})

export default router