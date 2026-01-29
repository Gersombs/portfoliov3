"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function CommandBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const activeSection = useActiveSection();

  /* ---------- Memo ---------- */
  const navLinks = useMemo(
    () => [
      { name: t.nav.projects, id: "projects" },
      { name: t.nav.stack, id: "services" },
      { name: t.nav.contact, id: "contact" },
    ],
    [t]
  );

  /* ---------- Callbacks ---------- */
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "es" ? "en" : "es");
  }, [language, setLanguage]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    },
    []
  );

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  /* ---------- Focus Mode (input / textarea) ---------- */
  useEffect(() => {
    const onFocusIn = (e: Event) => {
      const el = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(el.tagName)) {
        setIsInputFocused(true);
      }
    };

    const onFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active || !["INPUT", "TEXTAREA"].includes(active.tagName)) {
          setIsInputFocused(false);
        }
      }, 100);
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  /* ---------- Lock scroll on mobile menu ---------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* COMMAND BAR */}
      {!isOpen && (
        <div
          className={`
            fixed z-50 transition-all duration-500 ease-in-out
            bottom-6 left-4 right-4
            md:left-1/2 md:right-auto md:-translate-x-1/2
            ${isInputFocused ? "translate-y-[200%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
          `}
        >
          <nav
            aria-label="Primary"
            className="
              flex items-center justify-between
              bg-elevated/90 backdrop-blur-xl
              border border-white/10 rounded-full
              shadow-2xl shadow-black/50
              px-4 py-3 md:px-6
            "
          >
            {/* HOME */}
            <Link
              href="/"
              onClick={scrollToTop}
              aria-label="Ir al inicio"
              className="group flex items-center gap-3 shrink-0 focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-full"
            >
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${
                  activeSection === "home"
                    ? "bg-neon-green animate-pulse"
                    : "bg-white/20"
                }`}
              />
              <span className="font-mono text-[10px] md:text-xs text-muted tracking-widest truncate">
                SYS.ONLINE
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex items-center gap-6 mx-6 border-l border-r border-white/10 px-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    aria-current={activeSection === link.id ? "page" : undefined}
                    className={`font-mono text-xs tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-neon-cyan rounded ${
                      activeSection === link.id
                        ? "text-neon-cyan"
                        : "text-secondary hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CONTROLS */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label="Cambiar idioma"
                className="font-mono text-[10px] md:text-xs text-muted uppercase w-8 text-center focus-visible:ring-2 focus-visible:ring-neon-cyan rounded"
              >
                [{language.toUpperCase()}]
              </button>

              <div className="h-4 w-px bg-white/10 md:hidden" />

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menú"
                className="md:hidden h-8 w-8 flex items-center justify-center rounded hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-neon-cyan"
              >
                <span className="sr-only">Abrir menú</span>
                <div className="flex flex-col gap-1 items-end w-5" aria-hidden>
                  <span className="h-0.5 w-5 bg-white" />
                  <span className="h-0.5 w-3 bg-white" />
                  <span className="h-0.5 w-5 bg-white" />
                </div>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="font-heading text-3xl text-white hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan rounded"
              >
                {link.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-8 font-mono text-sm text-muted hover:text-white focus-visible:ring-2 focus-visible:ring-neon-cyan rounded"
            >
              [ CERRAR ]
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
