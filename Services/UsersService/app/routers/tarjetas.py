from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import tarjetas


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.get("/tarjeta", name="Obtener tarjeta")
async def getTarjeta(idTarjeta: int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    #return userData
    tarjeta = tarjetas.getTarjeta(db, idTarjeta, userData['IDUsuario'])
    return { "tarjeta": {**tarjeta.__dict__} } if tarjeta is not None else { "message": "tarjeta no encontrada" }

@router.get("/tarjetas", name="Obtener tarjetas")
async def getTarjetas(db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    #return userData
    _tarjetas = tarjetas.getTarjetas(db, userData['IDUsuario'])
    return { "tarjetas": _tarjetas } if _tarjetas.__len__() > 0 else { "message": "no hay tarjetas asociadas al usuario" }

@router.post("/tarjeta", name="Agregar nueva tarjeta")
async def addTarjeta(tarjeta: schemas.TarjetaCreate, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      tarjetas.addTarjeta(db, userData["IDUsuario"], tarjeta)
      return { "message": "tarjeta creada con éxito" }
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})

@router.put("/tarjeta", name="Actualizar tarjeta")
async def updateTarjeta(idTarjeta:int, tarjeta: schemas.TarjetaUpdate, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = tarjetas.updateTarjeta(db, idTarjeta, userData["IDUsuario"], tarjeta)
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede actualizar la tarjeta" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})

@router.delete("/tarjeta", name="Eliminar tarjeta")
async def deleteTarjeta(idTarjeta:int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = tarjetas.deleteTarjeta(db, idTarjeta, userData["IDUsuario"])
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede eliminar la tarjeta" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})
