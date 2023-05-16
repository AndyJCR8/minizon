from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import marcas

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.get("/marcas", name="Obtener marca", dependencies=[Depends(protectedRoute)])
async def getDireccion(db: Session = Depends(getDB)):

    _marcas = marcas.getMarcas(db)
    return { "marcas": _marcas } if _marcas.__len__() > 0 else { "message": "no hay marcas en la base de datos" }
