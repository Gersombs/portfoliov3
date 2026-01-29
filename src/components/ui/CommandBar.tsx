"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function CommandBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  /* 🔒 Bloquear scroll cuando el menú está abierto */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* COMMAND BAR (solo cuando el menú NO está abierto) */}
      {!isOpen && (
        <div
          className="
            fixed z-50 transition-all duration-300
            bottom-6 left-4 right-4
            max-w-[calc(100vw-2rem)]
            md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-none
          "
        >
          <div
            className="
              flex items-center justify-between w-full overflow-hidden
              bg-elevated/90 backdrop-blur-xl
              border border-white/10 rounded-full
              shadow-2xl shadow-black/50
              px-4 py-3 md:px-6 md:py-3
            "
          >
            {/* STATUS + LOGO */}
            <Link
              href="/"
              onClick={scrollToTop}
              className="group flex items-center gap-3 shrink-0"
            >
              <div
                className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                  activeSection === "home"
                    ? "bg-neon-green animate-pulse"
                    : "bg-white/20"
                }`}
              />
              <span className="font-mono text-[10px] md:text-xs text-muted tracking-widest truncate max-w-[80px] md:max-w-none">
                SYS.ONLINE
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 mx-6 border-l border-r border-white/10 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`font-mono text-xs tracking-wider transition-colors ${
                    activeSection === link.id
                      ? "text-neon-cyan"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CONTROLS */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={toggleLanguage}
                className="font-mono text-[10px] md:text-xs text-muted uppercase w-8 text-center"
              >
                [{language.toUpperCase()}]
              </button>

              <div className="h-4 w-px bg-white/10 md:hidden" />

              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden h-8 w-8 flex items-center justify-center rounded hover:bg-white/5"
                aria-label="Abrir menú"
              >
                <div className="flex flex-col gap-1 items-end w-5">
                  <span className="h-0.5 w-5 bg-white" />
                  <span className="h-0.5 w-3 bg-white" />
                  <span className="h-0.5 w-5 bg-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden">
          <nav className="flex flex-col items-center gap-8 text-center w-full max-w-[90vw]">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="font-heading text-3xl text-white hover:text-neon-cyan whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 font-mono text-sm text-muted hover:text-white"
            >
              [ CERRAR ]
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
