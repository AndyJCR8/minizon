import jwt
import os
from fastapi import Depends, FastAPI
from .routers import users
from cryptography.hazmat.primitives import serialization

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

# Abre el archivo que contiene la clave pública
with open(os.path.join(script_dir, "./TokenKeys/private_key.pem"), 'rb') as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=b'&7!SXlb)n(kh8GO2=]M2'
    )
with open(os.path.join(script_dir, "./TokenKeys/public_key.pem"), 'rb') as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read()
    )

app = FastAPI()

app.include_router(users.router)

@app.get('/')
async def root():
    encoded = jwt.encode({"some": "payload"}, private_key, algorithm="RS256")
    return [{"message": "hola mundo desde FastAPI"}, { "token:": encoded }]