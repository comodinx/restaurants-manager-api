# GET /restaurants

## Introducción

Obtiene un listado de los restaurantes

## URL

```jsx
GET /restaurants
```

## Query parameters disponibles

| Nombre   | Tipo   | Valor por defecto | Descripción |
| :------- | ------ | ----------------- | ----------- |
| page     | number | `1`               | Indica que página del listado se debe retornar |
| pageSize | number | `null`            | Indica la cantidad de registros por página |
| filters  | string | `null`            | Filtros a aplicar en la búsqueda. https://www.npmjs.com/package/@comodinx/query-filters<br/>Todos los campos de la tabla son aplicables para el filtrado.<br/>Ejemplo,<br/>`active eq 1` |
| order    | string | `null`            | Ordenamiento a aplicar en el resultado de la búsqueda.<br/>Ejemplo,<br/>`createdAt-DESC` |
| include  | string | `null`            | Relaciones a incluir en el resultado de la búsqueda.<br/>Ejemplo,<br/>`tables` |

## **Ejemplo**

Objetivo: 

- Obtener los primeros `4` restaurantes
- Que esten activos

### Request

```jsx
Request

/restaurants?pageSize=4&filters=active eq 1
```

### Response

```json
200 OK

[
  {
    "id": 1,
    "active": 1,
    "description": "Italian Corner",
    "email": "reservas@italiancorner.com",
    "phone": null,
    "address": "Chau. de Bruxelles 351, 6042 Charleroi, Tigre, Argentina",
    "createdAt": "2024-06-07T11:45:08.000Z",
    "updatedAt": null
  },
  {
    "id": 2,
    "active": 1,
    "description": "Kansas",
    "email": "contact@kansas.com",
    "phone": "555-5678",
    "address": "Avenida de la Libertad 123, San Isidro, Argentina",
    "createdAt": "2024-06-07T11:45:08.000Z",
    "updatedAt": null
  },
  {
    "id": 3,
    "active": 1,
    "description": "Taco Box",
    "email": "contact@tacobox.com",
    "phone": "555-1234",
    "address": "Calle de las Flores 45, Vicente Lopez, Argentina",
    "createdAt": "2024-06-07T11:45:08.000Z",
    "updatedAt": null
  },
  {
    "id": 4,
    "active": 1,
    "description": "CampoBravo",
    "email": "contact@campobravo.com",
    "phone": "555-4321",
    "address": "Plaza Mayor 67, CABA, Argentina",
    "createdAt": "2024-06-07T11:45:08.000Z",
    "updatedAt": null
  }
]
```
