from fastapi import Depends, FastAPI
from .routers import users
from .JWT import code
from .config.envConfig import settings

app = FastAPI()

app.include_router(users.router)

@app.get('/')
async def root():
    token = code.generateNewToken({"some": "payload"})
    #decodedToken = code.verifyToken(token[:-2])
    decodedToken = code.verifyToken(token)
    return {
        "data": {
            "Token": token,
            "Decoded": decodedToken,
            "DBName": settings.DB_NAME
        }
    }