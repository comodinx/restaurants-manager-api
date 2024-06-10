# GET /restaurants/{id}/availability

## Introducción

Obtiene la disponibilidad para un restaurante por su ID

## URL

```jsx
GET /restaurants/{id}/availability
```

## Query parameters disponibles

| Nombre               | Tipo    | Valor por defecto | Descripción |
| :------------------- | ------- | ----------------- | ----------- |
| startDate            | string  | `2024-06-09`      | Fecha desde la que obtendremos el listado de mesas disponibles del restaurante |
| endDate              | string  | `2024-06-16`      | Fecha hasta la que obtendremos el listado de mesas disponibles del restaurante |
| includeNotAvailables | boolean | `false`           | Indica se deben incluir las mesas ya reservadas en los entries de cada timeline |
| includeRestaurant    | boolean | `false`           | Indica se debe incluir el restaurante en la respuesta |

## **Ejemplo**

Objetivo: 

- Obtener las mesas disponibles para el restaurante `1`
- Solo requerimos las disponibilidad entre las fechas `2024-06-09` y `2024-06-11`
- Que incluya el restaurante
- Que incluya el las mesas no disponibles

### Request

```jsx
Request

/restaurants/1/availability?startDate=2024-06-09&endDate=2024-06-11&includeNotAvailables=true&includeRestaurant=true
```

### Response

```json
200 OK

{
  "timelines": {
    "2024-06-09": [
      {
        "tableId": 1,
        "available": true
      },
      {
        "tableId": 2,
        "available": true
      },
      {
        "tableId": 3,
        "available": true
      },
      {
        "tableId": 4,
        "available": true
      },
      {
        "tableId": 5,
        "available": false,
        "reservation": {
          "id": 1,
          "customerId": 1
        }
      }
    ],
    "2024-06-10": [
      {
        "tableId": 1,
        "available": false,
        "reservation": {
          "id": 4,
          "customerId": 3
        }
      },
      {
        "tableId": 2,
        "available": false,
        "reservation": {
          "id": 3,
          "customerId": 3
        }
      },
      {
        "tableId": 3,
        "available": true
      },
      {
        "tableId": 4,
        "available": true
      },
      {
        "tableId": 5,
        "available": false,
        "reservation": {
          "id": 2,
          "customerId": 2
        }
      }
    ],
    "2024-06-11": [
      {
        "tableId": 1,
        "available": true
      },
      {
        "tableId": 2,
        "available": true
      },
      {
        "tableId": 3,
        "available": true
      },
      {
        "tableId": 4,
        "available": true
      },
      {
        "tableId": 5,
        "available": true
      }
    ]
  },
  "restaurant": {
    "id": 1,
    "active": 1,
    "description": "Italian Corner",
    "email": "reservas@italiancorner.com",
    "phone": null,
    "address": "Chau. de Bruxelles 351, 6042 Charleroi, Tigre, Argentina",
    "createdAt": "2024-06-09T22:56:28.000Z",
    "updatedAt": null,
    "tables": [
      {
        "id": 1,
        "restaurantId": 1,
        "capacity": 2,
        "observations": "Mesa cuadrada",
        "createdAt": "2024-06-09T22:56:28.000Z",
        "updatedAt": null
      },
      {
        "id": 2,
        "restaurantId": 1,
        "capacity": 2,
        "observations": "Mesa cuadrada",
        "createdAt": "2024-06-09T22:56:28.000Z",
        "updatedAt": null
      },
      {
        "id": 3,
        "restaurantId": 1,
        "capacity": 4,
        "observations": "Mesa rectangular",
        "createdAt": "2024-06-09T22:56:28.000Z",
        "updatedAt": null
      },
      {
        "id": 4,
        "restaurantId": 1,
        "capacity": 4,
        "observations": "Mesa rectangular",
        "createdAt": "2024-06-09T22:56:28.000Z",
        "updatedAt": null
      },
      {
        "id": 5,
        "restaurantId": 1,
        "capacity": 6,
        "observations": "Mesa redonda",
        "createdAt": "2024-06-09T22:56:28.000Z",
        "updatedAt": null
      }
    ]
  }
}
```

### Errores

```json
400 BAD REQUEST

# Ejemplo, no enviamos la fecha desde (startDate)

{
  "path": "/restaurants/1/availability?endDate=2024-06-11&includeNotAvailables=true&includeRestaurant=true",
  "statusCode": 400,
  "rawStatusCode": 400,
  "message": "Bad Request Exception",
  "errors": [
    "La fecha de inicio es requerida.",
    "La fecha de inicio no es válida (YYYY-MM-DD).",
    "La fecha de inicio no es válida."
  ]
}
```
