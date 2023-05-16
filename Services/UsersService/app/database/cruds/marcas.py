from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from .. import models, schemas

def getMarcas(db: Session):
    return db.query(models.Marca).all()