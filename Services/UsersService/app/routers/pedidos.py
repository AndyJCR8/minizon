from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import Session
from . import protectedRoute, service2Issuer, service3Issuer, getDB
from ..database import models, schemas
from ..database.database import engine
from ..database.cruds import pedidos


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

# ----------------IMPORTANTE----------------
# SE DEBE CAMBIAR LA DEPENDENCIA "protectedRoute"
# POR LA DEPENDENCIA "service2Issuer" O A OTRA DEPENDENCIA, DEBIDO A QUE
# SOLO UN MICROSERVICIO PUEDE EFECTUAR ESTA ACCIÓN
# ------------------------------------------
@router.get("/pedido", name="Obtener pedido")
async def getPedido(idPedido: int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    #return userData
    pedido = pedidos.getPedido(db, userData['IDUsuario'], idPedido)
    return { "pedido": {**pedido.__dict__} } if pedido is not None else { "message": "pedido no encontrado" }

@router.get("/pedidos", name="Obtener pedidos")
async def getPedidos(db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):    
    #return userData
    _pedidos = pedidos.getPedidos(db, userData['IDUsuario'])
    return { "pedidos": _pedidos } if _pedidos.__len__() > 0 else { "message": "aún no hay pedidos efectuados en la cuenta del cliente" }

@router.post("/pedido", name="Agregar nuevo pedido")
async def addPedido(pedido: schemas.PedidoCreate, db: Session = Depends(getDB), userData: dict = Depends(service2Issuer)):
    
    try:
      pedidos.addPedido(db, userData["IDUsuario"], pedido)
      return { "message": "pedido creado con éxito" }
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"})

""" @router.put("/pedido", name="Actualizar pedido")
async def updateTarjeta(idTarjeta:int, tarjeta: schemas.TarjetaUpdate, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = tarjetas.updateTarjeta(db, idTarjeta, userData["IDUsuario"], tarjeta)
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede actualizar la tarjeta" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"}) """

""" @router.delete("/pedido", name="Eliminar pedido")
async def deleteTarjeta(idTarjeta:int, db: Session = Depends(getDB), userData: dict = Depends(protectedRoute)):
    
    try:
      res = tarjetas.deleteTarjeta(db, idTarjeta, userData["IDUsuario"])
      return res if res is not None else HTTPException(400, detail={ "message" : "no se puede eliminar la tarjeta" })
    except Exception as e: raise HTTPException(400, detail={"message": f"ha ocurrido un error: {e}"}) """
