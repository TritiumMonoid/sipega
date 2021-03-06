![Logo DATUM](/imagenes/DATUM.png)
![Logo SIPEGA](/imagenes/SIPEGA.png)
# Sistema de Planes de Estudio para Gestión Académica (SIPEGA)
SIPEGA es un sistema de información diseñado para llevar a cabo procesos de gestión académica de una manera más eficiente y automatizada. Consta de diferentes componentes que se comunican entre sí por medio de un REST API escrito en javascript.

## Cómo empezar
Clona el repositorio con el siguiente comando:
```shell
git clone https://github.com/TritiumMonoid/sipega.git
```

Carga la base de datos de MySQL con el siguiente comando (por lo pronto solo se tiene el microservicio autentificador):
```shell
# se dirige al directorio donde se encuentra la base de datos
cd sipega/base_de_datos/

# accede a mysql
mysql -u root -p

# crea la base de datos y sale
CREATE DATABASE Sipega;
exit

# carga la base de datos
mysql -u root -p Sipega < Sipega.sql
```

Para poder hacer uso de los microservicios se debe de asignar la variable de entorno `$DB_PASSWORD` con la contraseña a la base de datos MySQL:
```shell
# asigna la variable de entorno en linux
export DB_PASSWORD=contraseña

# asigna la variable de entorno en windows
SET DB_PASSWORD=contraseña
```

De manera alternativa, también se puede asignar la variable de un archivo para que no esté guardada en el historial:
```shell
# asigna la variable de entorno desde un archivo en linux
export DB_PASSWORD=$(cat ruta_al_archivo.txt)

# asigna la variable de entorno desde un archivo en windows
set /p DB_PASSWORD=<ruta_al_archivo.txt
```

Se puede revisar si se asignó correctamente la variable de entorno de esta forma:
```shell
# muestra la variable de entorno en linux
echo $DB_PASSWORD

# muestra la variable de entorno en windows
echo %DB_PASSWORD%
```

Instala las dependencias necesarias e inicia los microservicios (por lo pronto solo se tiene el microservicio autentificador):
```shell
# se dirige al directorio del microservicio autentificador
cd ../autentificador

# instala las dependencias necesarias
npm install .

# se dirige al directorio del código fuente
cd src/

# inicia el microservicio
node autentificador.js
```

## Cómo probar
Como se basa en un REST API se pueden hacer peticiones para manipular los datos. Para probar el REST API se puede usar el comando curl. A continuación se muestra una lista de las operaciones válidas de cada microservicio:

### Autentificador
##### Usuario
* POST http://localhost:3000/usuario
Toma como argumento el hash SHA-256 de la contraseña y regresa el id del usuario si se inserta de forma exitosa.
* GET http://localhost:3000/usuario/$usuarioId
Toma como argumento el id del usuario y regresa el registro en formato json.
* DELETE http://localhost:3000/usuario/$usuarioId
Toma como argumento el id del usuario y regresa el id del usuario si se borra de forma exitosa.
```shell
# crea un usuario
curl -X POST http://localhost:3000/usuario -d "clave=123456789"

# consulta un usuario
curl -X GET http://localhost:3000/usuario/2

# borra un usuario
curl -X DELETE http://localhost:3000/usuario/2
```

#### Privilegio
* POST http://localhost:3000/privilegio
Toma como argumento la descripcion del privilegio y regresa el id del privilegio si se inserta de forma exitosa.
* GET http://localhost:3000/privilegio/$privilegioId
Toma como argumento el id del privilegio y regresa el registro en formato json.
* DELETE http://localhost:3000/privilegio/$privilegioId
Toma como argumento el id del privilegio y regresa el id del privilegio si se borra de forma exitosa.
```shell
# crea un privilegio
curl -X POST http://localhost:3000/privilegio -d "descripcion=Prueba"

# consulta un privilegio
curl -X GET http://localhost:3000/privilegio/2

# borra un privilegio
curl -X DELETE http://localhost:3000/privilegio/2
```

#### Acceso
* POST http://localhost:3000/usuario/$usuarioId/privilegio/$privilegioId
Toma como argumentos el id del usuario, el id del privilegio, permiso de lectura, escritura y ejecucion en forma de un valor booleano y regresa el id del acceso si se inserta de forma exitosa.
* GET http://localhost:3000/usuario/$usuarioId/privilegio/$privilegioId
Toma como argumentos el id del usuario, el id del privilegio y regresa el registro más nuevo que tiene en formato json.
```shell
# crea un acceso
curl -X POST http://localhost:3000/usuario/2/privilegio/2 -d "lectura=TRUE&escritura=FALSE&ejecucion=TRUE"

# consulta un acceso
curl -X GET http://localhost:3000/usuario/2/privilegio/2
```
