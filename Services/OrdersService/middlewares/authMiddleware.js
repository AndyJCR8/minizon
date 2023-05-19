import { verify } from "../jwt/encription.js";


export const authMiddleware = async (req, res, next) => {
    // Verificar la presencia del encabezado de autenticación
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    // Extraer el token de autenticación del encabezado
    const token = authHeader.split(' ')[1];
    
    // Verificar el token
    const result = await verify(token)

    if(result.verified) { next() }
    else {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};  