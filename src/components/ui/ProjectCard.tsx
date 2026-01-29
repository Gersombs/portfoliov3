"use client"

import Image from "next/image";
import Link from "next/link";
// Optional: import `useLanguage` if you need localized strings inside the card.
// import { useLanguage } from "@/context/LanguageContext"

type ProjectCardProps = {
  title: string;
  metric?: string;
  image: string;
  description: string;
  links: {
    demo: string;
    repo: string;
  };
  tech?: string[];
  priority?: boolean;
};

/**
 * ProjectCard
 *
 * Reusable project preview card used in the FeaturedProjects grid. Displays
 * an image header with an accessibility-friendly overlay (visible on mobile
 * and on hover/focus for desktop), a short description, tech badges and
 * action links (live demo and repository).
 *
 * Props are typed via `ProjectCardProps` and include optional `tech` and
 * `priority` flags to influence layout and image loading priority.
 */
export default function ProjectCard({
  title,
  metric,
  image,
  description,
  links,
  tech = [],
  priority = false,
}: ProjectCardProps) {

  return (
    <article className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      
      {/*
        Header area (image + overlay)
        - Renders the project image as a responsive background using `next/image`.
        - The overlay contains the description and tech badges and provides
          better contrast on small screens (always visible on mobile).
        - On large screens the overlay appears on hover or when focused (keyboard).
      */}
      <div className="relative h-60 w-full overflow-hidden bg-elevated">
        
        {/* Image behavior
          - Mobile (default): slightly darkened/blurred to ensure overlay text
          remains legible.
          - Desktop (lg): image is clearer by default and the overlay appears
          on hover or focus for interaction affordance.
        */}
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          // AQUI CAMBIO: En mobile (default) tiene blur/opacity para leer texto. En Desktop (lg) se limpia.
          className="object-cover transition-transform duration-500 
            opacity-40 blur-[2px] scale-105
            lg:opacity-80 lg:blur-0 lg:scale-100
            lg:group-hover:scale-105 lg:group-hover:blur-[2px] lg:group-hover:opacity-40"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />

        {/*
          Overlay (description + tech badges)
          - Visible by default on mobile (`opacity-100`) because hover is not
            available on touch devices.
          - Hidden on large screens (`lg:opacity-0`) and revealed on hover
            (`lg:group-hover:opacity-100`) or keyboard focus (`group-focus-within`).
          - This pattern improves accessibility and preserves visual polish.
        */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300
            opacity-100 
            lg:opacity-0 
            lg:group-hover:opacity-100 
            group-focus-within:opacity-100"
        >
            {/*
              Notes on utility classes:
              1. `opacity-100` => Overlay is visible on mobile (no hover).
              2. `lg:opacity-0` => Hidden by default on large screens.
              3. `lg:group-hover:opacity-100` => Revealed on hover (desktop).
              4. `group-focus-within:opacity-100` => Revealed when focused via keyboard.
            */}
            
            <p className="text-sm text-white font-body leading-relaxed drop-shadow-md line-clamp-4">
              {description}
            </p>

            {tech.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span key={item} className="font-mono text-[10px] text-neon-cyan border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-1 rounded shadow-[0_0_5px_rgba(0,240,255,0.2)]">
                    {item}
                  </span>
                ))}
              </div>
            )}
        </div>

      </div>

      {/*
        Footer area (title, metric, actions)
        - Shows the project title and optional metric badge (e.g., "+40% Leads").
        - Action links: Live demo and repository. Links open in a new tab and
          include focus-visible styling for keyboard users.
      */}
      <div className="flex flex-col grow p-5 border-t border-white/5 bg-elevated/30">
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-neon-cyan transition-colors">
            {title}
          </h3>
          {metric && (
            <span className="shrink-0 font-mono text-xs text-neon-green border border-neon-green/30 bg-neon-green/10 px-2 py-1 rounded ml-2">
              {metric}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6 mt-auto pt-4">
          
          <Link
            href={links.demo}
            target="_blank"
            // Accessibility: `focus-visible` styles indicate keyboard focus
            className="group/link flex items-center gap-2 text-sm font-mono font-bold text-white hover:text-neon-cyan transition-colors outline-none focus-visible:text-neon-cyan"
          >
            <span className="text-lg group-hover/link:translate-x-1 transition-transform">›</span> LIVE DEMO
          </Link>

          {links.repo && (
            <Link
              href={links.repo}
              target="_blank"
              className="flex items-center gap-2 text-sm font-mono text-secondary hover:text-white transition-colors outline-none focus-visible:text-white"
            >
              <span>GITHUB</span>
              <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>

    </article>
  );
}