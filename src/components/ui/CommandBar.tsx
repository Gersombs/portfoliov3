"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * CommandBar
 *
 * Floating navigation bar with quick access links, language toggle and mobile
 * navigation. Uses `useActiveSection` to reflect the current visible section and
 * `useLanguage` for localization and language switching.
 *
 * Behavior:
 *  - Desktop: shows inline nav links that scroll to sections.
 *  - Mobile: opens an overlay menu; selecting a link closes the menu.
 */
export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const activeSection = useActiveSection();

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  /**
   * navLinks
   *
   * Localized navigation entries used by desktop and mobile menus.
   * Each entry includes a `name` (localized) and the target `id` to scroll to.
   * Ensure `id` matches the target section element in the page.
   */
  const navLinks = [
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.stack, id: "services" }, // Ensure this ID matches the section anchor
    { name: t.nav.contact, id: "contact" },
  ];

  /**
   * scrollToSection
   *
   * Intercepts anchor clicks, prevents the default hash behavior and performs
   * a smooth scroll to the element with the provided `id`.
   * Also closes the mobile menu when navigated from there.
   */
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  /**
   * scrollToTop
   *
   * Smoothly scrolls the page to the top. Used by the brand/home link.
   */
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md md:max-w-2xl transition-all duration-300">
        <div className="flex items-center justify-between bg-elevated/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl shadow-black/50">
          
          {/*
            Status / Home Indicator
            - Shows current online status dot and serves as a home link.
            - Uses `activeSection === 'home'` to toggle active styling.
          */}
          <Link href="/" onClick={scrollToTop} className="group flex items-center gap-3">
             <div className={`h-2 w-2 rounded-full transition-colors duration-500 ${activeSection === 'home' ? 'bg-neon-green animate-pulse' : 'bg-white/20'}`}></div>
             <span className="font-mono text-xs text-muted group-hover:text-white transition-colors tracking-widest">
               SYS.ONLINE
             </span>
          </Link>

          {/*
            Desktop Navigation
            - Renders `navLinks` inline on larger screens. Links fallback to
            - `href="#id"` for non-JS cases and intercept clicks for smooth scroll.
          */}
          <nav className="hidden md:flex items-center gap-6 mx-6 border-l border-r border-white/10 px-6">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={`#${link.id}`} // Fallback por si JS falla
                onClick={(e) => scrollToSection(e, link.id)} // Interceptamos el click
                className={`font-mono text-xs transition-colors tracking-wider ${
                  activeSection === link.id 
                    ? "text-neon-cyan drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" // Active State Glow
                    : "text-secondary hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/*
            Controls
            - Language toggle button (a11y: `aria-label`) and mobile hamburger.
            - Hamburger button has accessible labels and `aria-expanded` state.
          */}
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="font-mono text-xs text-secondary hover:text-white transition-colors uppercase w-8 text-center"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'Inglés' : 'Español'}`} // <--- A11Y
            title="Switch Language"
            >
              [{language.toUpperCase()}]
            </button>
            
            <div className="h-4 w-px bg-white/10 md:hidden"></div>

            {/* Hamburger menu (mobile) */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1 hover:bg-white/5 rounded transition-colors group"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"} // <--- A11Y
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

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center animate-in fade-in duration-200">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)} // También interceptamos en mobile
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