"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

const KEY = "ml-theme"; // 'light' | 'black'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "black">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as "light" | "black" | null) ?? "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === "black" ? "light" : "black";
    setTheme(next);
    localStorage.setItem(KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "black"}
      aria-label={theme === "black" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className={`ml-theme-toggle relative w-14 h-8 rounded-full flex items-center border transition-colors duration-300 shadow-md cursor-pointer
        ${theme === "black" ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
      style={{ boxShadow: theme === "black" ? "0 2px 8px #0006" : "0 2px 8px #0001" }}
      title={theme === "black" ? "Tema oscuro" : "Tema claro"}
    >
      {/* Track */}
      <span className="absolute inset-0 rounded-full transition-colors duration-300" />
      {/* Thumb */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-lg transition-all duration-300
          ${theme === "black" ? "translate-x-6 bg-white text-yellow-500" : "translate-x-0 bg-zinc-900 text-yellow-300"}`}
        style={{ boxShadow: "0 1px 4px #0003" }}
      >
        {theme === "black" ? <FaSun /> : <FaMoon />}
      </span>
      {/* Icons (for accessibility, hidden visually) */}
      <span className="sr-only">{theme === "black" ? "Tema claro" : "Tema oscuro"}</span>
    </button>
  );
}
