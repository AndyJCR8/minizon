from fastapi import Depends, APIRouter, HTTPException, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..JWT import code
from ..database.database import SessionLocal
from ..config.envConfig import settings

#DEPENDENCY
def getDB():
    db = SessionLocal()
    try: yield db
    finally: db.close()

bearerScheme = HTTPBearer()
async def protectedRoute(credentials: HTTPAuthorizationCredentials = Depends(bearerScheme)):
    try:
        return code.verifyToken(credentials.credentials)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized, reason: {e}")
    
async def service2Issuer(credentials: HTTPAuthorizationCredentials = Depends(bearerScheme)):
    try:
        code.verifyTokenWithISS(credentials.credentials, issuer=settings.S2_DOMAIN)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized, reason: {e}")

""" async def protectedRouteWithISS(credentials: HTTPAuthorizationCredentials = Depends(bearerScheme), iss: str = "service1.com"):
    try:
        code.verifyTokenWithISS(credentials.credentials, issuer=iss)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized, reason: {str(e)}") """