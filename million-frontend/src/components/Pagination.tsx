"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ total, page, pageSize }: { total: number; page: number; pageSize: number }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  if (pages <= 1) return null;

  const go = (p: number) => {
    const params = new URLSearchParams(search);
    params.set("page", String(Math.min(Math.max(1, p), pages)));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const range = getRange(page, pages, 5);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="text-sm text-zinc-600 ml-results-count">{total.toLocaleString()} resultados</div>
      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => go(page - 1)} disabled={page <= 1} className={btnCls}>
          ←
        </button>
        {range.map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={p === page ? btnActiveCls : btnCls}
          >
            {p}
          </button>
        ))}
        <button onClick={() => go(page + 1)} disabled={page >= pages} className={btnCls}>
          →
        </button>
      </div>
    </div>
  );
}

const btnCls =
  "h-9 px-3 rounded-md border border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-zinc-50 text-black cursor-pointer";

const btnActiveCls =
  "h-9 px-3 rounded-md border border-zinc-900 bg-zinc-900 text-white cursor-pointer ml-pagination-active";

function getRange(page: number, pages: number, max = 5) {
  const half = Math.floor(max / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(pages, start + max - 1);
  start = Math.max(1, end - max + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
