from datetime import date
from pydantic import BaseModel, Field
from typing import Optional

#----------COMPRA-----------
""" class CompraBase(BaseModel):
  NIT: int

class CompraCreate(CompraBase): pass

class Compra(CompraBase):
  IDCompra: int
  IDDireccion: int
  IDMunicipio: int

  class Config: orm_mode = True """
#---------------------------

#----------PEDIDO-----------
class PedidoBase(BaseModel):
  NIT: str
  Fecha: date

class PedidoCreate(PedidoBase): pass
class PedidoUpdate(BaseModel):
  NIT: Optional[str] = None
  Fecha: Optional[date] = None

class Pedido(PedidoBase):
  IDDireccion: int

  class Config: orm_mode = True
#---------------------------

#-----------MARCA-----------
class MarcaBase(BaseModel):
  Nombre: str

class MarcaCreate(MarcaBase): pass

class Marca(MarcaBase):
  IDMarca: int

  class Config: orm_mode = True
#--------------------------

#---------TARJETA-----------
class TarjetaBase(BaseModel):
  Identificador: int
  YearVencimiento: int
  MesVencimiento: int
  NombreTitular: str
  CodigoSeguridad: int
  TipoCredito: bool

class TarjetaCreate(TarjetaBase):
  IDMarca: int
  
class TarjetaUpdate(BaseModel):
  Identificador: Optional[int] = None
  YearVencimiento: Optional[int] = None
  MesVencimiento: Optional[int] = None
  NombreTitular: Optional[str] = None
  CodigoSeguridad: Optional[int] = None
  TipoCredito: Optional[bool] = None
  IDMarca: Optional[int] = None

class Tarjeta(TarjetaBase):
  IDTarjeta: int
  IDUsuario: int
  IDMarca: int

  class Config: orm_mode = True
#--------------------------

#---------DIRECCION---------
class DireccionBase(BaseModel):
  Direccion: str

class DireccionCreate(DireccionBase):
  IDMunicipio: int

class DireccionUpdate(BaseModel):
  Direccion: Optional[str] = None
  IDMunicipio: Optional[int] = None

class Direccion(DireccionBase):
  IDDireccion: int
  IDUsuario: int
  IDMunicipio: int

  Pedidos: list[Pedido] = []

  class Config: orm_mode = True
#---------------------------

#--------MUNICIPIO----------
class MunicipiosBase(BaseModel):
  Nombre: str
  CodigoPostal: str

class MunicipioCreate(MunicipiosBase): pass

class Municipio(MunicipiosBase):
  IDMunicipio: int
  Direcciones: list[Direccion] = []

  class Config: orm_mode = True
#---------------------------

#-------DEPARTAMENTO--------
class DepartamentoBase(BaseModel):
  Nombre: str

class DepartamentoCreate(DepartamentoBase): pass

class Departamento(DepartamentoBase):
  IDDepartamento: int
  Municipios: list[Municipio] = []

  class Config: orm_mode = True
#---------------------------

#----------USUARIO----------
class CredencialesUsuario(BaseModel):
  Email: str
  Password: str

class UsuarioBase(BaseModel):
  Nombre: str
  Edad: int = None
  #Nickname: str DESCARTADO
  #FechaNacimiento: date DESCARTADO
  Telefono: int
  Email: str
  #Direccion: str DESCARTADO

class UsuarioCreate(UsuarioBase): Password: str
class UsuarioUpdate(BaseModel):
  Nombre: Optional[str] = None
  Edad: Optional[int] = None
  #Nickname: str DESCARTADO
  #FechaNacimiento: date DESCARTADO
  Telefono: Optional[int] = None
  Email: Optional[str] = None
  Password: Optional[str] = None

class Usuario(UsuarioBase):
  IDUsuario: int
  Direcciones: list[Direccion] = []
  Tarjetas: list[Tarjeta] = []

  class Config: orm_mode = True
#---------------------------