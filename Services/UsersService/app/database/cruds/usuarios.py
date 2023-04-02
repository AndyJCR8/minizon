import bcrypt as bc
from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from .. import models, schemas
from ...JWT import code

def getUsuario(db: Session, id: int):
    return db.query(models.Usuario).filter(models.Usuario.IDUsuario == id).first()

def getUsuarios(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

def createUsuario(db: Session, usuario: schemas.UsuarioCreate):
    salt = bc.gensalt()
    
    hashedPass = bc.hashpw(usuario.Password.encode('utf-8'), salt).decode()
    
    #if not usuario.Nickname: usuario["Nickname"] = usuario["Nombre"]
    usuario.Password = hashedPass
    dbUsuario = models.Usuario(**usuario.dict())

    try:
        db.add(dbUsuario)
        db.commit()
        db.refresh(dbUsuario)
    except: raise HTTPException(406, detail="user already registered")

    dbUsuario.__dict__.pop("Password")
    dbUsuario.__dict__.pop("_sa_instance_state")
    
    return { **dbUsuario.__dict__, "AuthToken": code.generateNewToken(dbUsuario.__dict__) }

def verifyUsuario(db: Session, Email: str, Password: str):
    
    try:

        usuarios = db.query(models.Usuario).filter(models.Usuario.Email == Email)
        res = [usuario for usuario in usuarios if bc.checkpw(Password.encode(), usuario.Password.encode())][0].__dict__

    except Exception: raise HTTPException(status_code=406, detail="loggin failed")

    res.pop("_sa_instance_state")
    res.pop("Password")
    
    res = { **res, "AuthToken": code.generateNewToken(res) }

    return res