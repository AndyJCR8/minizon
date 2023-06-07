-- Table: public.usuario

-- DROP TABLE IF EXISTS public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario
(
    "IDUsuario" integer NOT NULL DEFAULT nextval('"usuario_IDUsuario_seq"'::regclass),
    "Nombre" character varying COLLATE pg_catalog."default",
    "Edad" integer,
    "Telefono" bigint,
    "Email" character varying COLLATE pg_catalog."default",
    "Password" character varying COLLATE pg_catalog."default",
    "Frecuente" boolean NOT NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY ("IDUsuario")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario
    OWNER to postgres;
-- Index: ix_usuario_IDUsuario

-- DROP INDEX IF EXISTS public."ix_usuario_IDUsuario";

CREATE INDEX IF NOT EXISTS "ix_usuario_IDUsuario"
    ON public.usuario USING btree
    ("IDUsuario" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.marca

-- DROP TABLE IF EXISTS public.marca;

CREATE TABLE IF NOT EXISTS public.marca
(
    "IDMarca" integer NOT NULL DEFAULT nextval('"marca_IDMarca_seq"'::regclass),
    "Nombre" character varying COLLATE pg_catalog."default",
    CONSTRAINT marca_pkey PRIMARY KEY ("IDMarca")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.marca
    OWNER to postgres;
-- Index: ix_marca_IDMarca

-- DROP INDEX IF EXISTS public."ix_marca_IDMarca";

CREATE INDEX IF NOT EXISTS "ix_marca_IDMarca"
    ON public.marca USING btree
    ("IDMarca" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.departamento

-- DROP TABLE IF EXISTS public.departamento;

CREATE TABLE IF NOT EXISTS public.departamento
(
    "IDDepartamento" integer NOT NULL DEFAULT nextval('"departamento_IDDepartamento_seq"'::regclass),
    "Nombre" character varying COLLATE pg_catalog."default",
    CONSTRAINT departamento_pkey PRIMARY KEY ("IDDepartamento")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.departamento
    OWNER to postgres;
-- Index: ix_departamento_IDDepartamento

-- DROP INDEX IF EXISTS public."ix_departamento_IDDepartamento";

CREATE INDEX IF NOT EXISTS "ix_departamento_IDDepartamento"
    ON public.departamento USING btree
    ("IDDepartamento" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.municipio

-- DROP TABLE IF EXISTS public.municipio;

CREATE TABLE IF NOT EXISTS public.municipio
(
    "IDMunicipio" integer NOT NULL DEFAULT nextval('"municipio_IDMunicipio_seq"'::regclass),
    "Nombre" character varying COLLATE pg_catalog."default",
    "CodigoPostal" character varying COLLATE pg_catalog."default",
    "IDDepartamento" integer,
    CONSTRAINT municipio_pkey PRIMARY KEY ("IDMunicipio"),
    CONSTRAINT "municipio_IDDepartamento_fkey" FOREIGN KEY ("IDDepartamento")
        REFERENCES public.departamento ("IDDepartamento") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.municipio
    OWNER to postgres;
-- Index: ix_municipio_IDMunicipio

-- DROP INDEX IF EXISTS public."ix_municipio_IDMunicipio";

CREATE INDEX IF NOT EXISTS "ix_municipio_IDMunicipio"
    ON public.municipio USING btree
    ("IDMunicipio" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.direccion

-- DROP TABLE IF EXISTS public.direccion;

CREATE TABLE IF NOT EXISTS public.direccion
(
    "IDDireccion" integer NOT NULL DEFAULT nextval('"direccion_IDDireccion_seq"'::regclass),
    "Direccion" character varying COLLATE pg_catalog."default",
    "IDUsuario" integer,
    "IDMunicipio" integer,
    CONSTRAINT direccion_pkey PRIMARY KEY ("IDDireccion"),
    CONSTRAINT "direccion_IDMunicipio_fkey" FOREIGN KEY ("IDMunicipio")
        REFERENCES public.municipio ("IDMunicipio") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "direccion_IDUsuario_fkey" FOREIGN KEY ("IDUsuario")
        REFERENCES public.usuario ("IDUsuario") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.direccion
    OWNER to postgres;
-- Index: ix_direccion_IDDireccion

-- DROP INDEX IF EXISTS public."ix_direccion_IDDireccion";

CREATE INDEX IF NOT EXISTS "ix_direccion_IDDireccion"
    ON public.direccion USING btree
    ("IDDireccion" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.pedido

-- DROP TABLE IF EXISTS public.pedido;

CREATE TABLE IF NOT EXISTS public.pedido
(
    "IDPedido" integer NOT NULL DEFAULT nextval('"pedido_IDPedido_seq"'::regclass),
    "NIT" character varying COLLATE pg_catalog."default",
    "Fecha" date,
    "IDDireccion" integer,
    CONSTRAINT pedido_pkey PRIMARY KEY ("IDPedido"),
    CONSTRAINT "pedido_IDDireccion_fkey" FOREIGN KEY ("IDDireccion")
        REFERENCES public.direccion ("IDDireccion") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pedido
    OWNER to postgres;
-- Index: ix_pedido_IDPedido

-- DROP INDEX IF EXISTS public."ix_pedido_IDPedido";

CREATE INDEX IF NOT EXISTS "ix_pedido_IDPedido"
    ON public.pedido USING btree
    ("IDPedido" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.tarjeta

-- DROP TABLE IF EXISTS public.tarjeta;

CREATE TABLE IF NOT EXISTS public.tarjeta
(
    "IDTarjeta" integer NOT NULL DEFAULT nextval('"tarjeta_IDTarjeta_seq"'::regclass),
    "Identificador" bigint,
    "YearVencimiento" integer,
    "MesVencimiento" integer,
    "NombreTitular" character varying COLLATE pg_catalog."default",
    "CodigoSeguridad" integer,
    "TipoCredito" boolean,
    "IDUsuario" integer,
    "IDMarca" integer,
    CONSTRAINT tarjeta_pkey PRIMARY KEY ("IDTarjeta"),
    CONSTRAINT "tarjeta_IDMarca_fkey" FOREIGN KEY ("IDMarca")
        REFERENCES public.marca ("IDMarca") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "tarjeta_IDUsuario_fkey" FOREIGN KEY ("IDUsuario")
        REFERENCES public.usuario ("IDUsuario") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tarjeta
    OWNER to postgres;
-- Index: ix_tarjeta_IDTarjeta

-- DROP INDEX IF EXISTS public."ix_tarjeta_IDTarjeta";

CREATE INDEX IF NOT EXISTS "ix_tarjeta_IDTarjeta"
    ON public.tarjeta USING btree
    ("IDTarjeta" ASC NULLS LAST)
    TABLESPACE pg_default;


