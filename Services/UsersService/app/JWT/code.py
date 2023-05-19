import datetime
import jwt
from ..config.envConfig import settings

def generateNewToken(payload, exp = 25200):
    expireDate = datetime.datetime.utcnow() + datetime.timedelta(seconds=exp)
    validUntil = expireDate.replace(tzinfo=datetime.timezone.utc).astimezone(tz=None).strftime('%m/%d/%Y %H:%M:%S')
    return jwt.encode({"exp": expireDate, "validUntil": validUntil, **payload}, settings.JWT_PASS, algorithm="HS256")

def verifyToken(token):
    
    try:
      result = jwt.decode(token, settings.JWT_PASS, algorithms="HS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result

def verifyTokenWithISS(token, issuer: str):
    
    try:
      result = jwt.decode(token, settings.JWT_PASS, issuer=issuer, algorithms="HS256")
      #print(result)
    except jwt.InvalidTokenError as e: raise e

    return result
