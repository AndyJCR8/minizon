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


### SQLAlchemy

```sh
pip install SQLAlchemy
```

### Pydantic
```sh
pip install pydantic
```

# Seguridad
### Token keys

> Para que el servicio funcione correctamente es necesario generar las claves públicas y privadas para el proyecto, por lo que es necesario crear una carpeta dentro del directorio acutal llamada **TokenKeys** y en su interior deben existir los archivos con las claves del servicio
> 
> La generación de claves pública y privada se realizó por medio de la consola de comandos, a través de la aplicación **OpenSSL**. Los siguientes comandos son capaces de generar las claves necesarias para el correcto funcionamiento del proyecto:
```sh
# Generación de la clave privada
# Tomar en cuenta que cuando solicite el ingreso de la frase secreta, guardar dicha constraseña en un lugar seguro para colocarlo posteriormente en el archivo ".env"
openssl genpkey -algorithm RSA -aes256 -out private_key.pem -aes256 -aes256 -aes256 -aes256 -aes256 -aes256
```
```sh
# Generación de la clave pública basada en la privada
# Nuevamente en la solicitud de ingreso de la frase, colocar la utilizada en el comando anterior
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

### Variables de entorno

>Para que pueda funcionar el servicio es neceasrio indicar en el archivo **.env** las siguientes variables de entorno:
> * **DB_HOST**: dirección de alojamiento de la base de datos de PostgreSQL, e.g: <em>localhost</em> o <em>127.0.0.1</em>
> * **DB_USER**: nombre del usuario de la base de datos
> * **DB_PASS**: contraseña de acceso a la base de datos
> * **DB_NAME**: nombre de la base de datos de usuarios
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