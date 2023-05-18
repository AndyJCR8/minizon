export const authMiddleware = (req, res, next) => {
// Verificar la presencia del encabezado de autenticación
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
}

// Extraer el token de autenticación del encabezado
const token = authHeader.split(' ')[1];

// Verificar el token
jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
    return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    // Si el token es válido, adjuntar los datos decodificados a la solicitud para uso posterior
    req.user = decoded;

    // Llamar a la siguiente función de middleware
    next();
});
};  