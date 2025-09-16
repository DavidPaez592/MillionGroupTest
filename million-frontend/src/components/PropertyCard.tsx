import Link from "next/link";
import type { PropertyListItem } from "@/lib/api";
import PropertyCarousel from "@/components/PropertyCarousel";
import Image from "next/image";
import React from "react";

export default function PropertyCard({ p }: { p: PropertyListItem }) {
  // Fecha aleatoria entre 1 de agosto y 15 de septiembre 2025
  function randomDate() {
    const start = new Date("2025-08-01").getTime();
    const end = new Date("2025-09-15").getTime();
    const d = new Date(start + Math.random() * (end - start));
    const now = new Date("2025-09-15");
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} días ago`;
  }
  return (
    <Link
      href={`/property/${p.id}`}
      className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-transform duration-200 transform-gpu hover:-translate-y-1 border border-zinc-200"
    >
      {p.images && p.images.length > 0 ? (
        <PropertyCarousel images={p.images} alt={p.name} />
      ) : (
        <div className="relative h-56 bg-zinc-100">
          <Image src="/no-image.jpg" alt={p.name} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1 text-sm text-zinc-700">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />
          <span>A la venta</span>
          <span className="mx-2 text-zinc-300">|</span>
          <span>{randomDate()}</span>
        </div>
        <h3 className="font-semibold text-zinc-900">{p.name}</h3>
        <p className="text-zinc-500 text-sm">{p.address}</p>
        <p className="mt-2 text-xl font-semibold text-zinc-900">
          {formatPrice(p.price)}
          <span className="ml-1 text-base align-middle text-zinc-500 font-normal">USD</span>
        </p>
      </div>
    </Link>
  );
}

function formatPrice(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}
