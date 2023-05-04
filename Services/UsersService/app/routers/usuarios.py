from fastapi import Depends, APIRouter

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import usuarios 
from ..JWT import code

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

""" @router.get('/users/', tags=["users"])
async def getUsers():
    return [{"username": "Rick"}, {"username": "Morty"}] """

""" @router.get("/usuarios", response_model=list[schemas.Usuario], dependencies=[Depends(protectedRoute)])
async def readUsuarios(skip: int = 0, limit: int = 1000, db: Session = Depends(getDB)):
    data = usuarios.getUsuarios(db, skip=skip, limit=limit)
    return data """

""" @router.get("/usuario/prueba", dependencies=[Depends(service2Issuer)])
async def pruebaUsuario():
    return {"passed": True} """

@router.post("/usuario/registro", name="Registrar nuevo usuario")
async def registerUsuario(usuario: schemas.UsuarioCreate, db: Session = Depends(getDB)):
    #print("------------------------------REGISTER------------------------------")
    return usuarios.createUsuario(db=db, usuario=usuario)

@router.put("/usuario/actualizacion", dependencies=[Depends(protectedRoute)], name="Actualizar datos de usuario")
async def updateUsuario(usuario: schemas.UsuarioUpdate, idUsuario: int, db: Session = Depends(getDB)):
    return usuarios.updateUsuario(db=db, idUsuario=idUsuario, usuario=usuario)

@router.post("/usuario/login", name="Inicio de sesión")
async def login(credenciales: schemas.CredencialesUsuario, db: Session = Depends(getDB)):
    return usuarios.verifyUsuario(db, credenciales.Email, credenciales.Password, credenciales.ExpireInSecs)

@router.post("/usuario/verifyUser", name="Verificación de token de usuario")
async def verifyUser(token: str, db: Session = Depends(getDB)):
    try:
        userData = code.verifyToken(token)
        data = {
            'IDUsuario': userData['IDUsuario'],
            'Nombre': userData['Nombre'],
            'Email': userData['Email'],
            'Telefono': userData['Telefono'],
            'Edad': userData['Edad'],
            'Frecuente': userData['Frecuente'],
            'validUntil': userData['validUntil']
        }
        return { "userValid": True, 'UserData': data }
    except Exception as e:
        return { "userValid": False }