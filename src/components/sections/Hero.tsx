"use client"; 
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  /**
   * handleScroll
   *
   * Smooth-scroll helper that intercepts anchor click events and scrolls
   * to the element identified by `id`.
   *
   * Parameters:
   *  - e: React.MouseEvent<HTMLAnchorElement> — click event to intercept
   *  - id: string — id of the target element to scroll into view
   *
   * Behavior:
   *  - Prevents default anchor behavior to avoid adding a hash to the URL.
   *  - Uses `element.scrollIntoView({ behavior: 'smooth' })` for smooth navigation.
   *
   * Notes:
   *  - This function is intended to be reused by other UI pieces (e.g., CommandBar)
   *    to provide consistent scrolling UX across the site.
   */
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      // Mobile: anchor content to the top to avoid large whitespace
      // Desktop: keep centered for balanced layout
      className="relative flex flex-col justify-start md:justify-center min-h-screen w-full max-w-5xl mx-auto px-6 pt-2 pb-12 md:py-12 lg:px-0"
    >

      {/*
        Badge: Disponibilidad
        - Muestra un indicador visual (ping + dot) y el texto localizado `t.hero.badge`.
        - Uso: informar disponibilidad o estado breve en la cabecera.
      */}
      <div className="mb-6 flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
        </span>
        <span className="font-mono text-xs text-neon-green tracking-wider uppercase">
          {t.hero.badge}
        </span>
      </div>

      {/*
        Headline
        - Título principal compuesto por tres partes localizables:
          `t.hero.h1_start`, `t.hero.h1_func`, `t.hero.h1_conv`.
        - Estilizado responsive mediante clases utilitarias.
      */}
      <div className="space-y-2 mb-6">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
          {t.hero.h1_start}{" "}
          <span className="text-glitch text-white">{t.hero.h1_func}</span> y{" "}
          <span className="text-glitch text-white">{t.hero.h1_conv}</span>.
        </h1>
      </div>

      {/*
        Subheadline
        - Texto descriptivo secundario localizado en `t.hero.sub`.
        - Máximo ancho para mejorar legibilidad en pantallas grandes.
      */}
      <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
        {t.hero.sub}
      </p>

      {/*
        CTA Area
        - Contiene dos botones principales:
          1) CTA primario: desplaza suavemente a `#contact` usando `handleScroll`.
          2) CTA secundario: desplaza a `#projects` usando `handleScroll`.
        - Motivo: interceptar el comportamiento por defecto evita añadir hashes
          a la URL mientras se mantiene navegación fluida.
      */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Botón principal — Contacto (usa `handleScroll`) */}
        <Link
          href="#contact"
          onClick={(e) => handleScroll(e, "contact")} 
          className="group relative px-6 py-3 bg-white text-black font-mono font-bold text-sm tracking-wide overflow-hidden hover:bg-neon-cyan transition-colors duration-300 flex items-center justify-center focus:ring-2 focus:ring-neon-cyan focus:outline-none"
        >
          <span className="absolute top-0 left-0 w-full h-0.5 bg-black/10 group-hover:animate-pulse"></span>
          <span aria-hidden="true" className="mr-2 text-lg">›_</span> {t.hero.cta_primary}
        </Link>

        {/* Botón secundario — Proyectos (usa `handleScroll`) */}
        <Link
          href="#projects"
          onClick={(e) => handleScroll(e, "projects")} 
          className="px-6 py-3 border border-white/10 text-secondary font-mono text-sm hover:text-white hover:border-white/30 transition-all flex items-center justify-center focus:ring-2 focus:ring-white/50 focus:outline-none"
        >
          {t.hero.cta_secondary}
        </Link>
      </div>

      {/*
        Background Glow
        - Elemento puramente decorativo que añade un resplandor difuso.
        - `pointer-events-none` para que no interfiera con interacción del usuario.
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-neon-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </section>
  );
}