"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const sp = useSearchParams();

  const [name, setName] = useState(sp.get("name") ?? "");
  const [address, setAddress] = useState(sp.get("address") ?? "");
  const [minPrice, setMinPrice] = useState(sp.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(sp.get("maxPrice") ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(sp.get("name") ?? "");
    setAddress(sp.get("address") ?? "");
    setMinPrice(sp.get("minPrice") ?? "");
    setMaxPrice(sp.get("maxPrice") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp?.toString()]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !address.trim() && !minPrice.trim() && !maxPrice.trim()) {
      setError("Por favor complete los campos requeridos");
      return;
    }
    setError("");
    const q = new URLSearchParams();
    if (name.trim()) q.set("name", name.trim());
    if (address.trim()) q.set("address", address.trim());
    if (minPrice.trim()) q.set("minPrice", minPrice.trim());
    if (maxPrice.trim()) q.set("maxPrice", maxPrice.trim());
    router.push(`/?${q.toString()}`);
    setTimeout(() => {
      const firstCard = document.querySelector('[data-property-card="true"]');
      if (firstCard) {
        (firstCard as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
        (firstCard as HTMLElement).focus({ preventScroll: true });
      }
    }, 1000);
  };

  const onClear = () => {
    setName("");
    setAddress("");
    setMinPrice("");
    setMaxPrice("");
    router.push(`/`);
  };

  const inputCls =
    "ml-input h-10 rounded-md border border-zinc-300 px-3 text-sm shadow-sm bg-white text-black placeholder:text-zinc-500 w-full max-w-md";

  return (
    <form
      onSubmit={onSubmit}
      className="filters-form flex flex-wrap gap-3 items-center md:justify-start justify-center md:flex-row flex-col md:items-center w-full"
      aria-label="Filtros"
    >
      {error && (
        <p className="text-red-500" role="alert" data-testid="error-message">
          {error}
        </p>
      )}
      <input
        aria-label="Nombre"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls + " md:w-48 md:max-w-xs"}
      />
      <input
        aria-label="Dirección"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={inputCls + " md:w-40 md:max-w-xs"}
      />
      <div className="relative w-full max-w-md md:w-40 md:max-w-xs">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          $
        </span>
        <input
          aria-label="Precio mínimo"
          inputMode="numeric"
          placeholder="Mínimo"
          value={minPrice ? Number(minPrice).toLocaleString("en-US") : ""}
          onChange={(e) => setMinPrice(e.target.value.replace(/[^\d]/g, ""))}
          className={inputCls + " pl-6"}
        />
      </div>
      <div className="relative w-full max-w-md md:w-40 md:max-w-xs">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          $
        </span>
        <input
          aria-label="Precio máximo"
          inputMode="numeric"
          placeholder="Máximo"
          value={maxPrice ? Number(maxPrice).toLocaleString("en-US") : ""}
          onChange={(e) => setMaxPrice(e.target.value.replace(/[^\d]/g, ""))}
          className={inputCls + " pl-6"}
        />
      </div>
      <button type="submit" className="ml-btn-primary w-full max-w-md md:w-auto md:max-w-none">
        Buscar
      </button>
      <button
        type="button"
        onClick={onClear}
        className="h-10 rounded-md px-4 text-sm bg-zinc-100 hover:bg-zinc-200 text-black cursor-pointer w-full max-w-md md:w-auto md:max-w-none"
      >
        Limpiar
      </button>
    </form>
  );
}
