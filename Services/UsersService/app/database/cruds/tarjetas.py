from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from . import clearUpdateValuesFromDict
from .. import models, schemas


def getTarjeta(db: Session, idTarjeta: int, idUsuario: int):
    return db.query(models.Tarjeta).filter_by(IDTarjeta = idTarjeta, IDUsuario = idUsuario)\
      .options(joinedload(models.Tarjeta.marca)).first()

def getTarjetas(db: Session, idUsuario: int):
    return db.query(models.Tarjeta).filter_by(IDUsuario = idUsuario)\
      .options(joinedload(models.Tarjeta.marca)).all()

def addTarjeta(db: Session, idUsuario: int, tarjeta: schemas.TarjetaCreate):

    tarjetaDict = { **tarjeta.dict(), "IDUsuario": idUsuario }
    dbTarjeta = models.Tarjeta(**tarjetaDict)

    try:
        db.add(dbTarjeta)
        db.commit()
        db.refresh(dbTarjeta)
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Tarjeta agregada con éxito" }

def updateTarjeta(db: Session, idTarjeta: int, idUsuario: int, tarjeta: schemas.TarjetaUpdate):

    try:
        dbTarjeta = db.query(models.Tarjeta).filter_by(IDTarjeta = idTarjeta, IDUsuario = idUsuario)
        if(dbTarjeta.all().__len__() < 1): return None

        tarjetaDict = clearUpdateValuesFromDict(tarjeta.dict())
        dbTarjeta.update(tarjetaDict)
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Tarjeta actualizada con éxito" }

def deleteTarjeta(db: Session, idTarjeta: int, idUsuario: int):

    try:
        dbTarjeta = db.query(models.Tarjeta).filter_by(IDTarjeta = idTarjeta, IDUsuario = idUsuario)
        if(dbTarjeta.all().__len__() < 1): return None

        dbTarjeta.delete()
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Tarjeta eliminada con éxito" }