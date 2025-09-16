import { FaSwimmingPool, FaShieldAlt, FaEye, FaCar, FaCouch } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";
import PropertyCarousel from "@/components/PropertyCarousel";
import clsx from "clsx";
import Link from "next/link";

interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  images?: string[];
  amenities?: string[];
}

export default function FeaturedProperty({ property }: { property: Property }) {
  if (!property) return null;
  // Diccionario de iconos y etiquetas para amenities
  const amenityIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    pool: { icon: <FaSwimmingPool />, label: "Piscina" },
    security: { icon: <FaShieldAlt />, label: "Seguridad" },
    view: { icon: <FaEye />, label: "Vista panorámica" },
    beds: { icon: <MdOutlineKingBed />, label: "Habitaciones" },
    parking: { icon: <FaCar />, label: "Parqueaderos" },
    garage: { icon: <GiHomeGarage />, label: "Garaje privado" },
    furnished: { icon: <FaCouch />, label: "Amoblado" },
  };
  // Usar amenities del backend si existen, si no usar los simulados
  const amenities = property.amenities && property.amenities.length > 0
    ? property.amenities.map((a) => amenityIcons[a] ? { ...amenityIcons[a] } : { icon: null, label: a })
    : [
        { icon: <FaSwimmingPool />, label: "Piscina" },
        { icon: <FaShieldAlt />, label: "Seguridad" },
        { icon: <FaEye />, label: "Vista panorámica" },
        { icon: <MdOutlineKingBed />, label: "5 Habitaciones" },
        { icon: <FaCar />, label: "3 Parqueaderos" },
        { icon: <GiHomeGarage />, label: "Garaje privado" },
        { icon: <FaCouch />, label: "Amoblado" },
      ];
  return (
    <Link
      href={`/property/${property.id}`}
      className="block w-full mb-8 rounded-lg overflow-hidden relative bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      tabIndex={0}
      aria-label={`Ver detalles de ${property.name}`}
    >
      <div
        className="relative w-full group cursor-pointer"
        style={{ height: 'calc(var(--spacing) * 121)' }}
      >
        {/* Badge animado */}
        {/* Luxury badge in the absolute top-left corner, gold gradient, rectangular, luxury style */}
        {/* Minimalist gold badge with sheen effect */}
        <span
          className={clsx(
            "absolute z-30 left-0 top-0 px-4 py-1.5 rounded-br-xl rounded-tl-md text-xs md:text-sm font-bold uppercase overflow-hidden",
            "shadow-md flex items-center justify-center"
          )}
          style={{
            background: '#FFD700', // solid gold
            color: '#111', // black text
            letterSpacing: '0.04em',
            borderTopLeftRadius: '0.3rem',
            borderBottomRightRadius: '0.8rem',
            minWidth: '120px',
            maxWidth: '60vw',
          }}
        >
          <span style={{ color: '#B6862C', marginRight: 4 }}>▮</span>
          <span style={{ color: '#111', fontWeight: 700 }}>Propiedad más lujosa</span>
          {/* Sheen effect */}
          <span
            style={{
              position: 'absolute',
              left: '-60%',
              top: 0,
              width: '60%',
              height: '100%',
              background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 100%)',
              transform: 'skewX(-20deg)',
              animation: 'sheen 2.5s infinite',
              pointerEvents: 'none',
            }}
          />
          <style>{`
            @keyframes sheen {
              0% { left: -60%; }
              60% { left: 120%; }
              100% { left: 120%; }
            }
          `}</style>
        </span>
    {/* Carrusel de imágenes */}
    <PropertyCarousel images={property.images || ["/no-image.jpg"]} alt={property.name} autoplay fullHeight />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="left-0 bottom-0 p-8 text-white max-w-2xl absolute" style={{ width: '100%' }}>
          {/* Frase de exclusividad */}
          <div className="mb-2 text-lg md:text-xl font-semibold italic text-yellow-200 drop-shadow">Vive el lujo absoluto</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{property.name}</h2>
          <div className="text-xl md:text-2xl font-semibold mb-1 drop-shadow">{property.address}</div>
          <div className="text-lg md:text-xl font-bold drop-shadow">
            {property.price?.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            <span className="ml-1 text-base align-middle text-zinc-200 font-normal">USD</span>
          </div>
          {/* Amenities: scroll horizontal en móvil, wrap en desktop */}
          <div
            className="flex gap-4 mt-4 overflow-x-auto flex-nowrap sm:flex-wrap sm:overflow-x-visible w-full scrollbar-hide z-10"
            style={{ WebkitOverflowScrolling: 'touch', position: 'relative' }}
            tabIndex={0}
          >
            {amenities.map((a, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                style={{ minWidth: 'max-content' }}
              >
                {a.icon} {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
