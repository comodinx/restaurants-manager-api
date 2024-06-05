<div id="top"></div>

# API para administración de restaurantes

Esta API se encarga de manejar todo lo necesario para la administración de restaurantes y la reserva de las mesas en los mismos.

## Index

* [Descargar][descargar]
* [Base de datos][base_de_datos]
* [¿Cómo se corre?][como_se_corre]
* [Endpoints][endpoints]
* [Tests][tests]


## Descargar

### Código fuente
```shell
$ git clone https://github.com/comodinx/restaurants-manager-api.git
$ cd restaurants-manager-api
$ npm i
```

<p align="right">(<a href="#top">ir arriba</a>)</p>


## Configuraciones

Para el correcto funcionamiento de la API, la misma, cuenta con un archivo `.env.example`. En él se encuentran las configuraciones mínimas para poder correrla.

Para que levante dichas configuraciones, es necesario correr el siguiente comando,
```shell
$ cp .env.example .env
```

<p align="right">(<a href="#top">ir arriba</a>)</p>


## Base de datos

La base de datos esta pensada en MySQL. La misma se encuentra en el root del projecto, dentro de la carpeta `database`.

### Instalar DB

```shell
# Instalar la base de datos en el entorno local, con las credenciales de conexión predeterminadas.
npm run db:install

#
# Instalar la base de datos con las credenciales de customizadas.
npm run db:install -- --host docker.mysql.host --user admin --pass 1234abcd
#
# o
DB_HOST=docker.mysql.host DB_USER=admin DB_PASS=1234abcd npm run db:install

#
# Para mas detalles, correr
npm run db:install -- --help
```

> Valores por defecto
>  - DB Name -> `laikapp_subscription`
>  - DB Host -> `localhost`
>  - DB User -> `root`
>  - DB User -> `WwFFTRDJ7s2RgPWx`

<p align="right">(<a href="#top">ir arriba</a>)</p>


## ¿Cómo se corre?

### Correr

Si ya realizo la configuración, recuerde configurar las variables de entorno del archivo `.env` con los valores correctos. Luego ejecute uno de los siguientes comandos:

```shell
# Desarrollo
npm run dev

# Producción
npm run build && npm start
```

<p align="right">(<a href="#top">ir arriba</a>)</p>


## Endpoints
* `GET` [/health](#get-health) Health check.

<p align="right">(<a href="#top">ir arriba</a>)</p>

>
> 💡 Se debe reemplazar con el valor que corresponda para `<ENTORNO>`.
>

<p align="right">(<a href="#top">ir arriba</a>)</p>


## Tests

Para ver ejemplos más concretos, **LOS INVITO A VER LAS PRUEBAS :)**

### Ejecutar las pruebas unitarias
```shell
npm test
```

<!-- deep links -->
[descargar]: #descargar
[base_de_datos]: #base-de-datos
[como_se_corre]: #como-se-corre
[endpoints]: #endpoints
[tests]: #tests
