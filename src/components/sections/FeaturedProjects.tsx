"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProjects() {
  const { language, t } = useLanguage();
  /**
   * projectsData
   *
   * Localized collection of featured projects. Each entry contains:
   *  - `id`: stable identifier used as React key
   *  - `title`, `metric`, `image`, `description`
   *  - `tech`: array of technology/feature labels
   *  - `links`: `{ demo, repo }` targets
   *
   * Keep the `id` values stable and ensure `image` paths point to `/public`.
   */
  // --- DATA DE LOS PROYECTOS (Top 5) ---
  const projectsData = {
    es: [
      // 1. PROYECTO ESTRELLA (El más complejo/reciente)
      {
        id: "sandy-courses",
        title: "Plataforma de Idiomas",
        metric: "Translate",
        image: "/projects/sandy.webp",
        description: "Plataforma educativa integral. Sistema de gestión de contenido, soporte multi-idioma y optimización SEO local para captación de alumnos.",
        tech: ["Next.js", "Tailwind", "i18n"],
        links: {
          demo: "https://cursos-chi-hazel.vercel.app/", 
          repo: "https://github.com/Gersombs/sandy",
        },
      },
      // 2. BRANDING & ANIMACIÓN
      {
        id: "octavio-zait",
        title: "Octavio Zait Branding",
        metric: "Brand Identity",
        image: "/projects/zait.webp",
        description: "Experiencia digital inmersiva. Identidad visual con animaciones fluidas y micro-interacciones enfocadas en la retención del usuario.",
        tech: ["Next.js", "Tailwind", "Framer Motion"],
        links: {
          demo: "https://gersombs.github.io/Zait/",
          repo: "https://github.com/Gersombs/Zait",
        },
      },
      // 3. CORPORATIVO / FISCAL
      {
        id: "fiscal-web",
        title: "Web Fiscal Corporativa",
        metric: "+40% Leads",
        image: "/projects/contador.webp",
        description: "Sitio corporativo de alto rendimiento para firma contable. Arquitectura estática para carga instantánea y confianza institucional.",
        tech: ["React", "CSS Modules", "SEO"],
        links: {
          demo: "https://contador-khaki-one.vercel.app/",
          repo: "https://github.com/Gersombs/contador",
        },
      },
      // 4. LANDING DINÁMICA
      {
        id: "dynamic-landing",
        title: "Landing Page Dinámica",
        metric: "Animation",
        image: "/projects/landing.webp",
        description: "Interfaz modular conectada a APIs externas. Renderizado de contenido actualizado en tiempo real con arquitectura de componentes reutilizables.",
        tech: ["React", "Countdown", "CSS3"],
        links: {
          demo: "https://landing-page-two-beta-20.vercel.app/",
          repo: "https://github.com/Gersombs/landing-page",
        },
      },
      // 5. AGENCIA DIGITAL
      {
        id: "gbs-digital",
        title: "Agencia GBS Digital",
        metric: "Gallery Blog",
        image: "/projects/gbs.webp",
        description: "Plataforma corporativa enfocada en la conversión. UX optimizada para guiar al usuario hacia la contratación de servicios digitales.",
        tech: ["HTML5", "JavaScript", "CSS3", "Blog"],
        links: {
          demo: "https://gersombs.github.io/AgenciaGBS/",
          repo: "https://github.com/Gersombs/AgenciaGBS",
        },
      },
    ],
    
    // --- ENGLISH VERSION ---
    en: [
      {
        id: "sandy-courses",
        title: "Language Platform",
        metric: "Translate",
        image: "/projects/sandy.webp",
        description: "Comprehensive educational platform. CMS integration, multi-language support, and local SEO optimization for student acquisition.",
        tech: ["Next.js", "Tailwind", "i18n"],
        links: {
          demo: "https://cursos-chi-hazel.vercel.app/",
          repo: "https://github.com/Gersombs/sandy",
        },
      },
      {
        id: "octavio-zait",
        title: "Octavio Zait Branding",
        metric: "Brand Identity",
        image: "/projects/zait.webp",
        description: "Immersive digital experience. Visual identity with fluid animations and micro-interactions focused on user retention.",
        tech: ["Next.js", "Tailwind", "Framer Motion"],
        links: {
          demo: "https://gersombs.github.io/Zait/",
          repo: "https://github.com/Gersombs/Zait",
        },
      },
      {
        id: "fiscal-web",
        title: "Corporate Fiscal Web",
        metric: "+40% Leads",
        image: "/projects/contador.webp",
        description: "High-performance corporate site for an accounting firm. Static architecture for instant loading and institutional trust.",
        tech: ["React", "CSS Modules", "SEO", "Framer Motion"],
        links: {
          demo: "https://contador-khaki-one.vercel.app/",
          repo: "https://github.com/Gersombs/contador",
        },
      },
      {
        id: "dynamic-landing",
        title: "Dynamic Landing Page",
        metric: "Animation",
        image: "/projects/landing.webp",
        description: "Modular interface connected to external APIs. Real-time content rendering with a reusable component architecture.",
        tech: ["React", "Countdown", "CSS3"],
        links: {
          demo: "https://landing-page-two-beta-20.vercel.app/",
          repo: "https://github.com/Gersombs/landing-page",
        },
      },
      {
        id: "gbs-digital",
        title: "GBS Digital Agency",
        metric: "Gallery Blog",
        image: "/projects/gbs.webp",
        description: "Conversion-focused corporate platform. UX optimized to guide users towards hiring digital services.",
        tech: ["HTML5", "JavaScript", "CSS3"],
        links: {
          demo: "https://gersombs.github.io/AgenciaGBS/",
          repo: "https://github.com/Gersombs/AgenciaGBS",
        },
      },
    ],
  };

  const currentProjects = projectsData[language];

  return (
    <section id="projects" className="relative w-full max-w-6xl mx-auto px-6 py-24">
      
      {/*
        Section header
        - Localized label, title and description provided by `t.projects`.
        - Title composes `t.projects.title` and `t.projects.subtitle` for
          visual emphasis.
      */}
      <header className="mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-12 bg-neon-cyan"></span>
          <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">
            {t.projects.label}
          </span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
          {t.projects.title} <span className="text-secondary opacity-50">{t.projects.subtitle}</span>
        </h2>
        <p className="max-w-xl text-secondary text-lg">
          {t.projects.description}
        </p>
      </header>

      {/*
        Projects grid
        - Renders `currentProjects` with `ProjectCard` components.
        - First two items receive `priority` to hint image loading priority.
      */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            metric={project.metric}
            image={project.image}
            description={project.description}
            tech={project.tech}
            links={project.links}
            priority={index < 2} 
          />
        ))}
      </div>
    </section>
  );
}