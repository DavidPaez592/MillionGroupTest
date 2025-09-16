// Añade campos adicionales a las propiedades para enriquecer las cards
// Ejecuta: docker exec million-mongo mongosh -u root -p example /docker-entrypoint-initdb.d/add_details.js

const dbm = db.getSiblingDB('million');
const props = dbm.properties.find({}).toArray();

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

props.forEach((p, i) => {
  const beds = rand(2, 8);
  const fullBaths = rand(2, 6);
  const halfBaths = rand(0, 2);
  const area = rand(1200, 10000);
  const daysAgo = rand(1, 365);
  const dateListed = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  const status = 'For Sale';

  dbm.properties.updateOne({ _id: p._id }, {
    $set: { beds: beds, fullBaths: fullBaths, halfBaths: halfBaths, areaSqFt: area, dateListed: dateListed, status: status }
  });
});

print(`Updated ${props.length} properties with details.`);

