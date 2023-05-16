from fastapi import HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas

def getMunicipio(db: Session, idMuncipio: int):
    
    try:
      municipio = db.query(models.Municipio).filter(models.Municipio.IDMunicipio == idMuncipio).first()
    except Exception as e: raise HTTPException(400, detail="solicitud inválida")
    
    return municipio

def getMunicipios(db: Session, idDepartamento: int):
    
    return db.query(models.Municipio).filter(models.Municipio.IDDepartamento == idDepartamento).all()