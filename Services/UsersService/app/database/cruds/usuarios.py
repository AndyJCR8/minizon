import bcrypt as bc
from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import clearUpdateValuesFromDict
from .. import models, schemas
from ...JWT import code

def getUsuario(db: Session, id: int):
    return db.query(models.Usuario).filter(models.Usuario.IDUsuario == id).first()

""" def getUsuarios(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.Usuario).offset(skip).limit(limit).all() """

def verifyUsuario(db: Session, Email: str, Password: str, ExpireInSecs: int = None):
    
    try:

        usuarios = db.query(models.Usuario).filter(models.Usuario.Email == Email)
        res = [usuario for usuario in usuarios if bc.checkpw(Password.encode(), usuario.Password.encode())][0].__dict__

    except Exception: raise HTTPException(status_code=406, detail="login failed")

    res.pop("_sa_instance_state")
    res.pop("Password")
    #res["verified"] = True
    res['AuthToken'] = code.generateNewToken(res, ExpireInSecs if not None else 25200)
    res['Expires'] = code.verifyToken(res['AuthToken'])['validUntil']

    return res

def createUsuario(db: Session, usuario: schemas.UsuarioCreate):
    salt = bc.gensalt()
    print(usuario)
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
    dbUsuario.__dict__["verified"] = True

    return { "message": "Usuario creado con éxito", **dbUsuario.__dict__, "AuthToken": code.generateNewToken(dbUsuario.__dict__) }

def updateUsuario(db: Session, idUsuario: int, usuario: schemas.UsuarioUpdate):

    try:
        salt = bc.gensalt()
        hashedPass = bc.hashpw(usuario.Password.encode('utf-8'), salt).decode()
        #if not usuario.Nickname: usuario["Nickname"] = usuario["Nombre"]
        usuario.Password = hashedPass
    except Exception as e: pass
    
    try:
        dbUsuario = db.query(models.Usuario).filter_by(IDUsuario = idUsuario)
        
        #VERIFICAMOS SI HAY VALORES NULOS (None)
        usuarioDict = clearUpdateValuesFromDict(usuario.dict())
        """ usuarioDict = usuario.dict()
        for key in list(usuarioDict):
            if usuarioDict[key] is None: usuarioDict.pop(key) """
        #---------------------------------------
        
        dbUsuario.update(usuarioDict)
        #db.add(dbUsuario)
        db.commit()

        updated = db.query(models.Usuario).filter_by(IDUsuario = idUsuario).first()
        #db.refresh(updated)
    except Exception as e: raise HTTPException(406, detail=f"error detail: {e}")
    try:
        updated.__dict__.pop("Password")
        updated.__dict__.pop("_sa_instance_state")
    except Exception as e: pass

    updated.__dict__["verified"] = True

    return { "message": "Usuario actualizado con éxito", **updated.__dict__, "AuthToken": code.generateNewToken(updated.__dict__) }