# Million — Backend: MongoDB + API

## Tabla de Contenidos
- [Million — Backend: MongoDB + API](#million--backend-mongodb--api)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Comandos rápidos](#comandos-rápidos)
  - [Credenciales MongoDB](#credenciales-mongodb)
  - [Estructura de datos](#estructura-de-datos)
  - [API (.NET 9)](#api-net-9)
    - [Endpoints disponibles:](#endpoints-disponibles)
  - [Pruebas](#pruebas)
    - [Tipos de Pruebas:](#tipos-de-pruebas)
    - [Cómo Ejecutar las Pruebas:](#cómo-ejecutar-las-pruebas)
  - [Estructura del proyecto](#estructura-del-proyecto)

---

## Comandos rápidos

- Arrancar toda la pila (Mongo + API): `docker compose up -d`
- Verificar total de propiedades: 
  ```bash
  docker exec -it million-mongo mongosh -u root -p example --eval "db.getSiblingDB('million').properties.countDocuments()"
  ```
- Ver ejemplos:
  ```bash
  docker exec -it million-mongo mongosh -u root -p example --eval "db.getSiblingDB('million').properties.find({}, {name:1,address:1,price:1,_id:0}).limit(5).toArray()"
  ```

---

## Credenciales MongoDB

- **Admin/root:** usuario `root` / contraseña `example`
- **App DB:** usuario `million` / contraseña `millionpw` en base `million`

---

## Estructura de datos

- **Colección `owners`:**
  ```json
  { "_id": "string", "name": "string", "address": "string", "photo": "string", "birthday": "date" }
  ```
- **Colección `properties`:**
  ```json
  { "_id": "string", "name": "string", "address": "string", "price": "number", "codeInternal": "string", "year": "number", "idOwner": "string", "images": [{ "url": "string", "enabled": "boolean" }] }
  ```

---

## API (.NET 9)

- **Ejecutar con Docker:** se publica en `http://localhost:5084` (ver Swagger).
- **Ejecutar localmente (opcional):**
  ```bash
  cd src/Million.Api && dotnet run
  ```
- **Swagger:** `http://localhost:5084/swagger`

### Endpoints disponibles:
- `GET /api/properties?name=&address=&minPrice=&maxPrice=&page=1&pageSize=12`
- `GET /api/properties/{id}`

---

## Pruebas

El proyecto incluye un conjunto completo de pruebas unitarias para garantizar la calidad del código. Estas pruebas están ubicadas en el directorio `tests/Million.Tests`.

### Tipos de Pruebas:
1. **Pruebas de Servicios:**
   - Validan la lógica de los servicios, como `PropertyService`.
   - Cubren casos básicos, límites, excepciones y datos inconsistentes.

2. **Pruebas de Concurrencia:**
   - Verifican que los servicios manejen múltiples solicitudes simultáneas.

3. **Pruebas de Seguridad:**
   - Simulan intentos de inyección SQL y otros escenarios maliciosos.

4. **Pruebas de Rendimiento:**
   - Evalúan el comportamiento del servicio con grandes volúmenes de datos.

### Cómo Ejecutar las Pruebas:
1. Asegúrate de estar en el directorio raíz del proyecto:
   ```bash
   cd million-backend
   ```

2. Ejecuta todas las pruebas:
   ```bash
   dotnet test
   ```

3. Verifica los resultados en la consola. Un ejemplo de salida exitosa:
   ```
   Test summary: total: 27, failed: 0, succeeded: 27, skipped: 0, duration: 0.4s
   ```

---

## Estructura del proyecto

```
million-backend/
├── src/
│   ├── Million.Application/       # Lógica de aplicación y servicios
│   ├── Million.Domain/            # Entidades y lógica de dominio
│   └── Million.Infrastructure/    # Implementaciones de infraestructura
├── tests/
│   └── Million.Tests/             # Pruebas unitarias
└── README.md                      # Documentación del proyecto
```

---
