"use client";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RandomDateLabel() {
  const [label] = useState(() => {
    const start = new Date("2025-08-01").getTime();
    const end = new Date("2025-09-15").getTime();
    const d = new Date(start + Math.random() * (end - start));
    const now = new Date("2025-09-15");
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} días ago`;
  });
  return <span>{label}</span>;
}
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/lib/api";

type Property = {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  images?: string[];
  description?: string;
  beds?: number;
  fullBaths?: number;
  halfBaths?: number;
  parking?: number;
  areaSqFt?: number;
  amenities?: string[];
  wifi?: boolean;
};

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [mainIdx, setMainIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [success, setSuccess] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!id) return;
    fetchProperty(String(id)).then(setProperty).catch(console.error);
  }, [id]);

  const images = useMemo(() => {
    const arr = (property?.images?.filter(Boolean) as string[] | undefined) ?? [];
    return arr.length ? Array.from(new Set(arr)) : ["/no-image.jpg"];
  }, [property?.images]);

  // Cuando mainIdx cambia, dispara el fade
  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 350);
    return () => clearTimeout(timeout);
  }, [mainIdx]);

  if (!property) return <div className="p-8 text-center text-zinc-400">Cargando...</div>;

  // Miniaturas: siempre las 4 siguientes a la principal original (no se reordenan al navegar)
  const thumbs: (string | null)[] = [];
  for (let i = 0; i < 4; i++) thumbs[i] = images[i + 1] ?? null;

  // ScheduleVisit component
  function ScheduleVisit() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState("");
    const hours = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!selectedDate || !selectedHour) {
        setSuccess(false);
        alert("Por favor selecciona un día y una hora");
        return;
      }
      setSuccess(true);
    }

    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block mb-2 font-medium text-zinc-700">Selecciona un día</label>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
              maxDate={new Date("2025-09-30")}
              slotProps={{ textField: { fullWidth: true, size: "small", variant: "outlined" } }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <label className="block mb-2 font-medium text-zinc-700">Selecciona una hora</label>
          <div className="flex gap-2 flex-wrap">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setSelectedHour(h)}
                className={[
                  "px-4 py-2 rounded-lg border font-medium transition-colors",
                  selectedHour === h
                    ? "bg-black text-white border-black"
                    : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900",
                ].join(" ")}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow hover:bg-zinc-900 transition"
        >
          Agendar visita
        </button>
        <Dialog
          open={success}
          onClose={() => setSuccess(false)}
          PaperProps={{
            sx: { borderRadius: 3, p: 2, bgcolor: "white", minWidth: 320, textAlign: "center" },
          }}
        >
          <DialogTitle
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, p: 2 }}
          >
            <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 48, mb: 1 }} />
            <span className="text-xl font-bold text-zinc-900">¡Visita agendada!</span>
          </DialogTitle>
          <DialogContent sx={{ color: "#334155", fontSize: 16, pb: 1 }}>
            Tu visita fue agendada con éxito.
            <br />
            Te esperamos en la fecha y hora seleccionadas.
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              onClick={() => setSuccess(false)}
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                borderRadius: 2,
                px: 4,
                "&:hover": { bgcolor: "#222" },
              }}
              autoFocus
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 440;

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      {/* Botón volver minimalista */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-black hover:bg-zinc-900 hover:text-white transition font-medium shadow-sm mb-2 cursor-pointer"
        aria-label="Volver"
        type="button"
      >
        <ArrowBackIcon fontSize="small" />
        Volver
      </button>

      {/* Principal + laterales */}
      <div className="grid gap-6 lg:grid-cols-[2.2fr_0.8fr] items-stretch md:h-[60vh] max-h-[680px]">
        <div className="relative w-full h-full min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-zinc-100 shadow-sm">
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={mainIdx}
                className="absolute inset-0"
                initial={{ opacity: 0.0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.0, x: -40 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={images[mainIdx]}
                  alt={property.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
            {/* Flechas navegación */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white border-2 border-transparent hover:border-blue-500 shadow-lg rounded-full p-2 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={() => setMainIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  aria-label="Imagen anterior"
                  tabIndex={0}
                >
                  <FaChevronLeft size={24} color="#334155" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white border-2 border-transparent hover:border-blue-500 shadow-lg rounded-full p-2 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={() => setMainIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  aria-label="Imagen siguiente"
                  tabIndex={0}
                >
                  <FaChevronRight size={24} color="#334155" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 4 miniaturas en tira vertical */}
        <div className="self-stretch max-[440px]:hidden">
          <div className="grid grid-rows-4 gap-5 h-full">
            {thumbs.map((img, i) => {
              const active = img && images[mainIdx] === img;
              return (
                <button
                  key={i}
                  disabled={!img}
                  onClick={() => {
                    if (!img) return;
                    setMainIdx(i + 1);
                  }}
                  className={[
                    "relative h-full rounded-2xl overflow-hidden bg-zinc-100 shadow-sm border transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800/50",
                    active ? "border-zinc-900" : "border-transparent",
                    !img && "cursor-default opacity-60",
                  ].join(" ")}
                  aria-label={img ? `Ver imagen ${i + 2}` : "Sin imagen"}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={`${property.name} miniatura ${i + 2}`}
                      fill
                      sizes="(max-width:1024px) 100vw, 20vw"
                      className="object-cover hover:opacity-90"
                      loading="lazy"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-zinc-300 text-3xl">
                      —
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detalles lujosos tipo Airbnb */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1 text-sm text-zinc-700">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />
          <span>A la venta</span>
          <span className="mx-2 text-zinc-300">|</span>
          <RandomDateLabel />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{property.name}</h1>
        <p className="text-zinc-600">{property.address}</p>
        <p className="mt-3 text-2xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(property.price)}
          <span className="ml-1 text-base align-middle text-zinc-500 font-normal">USD</span>
        </p>

        {/* Descripción lujosa */}
        {property.description &&
          (isMobile ? (
            <div>
              <p
                ref={descRef}
                className={[
                  "mt-4 text-lg text-zinc-700 leading-relaxed italic transition-all",
                  showFullDesc ? "line-clamp-none" : "line-clamp-5",
                ].join(" ")}
                style={{ WebkitLineClamp: showFullDesc ? undefined : 5 }}
              >
                {property.description}
              </p>
              {!showFullDesc && (
                <button
                  className="mt-2 text-blue-600 font-medium text-sm underline"
                  onClick={() => setShowFullDesc(true)}
                >
                  Ver más...
                </button>
              )}
            </div>
          ) : (
            <p className="mt-4 text-lg text-zinc-700 leading-relaxed italic">
              {property.description}
            </p>
          ))}
        {/* Línea divisoria visual */}
        <div className="w-full h-px bg-zinc-200 my-6" />
        {/* Características técnicas */}
        <div className="flex flex-wrap gap-6 text-zinc-700 text-base items-center mt-2">
          {property.beds !== undefined && (
            <span className="flex items-center gap-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="10" width="20" height="8" rx="2" fill="#64748b" />
                <rect x="4" y="6" width="6" height="6" rx="2" fill="#cbd5e1" />
                <rect x="14" y="6" width="6" height="6" rx="2" fill="#cbd5e1" />
              </svg>{" "}
              {property.beds} habitaciones
            </span>
          )}
          {property.fullBaths !== undefined && (
            <span className="flex items-center gap-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="10" width="18" height="7" rx="2" fill="#cbd5e1" />
                <rect x="7" y="6" width="10" height="4" rx="2" fill="#64748b" />
              </svg>{" "}
              {property.fullBaths} baños
            </span>
          )}
          {property.halfBaths !== undefined && property.halfBaths > 0 && (
            <span className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <rect x="3" y="9" width="14" height="5" rx="2" fill="#cbd5e1" />
                <rect x="7" y="5" width="6" height="3" rx="1.5" fill="#64748b" />
              </svg>{" "}
              {property.halfBaths} medio baño
            </span>
          )}
          {property.parking !== undefined && (
            <span className="flex items-center gap-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="12" width="20" height="6" rx="2" fill="#cbd5e1" />
                <rect x="6" y="8" width="12" height="6" rx="2" fill="#64748b" />
              </svg>{" "}
              {property.parking} estacionamientos
            </span>
          )}
          {property.areaSqFt !== undefined && (
            <span className="flex items-center gap-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="3" fill="#cbd5e1" />
                <rect x="8" y="8" width="8" height="8" rx="2" fill="#64748b" />
              </svg>{" "}
              {property.areaSqFt} ft²
            </span>
          )}
          {property.wifi && (
            <span className="flex items-center gap-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="18" r="2" fill="#64748b" />
                <path
                  d="M4 12c2.667-2 8-2 12 0"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 8c4-3 16-3 20 0"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>{" "}
              Wifi
            </span>
          )}
        </div>
        {/* <div className="text-xs text-zinc-400 mt-6">Owner ID: {property.idOwner}</div> */}
      </section>

      {/* Schedule Visit Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Agendar Visita</h2>
        <ScheduleVisit />
      </section>
    </main>
  );
}
