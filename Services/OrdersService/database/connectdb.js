import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Conexión exitosa a Base de Datos")
} catch (error) {
    console.log("Error de conexión a Base de Datos: "+error)
}
