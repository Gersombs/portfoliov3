"use client"; // Necesario para acceder al contexto de idioma

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  // Intentamos obtener el idioma. Si falla (porque not-found a veces carga fuera del provider en casos extremos),
  // usamos un fallback seguro.
  let t;
  try {
    const context = useLanguage();
    t = context.t;
  } catch {
    // Fallback manual por si acaso
    t = {
      hero: { cta_primary: "RETURN HOME" }, // Reusamos keys o definimos un texto simple
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      
      {/* 1. Código de Error Gigante */}
      <h1 className="font-heading text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 relative">
        404
        {/* Sombra Glitch Decorativa */}
        <span className="absolute inset-0 text-neon-cyan/20 blur-[2px] translate-x-0.5">404</span>
        <span className="absolute inset-0 text-neon-magenta/20 blur-[2px] -translate-x-0.5">404</span>
      </h1>

      {/* 2. Mensaje de Sistema */}
      <div className="space-y-2 mb-10">
        <p className="font-mono text-neon-red text-sm tracking-widest uppercase animate-pulse">
          [ SYSTEM ERROR: RESOURCE_NOT_FOUND ]
        </p>
        <p className="text-secondary max-w-md mx-auto">
          La ruta que intentas explorar no existe en este servidor o ha sido movida a otro sector.
        </p>
      </div>

      {/* 3. Botón de Regreso */}
      <Link
        href="/home"
        className="group relative px-8 py-4 bg-white text-black font-mono font-bold text-sm tracking-wide overflow-hidden hover:bg-neon-cyan transition-colors duration-300 flex items-center justify-center"
      >
        <span className="absolute top-0 left-0 w-full h-0.5 bg-black/10 group-hover:animate-pulse"></span>
        <span className="mr-2 text-lg">›_</span> {t?.hero?.cta_primary || "VOLVER AL INICIO"}
      </Link>

      {/* Fondo Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-neon-red/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
}