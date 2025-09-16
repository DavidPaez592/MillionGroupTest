# Million Group Project

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- **Docker**: Tener Docker Desktop instalado y abierto para manejar los contenedores de la base de datos y otros servicios.

---

## Levantar el Proyecto con Docker

El proyecto está completamente dockerizado. Puedes levantar todos los servicios (frontend, backend y base de datos) con un solo comando, siempre y cuando estes en la ruta correcta donde se ubiquen million-backedn y frontend , donde este el docker-compose y corregir las variables de entorno, se dejo un archivo .env.example. :

```bash
docker-compose up -d
```

Esto iniciará los contenedores necesarios y el proyecto estará disponible en:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5084](http://localhost:5084)

Si encuentras problemas, revisa los logs:
```bash
docker-compose logs
```

---

## Pasos Manuales (en caso de fallos)

### 1. Levantar los Servicios con Docker

El proyecto utiliza Docker para manejar la base de datos MongoDB y el backend. Sigue estos pasos:

1. Asegúrate de estar en la raíz del proyecto:
   ```bash
   cd /Users/Desktop/Million Group
   ```

2. Levanta los servicios definidos en el archivo `docker-compose.yml`:
   ```bash
   docker-compose up -d
   ```

   Esto iniciará los contenedores necesarios, incluyendo MongoDB y el backend.

3. Verifica que los contenedores estén corriendo:
   ```bash
   docker ps
   ```

4. Revisa los logs del backend si encuentras problemas:
   ```bash
   docker-compose logs api
   ```

5. **IMPORTANTE**: En caso de no poder levantar el backend con Docker, sigue estos pasos manualmente:
   ```bash
   cd million-backend/src/Million.Api
   dotnet run
   ```

   Esto iniciará el backend en `http://localhost:5084`.

---

### 2. Iniciar el Frontend

El frontend está desarrollado con Next.js. Sigue estos pasos para iniciarlo:

1. Navega a la carpeta del frontend:
   ```bash
   cd million-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

   El frontend estará disponible en `http://localhost:3000`.

---

## Cómo Ejecutar las Pruebas

### Backend

1. Asegúrate de estar en el directorio raíz del backend:
   ```bash
   cd million-backend
   ```

2. Ejecuta todas las pruebas:
   ```bash
   dotnet test
   ```

3. Verifica los resultados en la consola. Ejemplo de salida exitosa:
   ```
   Test summary: total: 27, failed: 0, succeeded: 27, skipped: 0, duration: 0.4s
   ```

### Frontend

1. Asegúrate de estar en el directorio raíz del frontend:
   ```bash
   cd million-frontend
   ```

2. Ejecuta todas las pruebas unitarias con Jest:
   ```bash
   npx jest
   ```

3. Verifica los resultados en la consola. Ejemplo de salida exitosa:
   ```
   Test Suites: 6 passed, 6 total
   Tests:       14 passed, 14 total
   Snapshots:   0 total
   Time:        0.657 s, estimated 1 s
   Ran all test suites.
   ```

---

## Recomendaciones

- **Docker**: Asegúrate de que Docker esté corriendo antes de intentar levantar los servicios.
- **Variables de Entorno**: Configura las variables necesarias en un archivo `.env` o `.env.local`.
- **Puertos**: Verifica que los puertos `3000` (frontend) y `5084` (backend) estén disponibles.
- **Logs**: Revisa los logs de los servicios si encuentras problemas:
  ```bash
  docker-compose logs
  ```

---

## Futuras Mejoras

- **Dockerizar el Backend**: Crear un contenedor para el backend para que todo el proyecto pueda levantarse con un solo comando.
- **Automatización**: Usar scripts para simplificar el proceso de configuración y despliegue.

---

Si tienes problemas o preguntas, no dudes en consultar la documentación o contactar al equipo de desarrollo.