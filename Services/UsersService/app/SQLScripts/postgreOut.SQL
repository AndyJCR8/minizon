/*
Created: 01/04/2023
Modified: 04/04/2023
Model: PostgreSQL 12
Database: PostgreSQL 12
*/

-- Create tables section -------------------------------------------------

-- Table usuario

CREATE TABLE "usuario"
(
  "IDUsuario" Serial NOT NULL,
  "Nombre" Character varying(150) NOT NULL,
  "Edad" Integer,
  "Telefono" Bigint NOT NULL,
  "Email" Character varying(250) NOT NULL,
  "Password" Character varying(1000) NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "usuario" ADD CONSTRAINT "PK_usuario" PRIMARY KEY ("IDUsuario")
;

ALTER TABLE "usuario" ADD CONSTRAINT "Email" UNIQUE ("Email")
;

-- Table direccion

CREATE TABLE "direccion"
(
  "IDDireccion" Serial NOT NULL,
  "Direccion" Character varying(250) NOT NULL,
  "IDUsuario" Integer NOT NULL,
  "IDMunicipio" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship4" ON "direccion" ("IDUsuario")
;

CREATE INDEX "IX_Relationship6" ON "direccion" ("IDMunicipio")
;

ALTER TABLE "direccion" ADD CONSTRAINT "PK_direccion" PRIMARY KEY ("IDDireccion")
;

-- Table departamento

CREATE TABLE "departamento"
(
  "IDDepartamento" Serial NOT NULL,
  "Nombre" Character varying(100) NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "departamento" ADD CONSTRAINT "PK_departamento" PRIMARY KEY ("IDDepartamento")
;

-- Table municipio

CREATE TABLE "municipio"
(
  "IDMunicipio" Serial NOT NULL,
  "Nombre" Character varying(100) NOT NULL,
  "CodigoPostal" Character varying(25) NOT NULL,
  "IDDepartamento" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship1" ON "municipio" ("IDDepartamento")
;

ALTER TABLE "municipio" ADD CONSTRAINT "PK_municipio" PRIMARY KEY ("IDMunicipio")
;

-- Table tarjeta

CREATE TABLE "tarjeta"
(
  "IDTarjeta" Serial NOT NULL,
  "Identificador" Bigint NOT NULL,
  "YearVencimiento" Integer NOT NULL,
  "MesVencimiento" Integer NOT NULL,
  "NombreTitular" Character varying(250) NOT NULL,
  "CodigoSeguridad" Integer NOT NULL,
  "TipoCredito" Boolean NOT NULL,
  "IDUsuario" Integer NOT NULL,
  "IDMarca" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship5" ON "tarjeta" ("IDUsuario")
;

CREATE INDEX "IX_Relationship8" ON "tarjeta" ("IDMarca")
;

ALTER TABLE "tarjeta" ADD CONSTRAINT "PK_tarjeta" PRIMARY KEY ("IDTarjeta")
;

-- Table pedido

CREATE TABLE "pedido"
(
  "IDPedido" Serial NOT NULL,
  "NIT" Character varying(10) NOT NULL,
  "Fecha" Date NOT NULL,
  "IDDireccion" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship7" ON "pedido" ("IDDireccion")
;

ALTER TABLE "pedido" ADD CONSTRAINT "PK_pedido" PRIMARY KEY ("IDPedido")
;

-- Table marca

CREATE TABLE "marca"
(
  "IDMarca" Serial NOT NULL,
  "Nombre" Character varying(250) NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "marca" ADD CONSTRAINT "PK_marca" PRIMARY KEY ("IDMarca")
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE "direccion"
  ADD CONSTRAINT "Relationship4"
    FOREIGN KEY ("IDUsuario")
    REFERENCES "usuario" ("IDUsuario")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "municipio"
  ADD CONSTRAINT "Relationship1"
    FOREIGN KEY ("IDDepartamento")
    REFERENCES "departamento" ("IDDepartamento")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "tarjeta"
  ADD CONSTRAINT "Relationship5"
    FOREIGN KEY ("IDUsuario")
    REFERENCES "usuario" ("IDUsuario")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "direccion"
  ADD CONSTRAINT "Relationship6"
    FOREIGN KEY ("IDMunicipio")
    REFERENCES "municipio" ("IDMunicipio")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "pedido"
  ADD CONSTRAINT "Relationship7"
    FOREIGN KEY ("IDDireccion")
    REFERENCES "direccion" ("IDDireccion")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "tarjeta"
  ADD CONSTRAINT "Relationship8"
    FOREIGN KEY ("IDMarca")
    REFERENCES "marca" ("IDMarca")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

