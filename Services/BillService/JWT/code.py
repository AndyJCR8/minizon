import datetime
import jwt

import os
import sys

# Obtiene la ruta absoluta del directorio actual
current_dir = os.path.dirname(os.path.abspath(__file__))

# Agrega la ruta del directorio actual al sistema de rutas de Python
sys.path.append(current_dir)
from config.envConfig import settings

def generateNewToken(payload, exp = 25200):
    expireDate = datetime.datetime.utcnow() + datetime.timedelta(seconds=exp)
    validUntil = expireDate.replace(tzinfo=datetime.timezone.utc).astimezone(tz=None).strftime('%m/%d/%Y %H:%M:%S')
    return jwt.encode({"exp": expireDate, "validUntil": validUntil, **payload}, settings.JWT_PASS, algorithm="HS256")

def verifyToken(token):
    
    try:
      print("HOLA MUNDO: ", settings.JWT_PASS)
      result = jwt.decode(token, '&7!SXlb)n(kh8GO2=]M2', algorithms="HS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result

def verifyTokenWithISS(token, issuer: str):
    
    try:
      result = jwt.decode(token, settings.JWT_PASS, issuer=issuer, algorithms="HS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result
