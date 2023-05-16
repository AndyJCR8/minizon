import uuid
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .routers import usuarios, tarjetas, direcciones, pedidos, departamentosMuni, marcas
from .JWT import code
from .config.envConfig import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router, prefix='/api', tags=["CRUD Usuarios"])
app.include_router(tarjetas.router, prefix='/api', tags=["CRUD Tarjetas"])
app.include_router(direcciones.router, prefix='/api', tags=["CRUD Direcciones"])
app.include_router(pedidos.router, prefix='/api', tags=["CRUD Pedidos"])
app.include_router(departamentosMuni.router, prefix='/api', tags=["Departamentos y municipios"])
app.include_router(marcas.router, prefix='/api', tags=["Marcas"])


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

