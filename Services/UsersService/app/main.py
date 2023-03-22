from fastapi import Depends, FastAPI
from .routers import users
from .JWT import code
from .config.envConfig import settings

app = FastAPI()

app.include_router(users.router)

@app.get('/')
async def root():
    token = code.generateNewToken({"some": "payload"}, 61)
    #decodedToken = code.verifyToken(token[:-2] + "12")
    decodedToken = code.verifyToken(token)
    return {
        "data": {
            "Token": token,
            "DecodedRes": decodedToken,
            "DBName": settings.DB_NAME
        }
    }

@app.get("/verify")
async def verifyToken(token: str):
    decodedToken = code.verifyToken(token)
    return {
        "info": decodedToken
    }