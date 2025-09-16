// Script para agregar 8 imágenes por propiedad si no existen
// Uso: docker exec million-mongo mongosh -u root -p example /docker-entrypoint-initdb.d/add_images.js

const dbm = db.getSiblingDB('million');





// Lista de URLs únicas (agrega aquí todas las que quieras usar, mínimo 60 para 12 propiedades)
const CDN_IMAGES = [
  // ... pega aquí los primeros 60 URLs únicos en el orden que desees ...
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_1.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_2.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_3.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_4.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_5.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_6.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_7.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_8.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_9.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_10.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_11.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_12.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_13.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_14.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_15.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_16.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_17.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_18.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_19.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_20.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_21.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_22.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_23.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_24.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_25.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_26.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_27.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_28.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_29.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_30.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_31.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_32.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_33.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/418904871_34.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_1.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_2.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_3.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_4.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_5.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_6.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_7.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_8.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_9.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_10.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_11.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_12.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_13.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_14.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_15.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_16.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_17.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_18.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_19.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_20.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_21.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/394219647_22.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/404121735_1.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/404121735_2.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/404121735_3.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/404121735_4.jpg",
  "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/404121735_5.jpg"
];



const props = dbm.properties.find({}).toArray();
props.forEach((p, idx) => {
  const start = idx * 5;
  const imgs = CDN_IMAGES.slice(start, start + 5).map(url => ({ url, enabled: true }));
  dbm.properties.updateOne({ _id: p._id }, { $set: { images: imgs } });
});

print(`Updated ${props.length} properties with images.`);

