import 'dotenv/config'
import "./database/connectdb.js"
import express from "express";
import cors from 'cors'
import path from 'path';
import productRoutes from "./routes/product.router.js"
import orderRoutes from "./routes/order.route.js"
import tokenRoutes from './routes/tokenRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { encode } from './jwt/encription.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors())
app.use('/public', express.static('public'));
// Configura el middleware para servir archivos estáticos desde la carpeta "public"
app.get('/prueba.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'prueba.html'));
  });
  
app.use(express.static('Public'));
app.use(express.json())
app.use('/producto', productRoutes)
app.use('/orden', authMiddleware, orderRoutes)
//app.use('/token', tokenRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT,'0.0.0.0',()=>console.log("http://localhost:"+PORT));