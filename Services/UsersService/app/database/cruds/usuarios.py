import bcrypt as bc
from sqlalchemy.orm import Session
from .. import models, schemas

def getUsuario(db: Session, id: int):
    return db.query(models.Usuario).filter(models.Usuario.IDUsuario == id).first()

def getUsuarios(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

def createUsuario(db: Session, usuario: schemas.UsuarioCreate):
    salt = bc.gensalt()
    print(f"OriginalPass: {usuario.Password}")
    hashedPass = bc.hashpw(usuario.Password.encode('utf-8'), salt)
    print(f"HashedPass: {hashedPass}")

    #if not usuario.Nickname: usuario["Nickname"] = usuario["Nombre"]
    usuario.Password = hashedPass
    dbUsuario = models.Usuario(**usuario.dict())

    db.add(dbUsuario)
    db.commit()
    db.refresh(dbUsuario)

    return dbUsuario
