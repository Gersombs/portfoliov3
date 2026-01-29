"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Footer
 *
 * Site footer that displays identity, social links and a lightweight
 * status/version area. Uses `useLanguage` for localized footer text.
 */
export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  /**
   * socialLinks
   *
   * External links for social/contact channels. Each entry contains a
   * human-readable `name`, a `href` and a utility class for hover color.
   */
  const socialLinks = [
    { name: "GITHUB", href: "https://github.com/Gersombs", color: "hover:text-neon-cyan" },
    { name: "LINKEDIN", href: "https://linkedin.com/in/gersombs", color: "hover:text-neon-magenta" },
    { name: "EMAIL", href: "mailto:gersombs@gmail.com", color: "hover:text-neon-green" },
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-black pt-12 pb-32 md:pb-28 text-center md:text-left relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/*
          Identity
          - Displays the site/author name and a compact status line that uses
            localized text from `t.footer.status`.
        */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <p className="font-heading font-bold text-white tracking-tight">
            GERSOM BAHENA
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
              © {currentYear} {"//"} {t.footer.status} 
            </span>
            <span className="sr-only">Estado del sistema: Operativo</span>
          </div>
        </div>

        {/*
          Social Links
          - Renders `socialLinks` as external anchors opening in a new tab.
          - Color utility classes provide brand-ish hover states.
        */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              target="_blank"
              className={`font-mono text-sm md:text-lg text-secondary transition-all duration-300 ${link.color} hover:underline underline-offset-4 decoration-2`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/*
          Version / Health
          - Lightweight version badge and a status dot indicating system health.
          - Hidden on small screens to keep the footer compact.
        */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/20">
          <span>v2.0.0-beta</span>
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green"></span>
        </div>

      </div>
    </footer>
  );
}