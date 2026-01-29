"use client";

import { useState } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * CommandBar
 * - Compact floating navigation used across the site.
 * - Provides quick links to sections, language toggle, and mobile menu.
 *
 * Notes:
 * - This component runs on the client (`"use client"`).
 * - Keep logic minimal to avoid re-renders.
 */
export default function CommandBar(): JSX.Element {
  // Local UI state for mobile menu open/closed
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Language context (i18n) and localized strings
  const { language, setLanguage, t } = useLanguage();

  // Hook that returns the currently active section id (e.g. 'home', 'projects')
  const activeSection = useActiveSection();

  // Toggle language between Spanish and English
  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  // Navigation items used both in desktop and mobile menus
  const navLinks: { name: string; id: string }[] = [
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.stack, id: "services" },
    { name: t.nav.contact, id: "contact" },
  ];

  /**
   * Smooth-scroll to a page section by id.
   * Prevents default link navigation and closes the mobile menu if open.
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
   * Scroll to top (used by the logo). Also close mobile menu for safety.
   */
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* COMMAND BAR: floating container */}
      <div
        className="fixed z-50 transition-all duration-300
        bottom-6
        left-4 right-4 w-auto transform-none
        md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto
      "
      >
        <div className="flex items-center justify-between bg-elevated/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50
          px-4 py-3 
          md:px-6 md:py-3
        ">

          {/* 1. STATUS + LOGO */}
          <Link href="/" onClick={scrollToTop} className="group flex items-center gap-3 shrink-0">
            {/* Status indicator (active when at top) */}
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                activeSection === "home" ? "bg-neon-green animate-pulse" : "bg-white/20"
              }`}
            ></div>

            {/* Small label next to logo. Truncate to avoid layout shift on tiny screens. */}
            <span className="font-mono text-[10px] md:text-xs text-muted group-hover:text-white transition-colors tracking-widest truncate max-w-[100px] md:max-w-none">
              SYS.ONLINE
            </span>
          </Link>

          {/* 2. DESKTOP NAV (hidden on small screens) */}
          <nav className="hidden md:flex items-center gap-6 mx-6 border-l border-r border-white/10 px-6" role="navigation" aria-label="Main navigation">
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
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. CONTROLS */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Language toggle button */}
            <button
              onClick={toggleLanguage}
              className="font-mono text-[10px] md:text-xs text-secondary hover:text-white transition-colors uppercase w-6 md:w-8 text-center"
              aria-label="Cambiar idioma"
            >
              [{language.toUpperCase()}]
            </button>

            <div className="h-4 w-px bg-white/10 md:hidden"></div>

            {/* Mobile menu (hamburger). Keep aria-expanded for accessibility. */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 hover:bg-white/5 rounded transition-colors group relative h-8 w-8 flex items-center justify-center"
              aria-label="Menú"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-[3px] items-end w-5">
                <span className={`h-0.5 bg-white transition-all duration-300 origin-right ${isOpen ? "w-5 -rotate-45 translate-y-[1px]" : "w-5"}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "w-3 group-hover:w-5"}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 origin-right ${isOpen ? "w-5 rotate-45 -translate-y-[1px]" : "w-5"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (shown when `isOpen`) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center animate-in fade-in duration-200">
          <nav className="flex flex-col items-center gap-8" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`font-heading text-3xl transition-all hover:tracking-widest ${
                  activeSection === link.id ? "text-neon-cyan" : "text-white hover:text-neon-cyan"
                }`}
                aria-current={activeSection === link.id ? "page" : undefined}
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