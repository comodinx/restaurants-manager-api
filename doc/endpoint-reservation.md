# GET /reservations

## Introducción

Crear una Reserva.

## Ejemplo

### Request

```jsx
POST /reservations

{
  "restaurantId": 1,
  "tableId": 1,
  "name": "Nico Molina",
  "email": "comodinx@gmail.com",
  "phone": "+5491112341234",
  "reservationDate": "2024-06-09",
  "numGuests": 2
}
```

### Response

```json
200 OK

{
  "id": 1,
  "statusId": 1,
  "tableId": 1,
  "customerId": 1,
  "reservationDate": "2024-06-07",
  "numGuests": 2
}
```

### Errores

```json
400 BAD REQUEST

{
  "path": "/reservations",
  "statusCode": 400,
  "rawStatusCode": 400,
  "message": "Bad Request Exception",
  "errors": [
    "El ID del cliente debe ser mayor a 0.",
    "El cliente no es válido.",
    "El correo electrónico no es válido."
  ],
  "extra": {
    "statusCode": 400,
    "message": [
      "El ID del cliente debe ser mayor a 0.",
      "El cliente no es válido.",
      "El correo electrónico no es válido."
    ],
    "error": "Bad Request"
  }
}
```

```json
409 CONFLIC

{
	"path": "/reservations",
	"statusCode": 409,
	"rawStatusCode": 409,
	"message": "Ya existe una reserva para la fecha seleccionada",
	"errors": "Ya existe una reserva para la fecha seleccionada",
	"extra": {
		"code": "INVALID_RESERVATION_DATE",
		"reservationId": 2,
		"customerId": 1,
		"statusId": 1
	}
}
```

```json
409 CONFLIC

{
	"path": "/reservations",
	"statusCode": 409,
	"rawStatusCode": 409,
	"message": "La reserva ya se encuentra registrada para el cliente",
	"errors": "La reserva ya se encuentra registrada para el cliente",
	"extra": {
		"code": "RESERVATION_ALREADY_EXISTS",
		"customer": {
			"id": 1,
			"active": 1,
			"description": "Nico Molina",
			"email": "comodinx1@hotmail.com",
			"phone": "+5491134375451"
		},
		"reservation": {
			"id": 3,
			"customerId": 1,
			"statusId": 1
		}
	}
}
```

```json
412 PRECONDITION FAILED

{
  "path": "/reservations",
  "statusCode": 412,
  "rawStatusCode": 412,
  "message": "El número de invitados supera el máximo permitido (2).",
  "errors": "El número de invitados supera el máximo permitido (2).",
  "extra": {
    "code": "INVALID_NUM_GUESTS",
    "tableId": 1,
    "restaurantId": 1,
    "capacity": 2,
    "numGuests": 3
  }
}
```
