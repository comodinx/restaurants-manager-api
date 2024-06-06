<div id="top"></div>

# Query

Esta sección fue diseñada para facilitar la interpretación de los query parameters.


## ¿Qué parametros acepta?

### Paginación

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| page     | number | `1`               | Indica que página del listado se debe retornar                |
| pageSize | number | `null`            | Indica la cantidad de registros por página                    |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Ordenamiento

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| order    | string | `null`            | Ordenamiento a aplicar en el resultado de la búsqueda.        |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `createdAt-DESC`                                              |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Agrupamiento

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| group    | string | `null`            | Agrupamiento a aplicar en el resultado de la búsqueda.        |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `platform`                                                    |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Filtrado

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| filters  | string | `null`            | Filtros a aplicar en la búsqueda.                             |
|          |        |                   | Todos los campos de la tabla son aplicables para el filtrado. |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `statusId eq 1`                                               |

> 💡 Para ver mas detalle del funcionamiento de los filtros y su sintaxis, [acceder a este link](https://www.npmjs.com/package/@comodinx/query-filters)

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Relaciones

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| include  | string | `null`            | Relaciones a incluir en el resultado de la búsqueda.          |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `status,r-products`                                           |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Campos

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| fields   | string | `"*"`             | Campos a incluir en el resultado de la búsqueda.              |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `id,statusId`                                                 |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


### Extras

| Nombre   | Tipo   | Valor por defecto | Descripción                                                   |
|:---------|:-------|:------------------|:--------------------------------------------------------------|
| extras   | string | `null`            | Campos a extras a incluir en el resultado de la búsqueda.     |
|          |        |                   | Ejemplo,                                                      |
|          |        |                   | `category,brand`                                              |

<hr/>
<p align="right">(<a href="#top">ir arriba</a>)</p>


## Tests

Para ver ejemplos más concretos, **LOS INVITO A VER LAS PRUEBAS :)**

### Ejecutar las pruebas unitarias
```sh
npm test -- query
```

<p align="right">(<a href="#top">ir arriba</a>)</p>
