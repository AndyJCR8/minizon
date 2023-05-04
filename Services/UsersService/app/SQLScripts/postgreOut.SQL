/*
Created: 22/03/2023
Modified: 28/04/2023
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
  "Nickname" Character varying(150) NOT NULL,
  "FechaNacimiento" Date NOT NULL,
  "Telefono" Bigint NOT NULL,
  "Email" Character varying(250) NOT NULL,
  "Direccion" Character varying(250) NOT NULL,
  "Password" Character varying(1000) NOT NULL,
  "Frecuente" Boolean NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "usuario" ADD CONSTRAINT "PK_usuario" PRIMARY KEY ("IDUsuario")
;

-- Table direccion

CREATE TABLE "direccion"
(
  "IDDireccion" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "Direccion" Character varying(250) NOT NULL,
  "IDUsuario" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship4" ON "direccion" ("IDUsuario")
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

-- Table compra

CREATE TABLE "compra"
(
  "IDCompra" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "NIT" Bigint NOT NULL,
  "IDMunicipio" Integer NOT NULL,
  "IDDireccion" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship2" ON "compra" ("IDMunicipio")
;

CREATE INDEX "IX_Relationship3" ON "compra" ("IDDireccion")
;

ALTER TABLE "compra" ADD CONSTRAINT "PK_compra" PRIMARY KEY ("IDCompra")
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE "municipio"
  ADD CONSTRAINT "Relationship1"
    FOREIGN KEY ("IDDepartamento")
    REFERENCES "departamento" ("IDDepartamento")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "compra"
  ADD CONSTRAINT "Relationship2"
    FOREIGN KEY ("IDMunicipio")
    REFERENCES "municipio" ("IDMunicipio")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "compra"
  ADD CONSTRAINT "Relationship3"
    FOREIGN KEY ("IDDireccion")
    REFERENCES "direccion" ("IDDireccion")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

ALTER TABLE "direccion"
  ADD CONSTRAINT "Relationship4"
    FOREIGN KEY ("IDUsuario")
    REFERENCES "usuario" ("IDUsuario")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
;

