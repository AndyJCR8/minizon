import datetime
import jwt
from . import keys

def generateNewToken(payload, exp = 25200):
    expireDate = datetime.datetime.utcnow() + datetime.timedelta(seconds=exp)
    validUntil = expireDate.replace(tzinfo=datetime.timezone.utc).astimezone(tz=None).strftime('%m/%d/%Y %H:%M:%S')
    return jwt.encode({"exp": expireDate, "validUntil": validUntil, **payload}, keys.private_key, algorithm="RS256")

def verifyToken(token):
    
    try:
      result = jwt.decode(token, keys.public_key, algorithms="RS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result

def verifyTokenWithISS(token, issuer: str):
    
    try:
      result = jwt.decode(token, keys.public_key, issuer=issuer, algorithms="RS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result
