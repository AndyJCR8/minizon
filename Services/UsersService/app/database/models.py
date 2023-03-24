from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, BigInteger
from sqlalchemy.orm import relationship, mapped_column
from .database import Base

class Usuario(Base):
  __tablename__ = 'usuario'

  IDUsuario = Column(Integer, primary_key=True, index=True)
  Nombre = Column(String)
  Nickname = Column(String)
  FechaNacimiento = Column(Date)
  Telefono = Column(BigInteger)
  Email = Column(String)
  Direccion = Column(String)
  Password = Column(String)
  
  #RELACION CON TODAS LAS DIRECCIONES DEL USUARIO
  direcciones = relationship('Direccion', back_populates='usuario', cascade="all, delete-orphan")

class Direccion(Base):
  __tablename__ = 'direccion'

  IDDireccion = Column(Integer, primary_key=True, index=True)
  Direccion = Column(String)


  #ID DEL USUARIO
  IDUsuario = mapped_column(ForeignKey('usuario.IDUsuario'))
  #INFORMACION DE LA RELACION
  usuario = relationship("Usuario", back_populates="direcciones")

  #COMPRAS DE LA DIRECCION
  compras = relationship('Compra', back_populates='direccion', cascade="all, delete-orphan")

class Compra(Base):
  __tablename__ = "compra"

  IDCompra = Column(Integer, primary_key=True, index=True)
  NIT = BigInteger

  #ID DE LA DIRECCION
  IDDireccion = mapped_column(ForeignKey('direccion.IDDireccion'))
  #ID DEL MUNICIPIO
  IDMunicipio = mapped_column(ForeignKey('municipio.IDMunicipio'))

  #INFORMACION DE LAS RELACIONES
  direccion = relationship("Direccion", back_populates="compras")
  municipio = relationship("Municipio", back_populates="compras")

class Municipio(Base):
  __tablename__ = "municipio"

  IDMunicipio = Column(Integer, primary_key=True, index=True)
  Nombre = Column(String)
  CodigoPostal = Column(String)

  #ID DEL DEPARTAMENTO
  IDDepartamento = mapped_column(ForeignKey('departamento.IDDepartamento'))
  #INFORMACION DE LA RELACION
  departamento = relationship("Departamento", back_populates="municipios")

  #COMPRAS DEL MUNICIPIO
  compras = relationship('Compra', back_populates='municipio', cascade="all, delete-orphan")
  
class Departamento(Base):
  __tablename__ = "departamento"

  IDDepartamento = Column(Integer, primary_key=True, index=True)
  Nombre = Column(String)

  municipios = relationship('Municipio', back_populates='departamento', cascade="all, delete-orphan")