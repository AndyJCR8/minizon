from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, BigInteger
from sqlalchemy.orm import relationship, mapped_column
from .database import Base

class Usuario(Base):
  __tablename__ = 'usuario'

  IDUsuario = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Nombre = Column(String)
  
  Edad = Column(Integer, nullable=True)
  #Nickname = Column(String) DESCARTADO
  #FechaNacimiento = Column(Date) DESCARTADO
  Telefono = Column(BigInteger)
  Email = Column(String)
  #Direccion = Column(String) DESCARTADO
  Password = Column(String)
  
  #RELACION CON TODAS LAS DIRECCIONES DEL USUARIO
  direcciones = relationship('Direccion', back_populates='usuario', cascade="all, delete-orphan")
  tarjetas = relationship('Tarjeta', back_populates='usuario', cascade="all, delete-orphan")

class Direccion(Base):
  __tablename__ = 'direccion'

  IDDireccion = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Direccion = Column(String)


  #ID DEL USUARIO
  IDUsuario = mapped_column(ForeignKey('usuario.IDUsuario'))
  IDMunicipio = mapped_column(ForeignKey('municipio.IDMunicipio'))
  #INFORMACION DE LA RELACION
  usuario = relationship("Usuario", back_populates="direcciones")
  municipio = relationship("Municipio", back_populates="direcciones")

  #PEDIDOS DE LA DIRECCION
  pedidos = relationship('Pedido', back_populates='direccion', cascade="all, delete-orphan")


class Pedido(Base):
  __tablename__ = "pedido"
  IDPedido = Column(Integer, primary_key=True, autoincrement=True, index=True)
  NIT = Column(String)
  Fecha = Column(Date)

  IDDireccion = mapped_column(ForeignKey('direccion.IDDireccion'))
  direccion = relationship("Direccion", back_populates="pedidos")

class Marca(Base):
  __tablename__ = "marca"
  IDMarca = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Nombre = Column(String)

  tarjetas = relationship("Tarjeta", back_populates='marca')

class Tarjeta(Base):
  __tablename__ = "tarjeta"
  IDTarjeta = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Identificador = Column(BigInteger)
  YearVencimiento = Column(Integer)
  MesVencimiento = Column(Integer)
  NombreTitular = Column(String)
  CodigoSeguridad = Column(Integer)
  TipoCredito = Column(Boolean)

  IDUsuario = mapped_column(ForeignKey('usuario.IDUsuario'))
  usuario = relationship("Usuario", back_populates="tarjetas")

  IDMarca = mapped_column(ForeignKey('marca.IDMarca'))
  marca = relationship("Marca", back_populates="tarjetas")


class Municipio(Base):
  __tablename__ = "municipio"

  IDMunicipio = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Nombre = Column(String)
  CodigoPostal = Column(String)

  #ID DEL DEPARTAMENTO
  IDDepartamento = mapped_column(ForeignKey('departamento.IDDepartamento'))
  #INFORMACION DE LA RELACION
  departamento = relationship("Departamento", back_populates="municipios")

  #DIRECCIONES DEL MUNICIPIO
  direcciones = relationship('Direccion', back_populates='municipio', cascade="all, delete-orphan")
  
class Departamento(Base):
  __tablename__ = "departamento"

  IDDepartamento = Column(Integer, primary_key=True, autoincrement=True, index=True)
  Nombre = Column(String)

  municipios = relationship('Municipio', back_populates='departamento', cascade="all, delete-orphan")