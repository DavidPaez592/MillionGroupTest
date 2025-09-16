// Reemplaza las imágenes de todas las propiedades con imágenes de casas (Unsplash)
// Ejecuta: docker exec million-mongo mongosh -u root -p example /docker-entrypoint-initdb.d/replace_images_unsplash.js

const dbm = db.getSiblingDB('million');

const pool = [
  'photo-1505693416388-ac5ce068fe85',
  'photo-1501183638710-841dd1904471',
  'photo-1494526585095-c41746248156',
  'photo-1493809842364-78817add7ffb',
  'photo-1505691723518-36a5ac3b2d94',
  'photo-1505691938895-1758d7feb511',
  'photo-1505409859467-3a796fd5798e',
  'photo-1502673530728-f79b4cab31b1',
  'photo-1504628295340-1e1a4c61d610',
  'photo-1536376072261-38c75010e6c9',
  'photo-1504624339456-9e171f0a5f53',
  'photo-1522708323590-d24dbb6b0267',
  'photo-1600585154526-990dced4db0d',
  'photo-1560448075-bb4b2a52942c',
  'photo-1519710164239-da123dc03ef4',
  'photo-1501183638710-841dd1904471'
];

function u(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
}

const props = dbm.properties.find({}).toArray();
props.forEach((p, idx) => {
  const imgs = Array.from({ length: 8 }).map((_, i) => ({ url: u(pool[(idx * 8 + i) % pool.length]), enabled: true }));
  dbm.properties.updateOne({ _id: p._id }, { $set: { images: imgs } });
});

print(`Replaced images with Unsplash set for ${props.length} properties.`);

