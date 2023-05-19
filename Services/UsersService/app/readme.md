# Dependencias
### FastAPI

```sh
pip install fastapi
```
### Uvicorn

```sh
pip install "uvicorn[standar]"
```

### JWT

```sh
pip install pyjwt
```
> soporte para el algoritmo RSA
```sh
pip install "pyjwt[crypto]"
```

### bcrypt

```sh
pip install bcrypt
```

### SQLAlchemy

```sh
pip install SQLAlchemy
```

### Pydantic
```sh
pip install pydantic
```

### psycopg2
```sh
pip install psycopg2
```

### Variables de entorno

>Para que pueda funcionar el servicio es neceasrio indicar en el archivo **.env** las siguientes variables de entorno:
> * **DB_HOST**: dirección de alojamiento de la base de datos de PostgreSQL, Ej. <em>localhost</em> o <em>127.0.0.1</em>
> * **DB_USER**: nombre del usuario de la base de datos
> * **DB_PASS**: contraseña de acceso a la base de datos
> * **DB_NAME**: nombre de la base de datos de usuarios
> * **S2_DOMAIN**: nombre de dominio donde esté alojado el servicio 2 <em>(servicio de pedidos)</em>, por ejemplo: localhost:8001
> * **S3_DOMAIN**: nombre de dominio donde esté alojado el servicio 3 <em>(servicio de cobros)</em>, por ejemplo: localhost:8002
>> solo indicar el nombre, ya que la extensión debe terminar obligatoriamente en **.pem** en ambas claves
> * **JWT_PASS**: contraseña para cifrar y decifrar tokens JWT
> 
> Es importante tomar en cuenta que el archivo **.env.example** contiene un ejemplo de configuración de las variables de entorno, y que para que el proyecto sea funcional es necesario la creación del archivo **.env** manualmente y colocar correctamente las credenciales anteriormente mencionadas

# Iniciar servicio

>Ejecutar el siguiente comando en una consola en el directorio <span style="color:#555"><em>/UsersService</em></span>

```sh
uvicorn app.main:app --reload
```
>Posteriormente entrar a un navegador e ingresar a la siguiente dirección **http://localhost:8000/**
>
> Para usar un puerto distinto utilizar el atributo **--port=PUERTO**
```sh
uvicorn app.main:app --reload --port=8010
```
>Por lo que la ruta a acceder es la siguiente: **http://localhost:8010/**
