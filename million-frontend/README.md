# Million — Frontend (Next.js 15)

## Resumen

- **Framework**: Next.js 15 (App Router, TypeScript, TailwindCSS).
- **API**: Consume la API dockerizada en `http://localhost:5084`.
- **Filtros**: `name`, `address`, `minPrice`, `maxPrice` vía querystring; la URL se sincroniza con los inputs.
- **Páginas**:
  - Listado: `/`
  - Detalle: `/property/[id]`.

## Variables de entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5084
```

## Comandos disponibles

### Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Build

Genera una versión optimizada para producción:

```bash
npm run build
```

### Lint

Ejecuta el linter para verificar errores de estilo y código:

```bash
npm run lint
```

### Formateo

Formatea el código con Prettier:

```bash
npm run format
```

### Pruebas

#### Unit Tests

Ejecuta las pruebas unitarias con Jest:

```bash
npm run test
```

## Notas de imágenes

- Configurado `next.config.ts` para permitir imágenes desde `picsum.photos`.

## Aprende más

Para más información sobre Next.js, consulta:

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial interactivo de Next.js](https://nextjs.org/learn)

## Despliegue

La forma más sencilla de desplegar esta aplicación es usando [Vercel](https://vercel.com). Consulta la [documentación de despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
```
