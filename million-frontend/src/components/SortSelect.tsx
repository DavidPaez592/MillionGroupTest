"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const sort = search.get("sort") ?? "priceDesc";

  const onChange = (value: string) => {
    const params = new URLSearchParams(search);
    if (value) params.set("sort", value);
    else params.delete("sort");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      aria-label="Ordenar"
      defaultValue={sort}
      onChange={(e) => onChange(e.target.value)}
      className="ml-input h-10 rounded-md border border-zinc-300 px-2 text-sm shadow-sm bg-white text-black"
    >
      <option value="priceDesc">Más caro primero</option>
      <option value="priceAsc">Más barato primero</option>
      <option value="latest">Más recientes</option>
    </select>
  );
}
