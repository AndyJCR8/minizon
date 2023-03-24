from fastapi import Depends, APIRouter

from sqlalchemy.orm import Session
from ..database import models, schemas
from ..database.database import SessionLocal, engine
from ..database.cruds import usuarios

models.Base.metadata.create_all(bind=engine)

#DEPENDENCY
def getDB():
    db = SessionLocal()
    try: yield db
    finally: db.close()

router = APIRouter()

@router.get('/api/users/', tags=["users"])
async def getUsers():
    return [{"username": "Rick"}, {"username": "Morty"}]

@router.get("/api/usuarios", response_model=list[schemas.Usuario])
def readUsuarios(skip: int = 0, limit: int = 1000, db: Session = Depends(getDB)):
    data = usuarios.getUsuarios(db, skip=skip, limit=limit)
    return data

@router.post("/api/usuario", response_model=schemas.Usuario)
def createUser(usuario: schemas.UsuarioCreate, db: Session = Depends(getDB)):
    return usuarios.createUsuario(db=db, usuario=usuario)