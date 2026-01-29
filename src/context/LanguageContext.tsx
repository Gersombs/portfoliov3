"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/**
 * Translations dictionary
 *
 * Localized copy for the site. Keep translations grouped by locale
 * ('es' and 'en') and reference them via the `useLanguage` hook.
 */
const translations = {
  es: {
    nav: { projects: "PROYECTOS", stack: "STACK", contact: "CONTACTO" },
    hero: {
      badge: "DISPONIBLE PARA TRABAJAR",
      h1_start: "Creo experiencias web modernas que",
      h1_func: "funcionan",
      h1_conv: "convierten",
      sub: "Frontend Developer & UI Designer especializado en React, Next.js y performance web. Transformo código en resultados de negocio.",
      cta_primary: "INICIAR PROYECTO",
      cta_secondary: "VER PORTAFOLIO",
    },
    projects: {
      label: "SELECTED WORK",
      title: "Proyectos",
      subtitle: "/ Deployments",
      description: "Desarrollo enfocado en resolver problemas reales. Performance, SEO y Escalabilidad como estándar.",
      card_btn: "Ver Caso de Estudio →",
      // Textos específicos de las cards (puedes generalizarlos o dejarlos fijos si prefieres)
    },
    services: {
      label: "VALUE STACK",
      title: "Ingeniería de Producto",
      subtitle: "& Experiencia de Usuario",
      description: "No solo escribo código. Diseño sistemas escalables que alinean los objetivos de negocio con una experiencia de usuario impecable.",
      arch: "01_ARQUITECTURA",
      ux: "02_INGENIERÍA_UX",
      perf: "03_OPTIMIZACIÓN",
    },
    contact: {
      label: "INICIAR_COMUNICACIÓN",
      title: "Hablemos de código",
      name_ph: "NOMBRE / ID",
      email_ph: "EMAIL @",
      subject_ph: "ASUNTO_PROTOCOLO",
      msg_ph: "INICIALIZAR MENSAJE...",
      btn_send: "ENVIAR MENSAJE >",
      btn_sending: "TRANSMITIENDO...",
      success: "> MENSAJE_ENVIADO: ÉXITO",
      error: "> ERROR: REINTENTAR_CONEXIÓN",
    },
    footer: {
      status: "TODOS LOS SISTEMAS OPERATIVOS",
    }
  },
  en: {
    nav: { projects: "PROJECTS", stack: "STACK", contact: "CONTACT" },
    hero: {
      badge: "OPEN TO WORK",
      h1_start: "Building modern web experiences that",
      h1_func: "perform",
      h1_conv: "convert",
      sub: "Frontend Developer & UI Designer specialized in React, Next.js & web performance. Turning code into business results.",
      cta_primary: "START PROJECT",
      cta_secondary: "VIEW PORTFOLIO",
    },
    projects: {
      label: "SELECTED WORK",
      title: "Projects",
      subtitle: "/ Deployments",
      description: "Development focused on solving real problems. Performance, SEO, and Scalability as standard.",
      card_btn: "View Case Study →",
    },
    services: {
      label: "VALUE STACK",
      title: "Product Engineering",
      subtitle: "& User Experience",
      description: "I don't just write code. I design scalable systems that align business goals with flawless user experiences.",
      arch: "01_ARCHITECTURE",
      ux: "02_UX_ENGINEERING",
      perf: "03_PERFORMANCE",
    },
    contact: {
      label: "INITIATE_COMMUNICATION",
      title: "Let's talk code",
      name_ph: "NAME / ID",
      email_ph: "EMAIL @",
      subject_ph: "SUBJECT_PROTOCOL",
      msg_ph: "INITIALIZE MESSAGE...",
      btn_send: "SEND MESSAGE >",
      btn_sending: "TRANSMITTING...",
      success: "> MESSAGE_SENT: SUCCESS",
      error: "> ERROR: RETRY_CONNECTION",
    },
    footer: {
      status: "ALL SYSTEMS OPERATIONAL",
    }
  },
};
/**
 * Context types
 */
type Language = "es" | "en";
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations["es"]; // typed based on the Spanish shape
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider
 *
 * Wraps the application and exposes `language`, `setLanguage` and the
 * localized copy `t` to descendant components.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es"); // default to Spanish

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage
 *
 * Convenience hook to access language state and translations. Throws an
 * error if used outside of `LanguageProvider`.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}