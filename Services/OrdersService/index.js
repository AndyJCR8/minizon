import 'dotenv/config'
import "./database/connectdb.js"
import express from "express";
import productRoutes from "./routes/product.router.js"
import tokenRoutes from './routes/tokenRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { encode } from './jwt/encription.js';


const app=express();

app.use(express.json())
app.use('/', productRoutes)
app.use('/token', tokenRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log("http://localhost:"+PORT));