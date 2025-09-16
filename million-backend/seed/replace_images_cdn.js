// Script para reemplazar URLs incorrectas de imágenes en MongoDB por URLs válidas del CDN
// Uso: mongosh <nombre_db> replace_images_cdn.js

const db = db.getSiblingDB('million');

// Lista de URLs válidas del CDN (ajusta la cantidad según tus propiedades)
const CDN_IMAGES = [
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_1.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_2.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_3.jpg",
  // ...agrega más URLs válidas aquí...
];

const properties = db.properties.find().toArray();

properties.forEach((prop, idx) => {
  // Asigna 4 imágenes distintas del CDN a cada propiedad (ajusta según tu necesidad)
  const images = [];
  for (let i = 0; i < 4; i++) {
    const url = CDN_IMAGES[(idx * 4 + i) % CDN_IMAGES.length];
    images.push({ Url: url, Enabled: true });
  }
  db.properties.updateOne(
    { _id: prop._id },
    { $set: { images } }
  );
});

print('Imágenes actualizadas con URLs válidas del CDN.');
