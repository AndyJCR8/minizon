from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from . import clearUpdateValuesFromDict
from .. import models, schemas


def getDireccion(db: Session, idDireccion: int, idUsuario: int):
    return db.query(models.Direccion).filter_by(IDDireccion = idDireccion, IDUsuario = idUsuario)\
      .options(joinedload(models.Direccion.municipio).joinedload(models.Municipio.departamento)).first()

def getDirecciones(db: Session, idUsuario: int):
    return db.query(models.Direccion).filter_by(IDUsuario = idUsuario)\
      .options(joinedload(models.Direccion.municipio).joinedload(models.Municipio.departamento)).all()

def addDireccion(db: Session, idUsuario: int, direccion: schemas.DireccionCreate):
    

    direccionDict = { **direccion.dict(), "IDUsuario": idUsuario }
    dbDireccion = models.Direccion(**direccionDict)

    try:
        db.add(dbDireccion)
        db.commit()
        db.refresh(dbDireccion)
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Direccion agregada con éxito" }

def updateDireccion(db: Session, idDireccion: int, idUsuario: int, direccion: schemas.DireccionUpdate):

    try:
        dbDireccion = db.query(models.Direccion).filter_by(IDDireccion = idDireccion, IDUsuario = idUsuario)
        if(dbDireccion.all().__len__() < 1): return None

        direccionDict = clearUpdateValuesFromDict(direccion.dict())
        dbDireccion.update(direccionDict)
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Direccion actualizada con éxito" }

def deleteDireccion(db: Session, idDireccion: int, idUsuario: int):

    try:
        dbDireccion = db.query(models.Direccion).filter_by(IDDireccion = idDireccion, IDUsuario = idUsuario)
        if(dbDireccion.all().__len__() < 1): return None
        
        dbDireccion.delete()
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Direccion eliminada con éxito" }