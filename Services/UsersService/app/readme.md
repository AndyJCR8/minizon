# Dependencias del servicio
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
```sh
pip install pyjwt[crypto]
```

> En caso de error al ejecutar 'pyjwt[crypto]' probar con el siguiente comando:
>
> ```sh
> pip install pyjwt\[crypto\]
> ``` 
> ##


### SQLAlchemy

```sh
pip install SQLAlchemy
```

# Iniciar servicio

>Ejecutar el siguiente comando en una consola en el directorio <span style="color:#555"><em>/UsersService</em></span>

```sh
uvicorn app.main:app --reload
```
>Posteriormente entrar a un navegador e ingresar a la siguiente dirección **http://localhost:8000/**

# Token keys

> Para que el servicio funcione correctamente es necesario generar las claves públicas y privadas para el proyecto, por lo que es necesario crear una carpeta dentro del directorio acutal llamada **TokenKeys** y en su interior deben existir los archivos con las claves del servicio

