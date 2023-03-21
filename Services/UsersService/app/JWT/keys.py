import os
from cryptography.hazmat.primitives import serialization

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

# Abre el archivo que contiene la clave pública
with open(os.path.join(script_dir, "../TokenKeys/private_key.pem"), 'rb') as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=b'&7!SXlb)n(kh8GO2=]M2'
    )
with open(os.path.join(script_dir, "../TokenKeys/public_key.pem"), 'rb') as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read()
    )
