from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from .. import models, schemas
from . import usuarios

def getPedido(db: Session, idUsuario: int, idPedido: int):
    
    pedido = db.query(models.Pedido).filter_by(IDPedido = idPedido)\
        .options(joinedload(models.Pedido.direccion)).first()
    
    try:
        direccion = db.query(models.Direccion).filter_by(IDDireccion = pedido.IDDireccion).first()
        if direccion.IDUsuario is not idUsuario: raise HTTPException(400, detail="solicitud inválida")
    except Exception as e: raise HTTPException(400, detail="solicitud inválida")
    
    return pedido

def getPedidos(db: Session, idUsuario: int):
    
    return db.query(models.Pedido).join(models.Direccion, models.Direccion.IDDireccion == models.Pedido.IDDireccion)\
             .filter(models.Direccion.IDUsuario == idUsuario).all()
    

def addPedido(db: Session, idUsuario: int, pedido: schemas.PedidoCreate):

    direccion = db.query(models.Direccion).filter_by(IDDireccion = pedido.IDDireccion).first()
    if idUsuario is not direccion.IDUsuario: raise HTTPException(400, detail="no existe la dirección")

    
    pedidoDict = { **pedido.dict() }
    dbPedido = models.Pedido(**pedidoDict)

    try:
        db.add(dbPedido)
        db.commit()
        db.refresh(dbPedido)
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")
    
    pedidosCount = len(getPedidos(db, idUsuario))
    
    if pedidosCount > 15:
        usuarios.updateUsuario(db, idUsuario, schemas.UsuarioUpdate(Frecuente=True))

    return { "message": "Pedido agregado con éxito" }