"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function MainNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="p-4 flex items-center justify-center gap-4 relative">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
            aria-label="Abrir menú"
            type="button"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon style={{ color: "black", fontSize: 28 }} />
          </button>
          <Logo />
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <button
            className="fixed inset-0 bg-black/30 z-[1001] transition-opacity animate-fade-in"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú lateral"
          />

          <aside
            className="fixed top-0 left-0 h-full w-[260px] bg-white shadow-2xl z-[1002] flex flex-col p-6 animate-slide-in"
            style={{ transition: "transform 0.3s cubic-bezier(.4,0,.2,1)" }}
          >
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              aria-label="Cerrar menú"
              onClick={() => setSidebarOpen(false)}
            >
              <CloseIcon style={{ color: "black", fontSize: 24 }} />
            </button>

            <Link
              href="https://www.millionluxury.com/for-sale/5940-bay-rd-unit-.html/our-team.html"
              className="mb-4 text-zinc-900 font-semibold text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nuestro equipo
            </Link>

            {/* Control de tema accesible */}
            <div className="flex items-center justify-between w-full mt-2 mb-1">
              <span className="text-zinc-900 font-medium text-base">Cambiar tema</span>
              <ThemeToggle />
            </div>
          </aside>
        </>
      )}

      {/* Animaciones solo aquí (cliente) */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s;
        }
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
