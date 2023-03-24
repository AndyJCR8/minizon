from datetime import date
from pydantic import BaseModel, Field

#----------COMPRA-----------
class CompraBase(BaseModel):
  NIT: int

class CompraCreate(CompraBase): pass

class Compra(CompraBase):
  IDCompra: int
  IDDireccion: int
  IDMunicipio: int

  class Config: orm_mode = True
#---------------------------

#--------MUNICIPIO----------
class MunicipiosBase(BaseModel):
  Nombre: str
  CodigoPostal: str

class MunicipioCreate(MunicipiosBase): pass

class Municipio(MunicipiosBase):
  IDMunicipio: int
  Compras: list[Compra] = []

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

#---------DIRECCION---------
class DireccionBase(BaseModel):
  Direccion: str

class DireccionCreate(DireccionBase): pass

class Direccion(DireccionBase):
  IDDireccion: int
  IDUsuario: int

  Compras: list[Compra] = []

  class Config: orm_mode = True
#---------------------------

#----------USUARIO----------
class UsuarioBase(BaseModel):
  Nombre: str
  Nickname: str
  FechaNacimiento: date
  Telefono: int
  Email: str
  Direccion: str

class UsuarioCreate(UsuarioBase): Password: str

class Usuario(UsuarioBase):
  IDUsuario: int
  Direcciones: list[Direccion] = []

  class Config: orm_mode = True
#---------------------------