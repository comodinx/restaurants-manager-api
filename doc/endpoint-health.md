<div id="top"></div>

# GET /health

## Introducción

Health check

## Ejemplo

### Request

```jsx
GET /health
```

### Response

```json
200 OK

{
  "alive": true,
  "name": "restaurants-manager-api",
  "version": "1.0.0",
  "environment": "development",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```
