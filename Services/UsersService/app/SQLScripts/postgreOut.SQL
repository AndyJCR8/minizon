/*
Created: 01/04/2023
Modified: 01/04/2023
Model: PostgreSQL 12
Database: PostgreSQL 12
*/

-- Create tables section -------------------------------------------------

-- Table usuario

CREATE TABLE "usuario"
(
  "IDUsuario" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
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
  "IDDireccion" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
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
  "IDDepartamento" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
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
  "IDMunicipio" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
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
  "IDTarjeta" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "Identificador" Bigint NOT NULL,
  "YearVencimiento" Integer NOT NULL,
  "MesVencimiento" Integer NOT NULL,
  "NombreTitular" Character varying(250) NOT NULL,
  "CodigoSeguridad" Integer NOT NULL,
  "IDUsuario" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship5" ON "tarjeta" ("IDUsuario")
;

ALTER TABLE "tarjeta" ADD CONSTRAINT "PK_tarjeta" PRIMARY KEY ("IDTarjeta")
;

-- Table pedido

CREATE TABLE "pedido"
(
  "IDPedido" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
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

