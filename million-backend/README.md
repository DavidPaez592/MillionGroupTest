Million — Backend: MongoDB + API

Comandos rápidos

- Arrancar toda la pila (Mongo + API): `docker compose up -d`
- Verificar total de propiedades: `docker exec -it million-mongo mongosh -u root -p example --eval "db.getSiblingDB('million').properties.countDocuments()"`
- Ver ejemplos: `docker exec -it million-mongo mongosh -u root -p example --eval "db.getSiblingDB('million').properties.find({}, {name:1,address:1,price:1,_id:0}).limit(5).toArray()"`

Credenciales MongoDB

- Admin/root: usuario `root` / contraseña `example`
- App DB: usuario `million` / contraseña `millionpw` en base `million`

Estructura de datos

- Colección `owners`: `{ _id, name, address, photo, birthday }`
- Colección `properties`: `{ _id, name, address, price, codeInternal, year, idOwner, images:[{ url, enabled }] }`

Índices creados

- Texto: `name`, `address`
- Campo: `price`, `idOwner`

API (.NET 9)

- Ejecutar con Docker: se publica en `http://localhost:5084` (ver Swagger)
- Ejecutar local (opcional): `cd src/Million.Api && dotnet run`
- Swagger: `http://localhost:5084/swagger`

Endpoints

- `GET /api/properties?name=&address=&minPrice=&maxPrice=&page=1&pageSize=12`
- `GET /api/properties/{id}`

Notas

- Actualmente solo MongoDB está en Docker. La API corre con `dotnet run`.
- Más adelante se puede dockerizar la API y agregarla al `docker-compose`.

Calidad y estilo

- .NET 9 (estable) y arquitectura por capas: Domain, Application, Infrastructure, Api.
- Configuración con `IOptions<MongoSettings>`; JSON camelCase.
- `.editorconfig` incluido; para formatear: `dotnet format` en la carpeta `million-backend`.

Pruebas

- Ejecutar pruebas: `dotnet test` en la carpeta `million-backend`.
Cómo correr

Iniciar todo: cd million-backend && docker compose up -d
Swagger: http://localhost:5084/swagger
Health: curl http://localhost:5084/health
Listado: curl "http://localhost:5084/api/properties?pageSize=5"
Detalle: curl "http://localhost:5084/api/properties/{id}"
Pruebas (opcionales, fuera de Docker): cd million-backend && dotnet test

Estructura creada

Solución .NET 9 con capas: Domain, Application, Infrastructure, Api, Tests.
Filtros: name, address, minPrice, maxPrice; paginación y total.
DTO listado: id, idOwner, name, address, price, imageUrl.