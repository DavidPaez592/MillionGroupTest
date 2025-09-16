// Script para corregir imágenes en MongoDB: renombra 'url' a 'Url' y asegura 'Enabled: true'
// Uso: mongosh million fix_images_case.js

const db = db.getSiblingDB('million');

const props = db.properties.find({}).toArray();
props.forEach((p) => {
  if (!Array.isArray(p.images)) return;
  const fixed = p.images.map(img => {
    // Si ya está bien, no cambia
    if (img.Url && img.Enabled !== undefined) return img;
    // Si tiene 'url' minúscula, la renombra
    if (img.url) return { Url: img.url, Enabled: true };
    // Si es string, lo convierte
    if (typeof img === 'string') return { Url: img, Enabled: true };
    return img;
  });
  db.properties.updateOne({ _id: p._id }, { $set: { images: fixed } });
});

print('Imágenes corregidas: todas tienen Url y Enabled: true');
