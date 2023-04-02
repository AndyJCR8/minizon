from fastapi import Depends, APIRouter

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import usuarios 


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

""" @router.get('/users/', tags=["users"])
async def getUsers():
    return [{"username": "Rick"}, {"username": "Morty"}] """

""" @router.get("/usuarios", response_model=list[schemas.Usuario], dependencies=[Depends(protectedRoute)])
async def readUsuarios(skip: int = 0, limit: int = 1000, db: Session = Depends(getDB)):
    data = usuarios.getUsuarios(db, skip=skip, limit=limit)
    return data """

@router.get("/usuario/prueba", dependencies=[Depends(service2Issuer)])
async def pruebaUsuario():
    return {"passed": True}

@router.post("/usuario/registro")
async def createUser(usuario: schemas.UsuarioCreate, db: Session = Depends(getDB)):
    return usuarios.createUsuario(db=db, usuario=usuario)

@router.post("/usuario/login")
async def login(credenciales: schemas.CredencialesUsuario, db: Session = Depends(getDB)):
    print(credenciales)
    return usuarios.verifyUsuario(db, credenciales.Email, credenciales.Password)

