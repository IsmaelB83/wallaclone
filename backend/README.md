# 0) BONUS TRACK - Crear nuestro primer módulo público

El que he creado se llama [marvel-random-hero](https://www.npmjs.com/package/marvel-random-hero), y proporciona una capa de abstracción sobre la API de Marvel, que permite obtener cada vez que es invocado un heroe aleatorio.

- **Página del módulo en npmjs**: El modulo NPM se encuentra publicado aquí: (https://www.npmjs.com/package/marvel-random-hero)
- **Repositorio con el código fuente**: El código fuente del repositorio aquí: (https://github.com/IsmaelB83/marvel-random-hero)
- **Demo del módulo**: App sencilla en react, que muestra una tarjeta con los datos del hero random devuelto (https://github.com/IsmaelB83/marvel-random-hero-demo)
- **Demo live en heroku**: [DEMO-LIVE](https://marvel-random-hero-demo.herokuapp.com/)

# 1) Version 2.0 de nodepop adaptada para el módulo de backend avanzado

Este repositorio es una versión avanzada del proyecto nodepop desarrollado en el módulo de backend del bootcamp de Keepcoding.
Para mantener el repositorio original intacto (https://github.com/IsmaelB83/keepcoding-nodepop-api), he creado este nuevo repositorio.

Las mejoras introducidas en esta versión son:
- Creación del **modelo de usuario** y persistencia en mongodb.
- **Envío de mails para activación de cuenta de usuario**. Mediante el uso de token con expiración temporal.
- **Securización de la API** mediante Json Web Token.
- **Securización del frontal** web mediante express-session y connect-mongo
- **Carga de imagenes** de los anuncios desde el API
- Implementación de un **microservicio sobre rabbitMQ** para generar los thumbnails de la imagen anterior 
- **Internacionalización del frontal web** mediante i18n.
- **Uso de .env y dot-env** para almacenar configuración sensible de la aplicación.
- **Supertest**: implementado jest y supertest para testear el api. Para arrancarlo hacer uso de **npm run test** o **npm run test:watch**

## CONTENTS
- [DEPENDENCIAS](#DEPENDENCIAS)
  - [Funcionalidad básica del servidor y API](#Funcionalidad-básica-del-servidor-y-API)
  - [Gestión de ficheros .env](#Gestión-de-ficheros-.env)
  - [Authenticación y gestión de sesiones](#Authenticación-y-gestión-de-sesiones)
  - [Tratamiento de imagenes](#Tratamiento-de-imagenes)
  - [Internacionalización](#Internacionalización)
  - [Microservicio de generación de thumbnails](#Microservicio-de-generación-de-thumbnails)
  - [Envío de mails](#Envío-de-mails)
- [INSTALACIÓN Y EJECUCIÓN](#INSTALACIÓN-Y-EJECUCIÓN)
  - [Descarga](#Descarga)
  - [Instalación de modulos](#Instalación-de-modulos)
  - [Inicialización de base de datos](#Inicialización-de-base-de-datos)
  - [Configuración](#Configuración)
  - [Lanzar-tests-unitarios](Lanzar-tests-unitarios)
  - [Ejecución](#Ejecución)
- [REST API](#REST-API)
  - [Autenticación](#Autenticación)
  - [User](#User)
    - [User-schema](#User-schema)
    - [Crear un usuario](#Crear-un-usuario)
  - [Anuncios](#Anuncios)
    - [Anuncios Schema](#Anuncios-schema)
    - [Obtener todos los anuncios](#Obtener-todos-los-anuncios)
    - [Obtener un único anuncio](#Obtener-un-único-anuncio)
    - [Filtrado de anuncios](#Filtrado-de-anuncios)
    - [Listado de tags](#Listado-de-tags)
    - [Crear un anuncio](#Crear-un-anuncio)
    - [Actualizar un anuncio](#Actualizar-un-anuncio)
- [WEB](#web)
  - [Create user](#Create-user)
  - [Login](#Login)
  - [Home](#Home)
  - [Detail](#Detail)
  
## DEPENDENCIAS

Esta aplicación hace uso de los siguientes módulos de npm:

### Funcionalidad básica del servidor y API
- "express": "^4.17.1"
- "express-validator": "^6.1.1"
- "body-parser": "^1.19.0"
- "cookie-parser": "^1.4.4"
- "cors": "^2.8.5"
- "ejs": "^2.6.2"
- "moment": "^2.24.0"
- "mongoose": "^5.7.5"
- "morgan": "^1.9.1"

### Gestión de ficheros .env
- "dotenv": "^8.2.0"

### Authenticación y gestión de sesiones
- "jsonwebtoken": "^8.5.1"
- "express-session": "^1.17.0"
- "connect-mongo": "^3.1.2"
- "bcrypt-nodejs": "0.0.3"

### Microservicio de generación de thumbnails
- "amqplib": "^0.5.5"
- "multer": "^1.4.2"
- "jimp": "^0.8.5"

### Internacionalización
- "i18n": "^0.8.4"

### Envío de mails
- "nodemailer": "^6.3.1"
- "juice": "^5.2.0"
- "html-to-text": "^5.1.1"
- "ejs-promise": "^0.3.3" 

### Tests
- "jest": "^24.9.0"
- "supertest": "^4.0.2"


## INSTALACIÓN Y EJECUCIÓN

### Descarga

Para descargar este repositorio:
```
\downloads\git clone https://github.com/IsmaelB83/keepcoding-nodepop-advanced.git
```

### Instalación de modulos

Utiliza npm install para instalar todas las dependencias de la aplicación
```
\downloads\keepcoding-nodepop-advanced\npm install
```

### Inicialización de base de datos

Inicializa la base de datos mongo. Esto borrará la colección "advert" de la base de datos mongo (nodepop), y creará los anuncios contenidos en
\downloads\keepcoding-nodepop-advanced\src\database\data.json
```
\downloads\keepcoding-nodepop-advanced\npm run init
```

### Configuración

Antes de arrancar debes generar un fichero .env, con la misma estructura que el .env.example que se adjunta a modo de ejemplo en el repositorio. En este fichero se deben indicar los siguientes parámetros mínimos:

Cadena de conexión a la base de datos mongodb:
- MONGODB_URL=MONGODB_URL=mongodb://localhost:27017/nodepop

Cadena de conexión a la cola rabbitmq, haciendo uso del protocolo amqp:
- RABBITMQ_URL=amqp://user:pass@hostname/instance

Secret utilizado para generación del JWT y la configuración de sessión del frontal web:
- SECRET=Asoqwdn1213nioasQW1wdmZsal

Rutas a los ficheros key y cert para poder arrancar el modo https:
- HTTPS_KEY=./certs/example.com+5-key.pem
- HTTPS_CERT=./certs/example.com+5.pem

Puerto en el que arrancar el servidor. Por defecto será el HTTPS.
- PORT=8443

Configuración de sendgrid para poder hacer uso del envio de mails (es necesario para activar nuevas cuentas de usuario). En el .env.example también hay parámetros de mailtrap. Pero no son necesarios en la configuración actual de la aplicación (que ya trabaja sobre sendgrid):
- SENDGRID_USER=user
- SENDGRID_PASS=pass

### Lanzar tests unitarios

Para lanzar los tests unitarios lanzar el siguiente script
```
\downloads\keepcoding-nodepop-advanced\npm run test         (o bien)
\downloads\keepcoding-nodepop-advanced\npm run test:watch
```

### Ejecución

Una vez configurado el fichero .env, arrancaremos la aplicación mediante:
```
\downloads\keepcoding-nodepop-advanced\npm start
```

Al mismo tiempo es necesario que arranquemos el microservicio encargado de generar los thumbnails. Para ello en una terminal adicional arrancaremos un worker de la siguiente forma:
```
\downloads\keepcoding-nodepop-advanced\npm run worker
```

## REST API

### Autenticación
Las rutas de anuncios de la API están securizadas mediante JWT. Para conseguir el token que da acceso al resto de rutas de la API es necesario autenticar mediante el siguiente endpoint (tipo POST). En el body hay que pasar el email y el password:
```
https://localhost:8443/apiv1/authenticate
```
El resultado de la llamada proporcionará el JWT a utilizar en el resto de llamadas. Los tokens tienen una vida de expiración de 60 minutos:

```js
{
    "success": true,
    "description": "Authorization successful",
    "user": {
        "name": "Ismael",
        "email": "user@example.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5hbWUiOiJJc21hZWwiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHBpcmVzIjoiMjAxOS0xMS0xNlQxNTowMzozNi41MDNaIn0sImlhdCI6MTU3MzkxMzAxNn0.kvYabTTHmJ_s1RoTd2-rp7km9eDEKE_Q4z1hYx4Mo-8"
    }
}
```

### User
Este recurso proporciona el modelo de usuario que utiliza la aplicación para autenticación

#### User-schema
|Key|Type|Description|
|---|---|---|
|_id|string|Id del usuario
|name|string|Nombre del usuario (30char)
|email|string|Email del usuario (150char)
|password|string|Password del usuario (min length 4char)
|jwt|string|JWT generado cuando un usuario autentica en la aplicación
|expire|Date|Fecha de expiración del JWT

#### Crear un usuario
Para crear un usuario debes llamar a la url base de users con el metodo POST. Pasando en el body del request todos los parametros para definir el nuevo usuario: name, email, password
```
https://localhost:8443/apiv1/user  (POST)
```

Esto generará la cuenta de usuario en estado inactivo. Para poder empezar a utilizar la cuenta de usuario se debe validar mediante correo electrónico. Nodepop enviará un correo electrónico a la dirección de mail proporcionada, este correo incorporará un enlace para la activación de la cuenta tipo al siguiente:

```
https://localhost:8443/apiv1/user/activate/01fdc7f33985b0493cb850b96f742332983bf57c  (GET)
```

### Anuncios
Este recurso proporciona el modelo de anunción que utiliza la aplicación como modelo básico para su funcionalidad tipo "tienda"

#### Anuncios-schema
|Key|Type|Description|
|---|---|---|
|_id|string|Id del anuncio
|name|string|Nombre del anuncio (30char)
|description|string|Descripción larga del anuncio (100char)
|price|number|Precio de compra/venta
|type|string|Tipo del anuncio. Puede ser 'buy' o 'sell'
|photo|string|Url a la imagen principal del anuncio
|thumbnail|string|Url a la imagen tipo thumbnail del anuncio
|tags|array|Array de tags asociados al anuncio


#### Obtener todos los anuncios
Pueds obtener todos los anuncios de la base de datos mediante el endpoint `/adverts`.
```
https://localhost:8443/apiv1/adverts
```
```js
{
  "success": true,
  "results": [
    {
      "tags": [
        "lifestyle"
      ],
      "_id": "5d3a0a5f9bd7ed2ece463ab4",
      "name": "PS4Pro",
      "description": "Compro PS4 Pro con menos de 1 año de uso",
      "price": 200.99,
      "type": "buy",
      "photo": "/images/adverts/original/ps4pro.jpg",
      "thumbnail": "/images/adverts/thumbnail/ps4pro.jpg",
      "__v": 0,
      "createdAt": "2019-07-25T20:00:31.944Z",
      "updatedAt": "2019-07-25T20:00:31.945Z"
    },
    // ...
  ]
}
```
#### Obtener un único anuncio
Puede obtener un único anuncio añadiendo el `id` a continuación del endpoint: `/adverts5d3a0a5f9bd7ed2ece463ab4`
```
https://localhost:8443/apiv1/adverts/5d3a0a5f9bd7ed2ece463ab4
```
```js
{
  "success": false,
  "result": {
    "tags": [
      "lifestyle"
    ],
    "_id": "5d3a0a5f9bd7ed2ece463ab4",
    "name": "PS4Pro",
    "description": "Compro PS4 Pro con menos de 1 año de uso",
    "price": 200.99,
    "type": "buy",
    "photo": "/images/adverts/original/ps4pro.jpg",
    "thumbnail": "/images/adverts/thumbnail/ps4pro.jpg",
    "__v": 0,
    "createdAt": "2019-07-25T20:00:31.944Z",
    "updatedAt": "2019-07-25T20:00:31.945Z"
  }
}
```

#### Filtrado de anuncios
Puedes incluir filtros en la URL añadiendo parametros especiales a la consulta. Para comenzar con el filtrado incorpora el carácter `?` seguido de las queries a incorporar
en el siguiente formato `<query>=<value>`. Si necesitas encadenar varias consultas puedes utilizar el carácter `&`.

Ejemplos de consultas:
- Todos los anuncios que contienen el `tag` lifestyle: https://localhost:8443/apiv1/adverts?tag=lifestyle: 
- Todos los anuncios con `price` entre 1 y 100: https://localhost:8443/apiv1/adverts?price=1-100
- Las dos consultas anteriores combinadas: https://localhost:8443/apiv1/adverts?tag=lifestyle&price=1-100
- Precio entre 1 y 100 de anuncios que empiecen por 'Com': https://localhost:8443/apiv1/adverts?price=1-100&name=Com
- Sólo los anuncios de venta: https://localhost:8443/apiv1/adverts?venta=true
- Sólo los anuncios de compra: https://localhost:8443/apiv1/adverts?venta=false


Los parámetros disponibles para filtrado son:
- `name`: filtrado por los que empiecen con el string indicado (la API NO es case sensitive).
- `price`: filtrar por precio. Entre un rango x-y, menores a un precio x-, o mayores a un precio -y.
- `tag`: permite filtrar los anuncios que tengan el tag indicado. Dentro de los posibles (`work`, `lifestyle`, `motor`, `mobile`).
- `venta`: permite filtrar por anuncios de venta (=true), o anuncios de compra (=false)
- `skip`: permite saltar resultados (utilizado para paginar junto con limit)
- `limit`: permite limitar el número de resultados devueltos
- `fields`: campos a mostrar del anuncio

*Ejemplo de consulta*
```
https://localhost:8443/apiv1/adverts?price=1-100&venta=false
```
```js
{
  "success": true,
  "results": [
    {
      "tags": [
        "lifestyle"
      ],
      "_id": "5d3a0a5f9bd7ed2ece463abc",
      "name": "Comba de Crossfit",
      "price": 8,
      "description": "Soy el de las calleras.",
      "type": "buy",
      "photo": "/images/adverts/comba.jpg",
      "__v": 0,
      "createdAt": "2019-07-25T20:00:31.945Z",
      "updatedAt": "2019-07-25T20:00:31.945Z"
    },
    {
      "tags": [
        "lifestyle",
        "work",
        "mobile"
      ],
      "_id": "5d3a0a5f9bd7ed2ece463ab7",
      "name": "Teclado Gaming Razer Chroma",
      "price": 70,
      "description": "Busco teclado razer en buen estado.",
      "type": "buy",
      "photo": "/images/adverts/tecladorazer.jpg",
      "__v": 0,
      "createdAt": "2019-07-25T20:00:31.945Z",
      "updatedAt": "2019-07-25T20:00:31.945Z"
    },
    {
      "tags": [
        "lifestyle"
      ],
      "_id": "5d3a0a5f9bd7ed2ece463abb",
      "name": "Calleras Crossfit",
      "price": 15,
      "description": "Dejate de romperte las manos en los WODs",
      "type": "buy",
      "photo": "/images/adverts/calleras.jpg",
      "__v": 0,
      "createdAt": "2019-07-25T20:00:31.945Z",
      "updatedAt": "2019-07-25T20:00:31.945Z"
    }
  ]
}
```

#### Listado de tags
Puedes obtener un listado de los tags existentes en la base de datos mediante el recurso /tag de la API: http://127.0.0.1:3001/apiv1/tags

*Ejemplo de consulta*
```
http://127.0.0.1:3001/apiv1/tags
```
```js
{
  "success": true,
  "count": 4,
  "results": [
    "lifestyle",
    "mobile",
    "motor",
    "work"
  ]
}
```

#### Crear un anuncio
Para crear un anuncio debes llamar a la url base de anuncios con el metodo POST. Pasando en el body del request todos los parametros para definir el nuevo anuncio
```
https://localhost:8443/apiv1/adverts  (POST)
```

En un primer momento tanto "photo" como "thumbnail apuntarán a la misma url con la imagen generada. Esta url será la ubicada en la ruta /public/images/adverts/original. Adicionalmente, el controlador de la API generará un mensaje contra la cola rabbitmq, para que un worker se encargue de generar el resize de la imagen (el thumbnail), y adicionalmente actualizar el modelo (advert), apuntando el campo "thumbnail" a la nueva imagen generada. Que en este caso estará en la ruta /public/images/adverts/thumbnail.

De esta forma, mediante el uso de rabbitmq y un microservicio para la gestión de la generación del thumbnail, conseguimos desacoplar totalmente la generación de los thumbnails de la propia funcionalidad de la API.

#### Actualizar un anuncio
Para actualizar un anuncio se debe llamar a la URL base de un anuncio único `anuncio/id` utilizando el metodo PUT. Además en el body del request se indicarán los nuevos valores
de los parametros que se deseen modificar.
```
https://localhost:8443/apiv1/adverts/5d3a0a5f9bd7ed2ece463abb  (PUT)
```

## WEB

Adicionalmente a la API se proporciona una web con la posibilidad de ver todos los anuncios disponibles en nodepop (tanto a nivel de lista como de detalle).

### Create user
Para crear un usuario desde la web, debemos acceder a la ruta siguiente. También se puede acceder desde el propio login (vista por defecto que renderiza la app), y haciendo click en el enlace de la parte inferior del formulario que dice: "go to create account":
```
https://localhost:8443/user/create
```

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-nodepop-advanced/master/public/images/readme/create.jpg)

Una vez rellenados los datos del formulario, y pulsado en "create account", la aplicación nos enviará un mail que debemos confirmar para que la cuenta se encuentre activa. Hasta ese momento la cuenta permanecerá inactiva, y por tanto no podrá ser utilizada para hacer login. El mail que se recibe contiene una ruta similar a la siguiente, con un token de activación que se asigna a la cuenta del usuario al momento de crear la cuenta:
```
https://localhost:8443/user/activate/d44d7e3eb7006eb3fbf6ddc39456c5ba4794edfa         (version web)
https://localhost:8443/apiv1/user/activate/d44d7e3eb7006eb3fbf6ddc39456c5ba4794edfa   (version api)
```

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-nodepop-advanced/master/public/images/readme/mail.jpg)


### Login
Para acceder a la aplicación debemos indicar nuestro email y contraseña. Si las credenciales son válidas, se accederá automáticamente la zona privada, donde podremos ver los anuncios de nodepop:
```
https://localhost:8443/user/login
```

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-nodepop-advanced/master/public/images/readme/login.jpg)


### Home
En esta vista se muestran todos los anuncios disponibles en nodepop. Se accede a ella directamente una vez hemos hecho login en la aplicación:
```
https://localhost:8443/
```

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-nodepop-advanced/master/public/images/readme/home.jpg)


### Detail
En esta vista se muestra la tarjeta de detalle de un anuncio. Se accede a ella desde el home, cuando pulsamos en el "detalle" de un anuncio concreto:
```
https://localhost:8443/5d3a0a5f9bd7ed2ece463abc
```

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-nodepop-advanced/master/public/images/readme/detail.jpg)