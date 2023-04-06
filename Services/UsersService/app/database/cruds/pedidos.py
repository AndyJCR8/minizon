from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from .. import models, schemas

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

    return { "message": "Pedido agregado con éxito" }

""" def updateTarjeta(db: Session, idTarjeta: int, idUsuario: int, tarjeta: schemas.TarjetaUpdate):

    try:
        dbTarjeta = db.query(models.Tarjeta).filter_by(IDTarjeta = idTarjeta, IDUsuario = idUsuario)
        if(dbTarjeta.all().__len__() < 1): return None

        tarjetaDict = clearUpdateValuesFromDict(tarjeta.dict())
        dbTarjeta.update(tarjetaDict)
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Tarjeta actualizada con éxito" }

def deleteTarjeta(db: Session, idTarjeta: int, idUsuario: int):

    try:
        dbTarjeta = db.query(models.Tarjeta).filter_by(IDTarjeta = idTarjeta, IDUsuario = idUsuario)
        if(dbTarjeta.all().__len__() < 1): return None

        dbTarjeta.delete()
        db.commit()
        
    except Exception as e: raise HTTPException(406, detail=f"error detail {e}")

    return { "message": "Tarjeta eliminada con éxito" } """