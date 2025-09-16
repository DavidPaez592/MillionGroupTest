import type { NextConfig } from "next";

// NUEVO: Configura los orígenes desde donde <Image /> puede cargar/optimizar imágenes.
// Duplica una entrada en remotePatterns para permitir un nuevo dominio.
// Reinicia el servidor después de cambiar esta lista.

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    // Permitir imágenes desde el CDN y dominio(s) de terceros
    // NUEVO: Tips
    // - Usa protocol: "https" en producción.
    // - Para pruebas locales, puedes usar protocol: "http" con "localhost" u otro host.
    // - Si una imagen no se muestra, verifica que su dominio esté listado aquí.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.millionluxury.com",
      },
      {
        protocol: "https",
        hostname: "maustorageprod.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "azfd-prod.millionluxury.com",
      },
      // NUEVO: Ejemplos (descomenta y edita según necesites)
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
      // {
      //   protocol: "http", // solo para entornos de prueba/local
      //   hostname: "localhost",
      // },
    ],
  },
};

export default nextConfig;
