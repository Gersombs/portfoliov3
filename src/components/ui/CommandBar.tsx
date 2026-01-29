"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * CommandBar
 * * Behavior:
 * - Desktop: shows inline nav links that scroll to sections.
 * - Mobile: opens an overlay menu; selecting a link closes the menu.
 */
export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const activeSection = useActiveSection();

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  const navLinks = [
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.stack, id: "services" },
    { name: t.nav.contact, id: "contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* CAMBIOS DE TAMAÑO AQUÍ:
         1. bottom-4 (mobile) vs md:bottom-6 (desktop) -> Más pegado abajo en cel.
         2. w-[95%] (mobile) -> Un poco más ancho para evitar saltos de línea raros.
      */}
      <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[92%] max-w-md md:max-w-2xl transition-all duration-300">
        
        {/* CAMBIOS DE PADDING AQUÍ:
           1. px-4 py-2 (mobile) -> Barra más delgada y compacta.
           2. md:px-6 md:py-3 (desktop) -> Tamaño original elegante.
        */}
        <div className="flex items-center justify-between bg-elevated/80 backdrop-blur-md border border-white/10 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl shadow-black/50">
          
          {/* Status / Home Indicator */}
          {/* gap-2 en mobile para ahorrar espacio */}
          <Link href="/" onClick={scrollToTop} className="group flex items-center gap-2 md:gap-3">
             <div className={`h-2 w-2 rounded-full transition-colors duration-500 ${activeSection === 'home' ? 'bg-neon-green animate-pulse' : 'bg-white/20'}`}></div>
             <span className="font-mono text-xs text-muted group-hover:text-white transition-colors tracking-widest">
               SYS.ONLINE
             </span>
          </Link>

          {/* Desktop Navigation (Sin cambios, solo se oculta en mobile) */}
          <nav className="hidden md:flex items-center gap-6 mx-6 border-l border-r border-white/10 px-6">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)} 
                className={`font-mono text-xs transition-colors tracking-wider ${
                  activeSection === link.id 
                    ? "text-neon-cyan drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" 
                    : "text-secondary hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          {/* gap-2 en mobile para ahorrar espacio */}
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={toggleLanguage} className="font-mono text-xs text-secondary hover:text-white transition-colors uppercase w-8 text-center"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'Inglés' : 'Español'}`}
            title="Switch Language"
            >
              [{language.toUpperCase()}]
            </button>
            
            <div className="h-4 w-px bg-white/10 md:hidden"></div>

            {/* Hamburger menu (mobile) */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1 hover:bg-white/5 rounded transition-colors group"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
                aria-expanded={isOpen}>
              <div className="flex flex-col gap-1 items-end">
                <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-5 rotate-45 translate-y-1.5" : "w-5"}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "w-3 group-hover:w-5"}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-5 -rotate-45 -translate-y-1.5" : "w-5"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (Sin cambios) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center animate-in fade-in duration-200">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                aria-current={activeSection === link.id ? "page" : undefined}
                className={`font-heading text-3xl transition-all hover:tracking-widest ${
                   activeSection === link.id ? "text-neon-cyan" : "text-white hover:text-neon-cyan"
                }`}
              >
                {link.name}
              </Link>
            ))}
             <button onClick={() => setIsOpen(false)} className="mt-8 font-mono text-sm text-muted hover:text-white">
              [ CERRAR ]
            </button>
          </nav>
        </div>
      )}
    </>
  );
}