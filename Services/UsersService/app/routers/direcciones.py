from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import direcciones


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.get("/direccion", name="Obtener dirección")
async def getDireccion(idDireccion: int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    #return userData
    direccion = direcciones.getDireccion(db, idDireccion, userData['IDUsuario'])
    return { "direccion": {**direccion.__dict__} } if direccion is not None else { "message": "dirección no encontrada" }

@router.get("/direcciones", name="Obtener direcciones")
async def getDirecciones(db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    #return userData
    _direcciones = direcciones.getDirecciones(db, userData['IDUsuario'])
    return { "direcciones": _direcciones } if _direcciones.__len__() > 0 else { "message": "no hay direcciones asociadas al usuario" }

@router.post("/direccion", name="Crear nueva dirección")
async def addDireccion(direccion: schemas.DireccionCreate, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      direcciones.addDireccion(db, userData["IDUsuario"], direccion)
      return { "message": "dirección creada con éxito" }
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})

@router.put("/direccion", name="Actualizar dirección")
async def updateDireccion(idDireccion:int, direccion: schemas.DireccionUpdate, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = direcciones.updateDireccion(db, idDireccion, userData["IDUsuario"], direccion)
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede actualizar la dirección" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})

@router.delete("/direccion", name="Eliminar dirección")
async def deleteDireccion(idDireccion:int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = direcciones.deleteDireccion(db, idDireccion, userData["IDUsuario"])
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede eliminar la dirección" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})
