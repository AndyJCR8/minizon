import uuid
from fastapi import Depends, FastAPI, Header, HTTPException
from .routers import usuarios, tarjetas, direcciones, pedidos
from .JWT import code
from .config.envConfig import settings

app = FastAPI()

app.include_router(usuarios.router, prefix='/api', tags=["CRUD Usuarios"])
app.include_router(tarjetas.router, prefix='/api', tags=["CRUD Tarjetas"])
app.include_router(direcciones.router, prefix='/api', tags=["CRUD Direcciones"])
app.include_router(pedidos.router, prefix='/api', tags=["CRUD Pedidos"])


@app.get('/')
async def root():
    token = code.generateNewToken({"sub": str(uuid.uuid4()), "iss": "localhost:8000"}, 7200)
    #decodedToken = code.verifyToken(token[:-2] + "12")
    decodedToken = code.verifyToken(token)
    return {
        "data": {
            "Token": token,
            "DecodedRes": decodedToken,
            "DBName": settings.DB_NAME
        }
    }

@app.get("/api/verify")
async def verifyToken(token: str):
    decodedToken = code.verifyToken(token)
    return {
        "info": decodedToken
    }

