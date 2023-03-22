import os
from cryptography.hazmat.primitives import serialization
from ..config.envConfig import settings

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

# Abre el archivo que contiene la clave pública
with open(os.path.join(script_dir, f"../TokenKeys/{settings.PVK_NAME}.pem"), 'rb') as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=bytes(settings.JWT_PASS, 'utf-8')
    )
with open(os.path.join(script_dir, f"../TokenKeys/{settings.PBK_NAME}.pem"), 'rb') as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read()
    )
