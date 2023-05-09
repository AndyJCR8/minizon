from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import Session
from . import protectedRoute,  getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import pedidos
from ..database.cruds import departamentos
from ..database.cruds import municipios


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.get("/departamento", name="Obtener un departamento", dependencies=[Depends(protectedRoute)])
async def getDepartamento(idDepartamento: int, db: Session = Depends(getDB)):
    
    #return userData
    departamento = departamentos.getDepartamento(db, idDepartamento)
    return { "departamento": {**departamento.__dict__} } if departamento is not None else { "message": "departamento no encontrado" }

@router.get("/departamentos", name="Obtener todos los departamentos", dependencies=[Depends(protectedRoute)])
async def getDepartamentos(db: Session = Depends(getDB)):    
    #return userData
    _departamentos = departamentos.getDepartamentos(db)
    return { "departamentos": _departamentos } if _departamentos.__len__() > 0 else { "message": "Aún no hay departamentos registrados en la base de datos" }

  
@router.get("/municipio", name="Obtener un municipio", dependencies=[Depends(protectedRoute)])
async def getMunicipio(idMunicipio: int, db: Session = Depends(getDB)):
    
    #return userData
    municipio = municipios.getMunicipio(db, idMunicipio)
    return { "municipio": {**municipio.__dict__} } if municipio is not None else { "message": "municipio no encontrado" }

@router.get("/municipios", name="Obtener todos los municipios", dependencies=[Depends(protectedRoute)])
async def getMunicipios(idDepartamento: int, db: Session = Depends(getDB)):    
    #return userData
    _municipios = municipios.getMunicipios(db, idDepartamento)
    return { "municipios": _municipios } if _municipios.__len__() > 0 else { "message": "Aún no hay municipios registrados en la base de datos" }
