from fastapi import HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas

def getDepartamento(db: Session, idDepartamento: int):
    
    try:
      departamento = db.query(models.Departamento).filter_by(IDDepartamento = idDepartamento).first()        
    except Exception as e: raise HTTPException(400, detail="solicitud inválida")
    
    return departamento

def getDepartamentos(db: Session):
    
    return db.query(models.Departamento).all()