import datetime
import jwt
from . import keys

def generateNewToken(payload, exp = 25200):
    expireDate = datetime.datetime.utcnow() + datetime.timedelta(seconds=exp)
    return jwt.encode({"exp": expireDate, **payload}, keys.private_key, algorithm="RS256")

def verifyToken(token):
    
    try:
      result = jwt.decode(token, keys.public_key, algorithms="RS256")
    except jwt.exceptions.InvalidSignatureError:
      result = {"signature": "invalid"}
    except jwt.exceptions.ExpiredSignatureError:
      result = {"token": "expired"}
    except Exception as e: result = { "error": f"an error has occurred: {e}" }

    return result
