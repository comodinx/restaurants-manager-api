<div id="top"></div>

# API Restaurantes

Esta API se encarga de manejar todo lo necesario para las reservas de las mesas en los diferentes restaurantes que maneja el sistema.

## Index

* [Descargar][descargar]
* [Configuraciones][configuraciones]
* [Base de datos][base_de_datos]
* [¿Cómo se corre?][como_se_corre]
* [Documentación de la API][documentacion_de_la_api]
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
>  - DB Name -> `restaurants`
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


## Documentación de la API
Van a poder encontrar la documentación de la API en este [link](https://github.com/comodinx/restaurants-manager-api/blob/main/doc/README.md)

<p align="right">(<a href="#top">ir arriba</a>)</p>


## Tests

Para ver ejemplos más concretos, **LOS INVITO A VER LAS PRUEBAS :)**

### Ejecutar las pruebas unitarias
```shell
npm test
```

<p align="right">(<a href="#top">ir arriba</a>)</p>


```
💡 Para la solución de este ejercicio incluimos la carpeta `dist` para evitar compilaciones en la micro VM donde lo deployamos temporalmente para la demo.
```


<!-- deep links -->
[descargar]: #descargar
[configuraciones]: #configuraciones
[base_de_datos]: #base-de-datos
[como_se_corre]: #como-se-corre
[documentacion_de_la_api]: #documentacion-de-la-api
[tests]: #tests
