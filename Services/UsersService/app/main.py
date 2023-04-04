import uuid
from fastapi import Depends, FastAPI, Header, HTTPException
from .routers import usuarios
from .JWT import code
from .config.envConfig import settings

app = FastAPI()

app.include_router(usuarios.router, prefix='/api', tags=["CRUD Usuarios"])



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

