"use client"; // Importante para usar el hook

import { useLanguage } from "@/context/LanguageContext";

/**
 * Services
 *
 * Section outlining technical capabilities and value propositions. Uses
 * `useLanguage` to render localized headings and descriptions.
 */
export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative w-full max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
      
      {/*
        Section header
        - Localized label, title and description come from `t.services`.
      */}
      <header className="mb-16 max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
           <span className="h-px w-12 bg-neon-magenta"></span>
           <span className="font-mono text-neon-magenta text-sm tracking-widest uppercase">
            {t.services.label} {/* VALUE STACK */}
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          {t.services.title} <br/> 
          <span className="text-secondary opacity-60 text-2xl md:text-3xl">{t.services.subtitle}</span>
        </h2>
        <p className="text-secondary text-lg leading-relaxed">
          {t.services.description}
        </p>
      </header>

      {/*
        Capabilities grid
        - Three columns: Architecture, UX, Performance.
        - Each column lists focused bullet points that describe services/offers.
      */}
      <div className="grid gap-12 md:grid-cols-3">
        
        {/* Column 1 — Architecture */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="w-full font-mono text-sm text-white/90 border-b border-white/10 pb-4 mb-6 flex justify-center md:justify-between items-center">
            [{t.services.arch}]
            <span className="hidden md:inline text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
          </h3>
          <ul className="space-y-4 font-body text-secondary flex flex-col items-center md:items-start">
            <li className="hover:text-neon-cyan transition-colors cursor-default w-fit">React / Next.js (App Router)</li>
            <li className="hover:text-neon-cyan transition-colors cursor-default w-fit">Server Side Rendering</li>
            <li className="hover:text-neon-cyan transition-colors cursor-default w-fit">Database & API Integration</li>
            <li className="hover:text-neon-cyan transition-colors cursor-default w-fit">Scalable Project Structure</li>
          </ul>
        </div>

        {/* Column 2 — UX */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="w-full font-mono text-sm text-white/90 border-b border-white/10 pb-4 mb-6 flex justify-center md:justify-between items-center">
            [{t.services.ux}]
            <span className="hidden md:inline text-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
          </h3>
          <ul className="space-y-4 font-body text-secondary flex flex-col items-center md:items-start">
             <li className="hover:text-neon-magenta transition-colors cursor-default w-fit">Design Systems (Tokens)</li>
             <li className="hover:text-neon-magenta transition-colors cursor-default w-fit">Advanced Animations</li>
             <li className="hover:text-neon-magenta transition-colors cursor-default w-fit">Responsive & Mobile First</li>
             <li className="hover:text-neon-magenta transition-colors cursor-default w-fit">Accessibility (WCAG)</li>
          </ul>
        </div>

        {/* Column 3 — Performance */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="w-full font-mono text-sm text-white/90 border-b border-white/10 pb-4 mb-6 flex justify-center md:justify-between items-center">
            [{t.services.perf}]
            <span className="hidden md:inline text-neon-green opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
          </h3>
          <ul className="space-y-4 font-body text-secondary flex flex-col items-center md:items-start">
             <li className="hover:text-neon-green transition-colors cursor-default w-fit">Core Web Vitals</li>
             <li className="hover:text-neon-green transition-colors cursor-default w-fit">Technical SEO</li>
             <li className="hover:text-neon-green transition-colors cursor-default w-fit">Image Optimization</li>
             <li className="hover:text-neon-green transition-colors cursor-default w-fit">Analytics & Conversion</li>
          </ul>
        </div>

      </div>
    </section>
  );
}