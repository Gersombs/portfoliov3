import Link from "next/link";
import { ContactForm } from "./components/contact-form";
import { HeroScene } from "./components/hero-scene";
import { ProjectCard } from "./components/project-card";
import { SiteFooter } from "./components/site-footer";
import { siteConfig } from "./config/site";
import { projects } from "./data/projects";
import styles from "./page.module.css";

const services = ["Landing pages", "Portafolios", "Sitios corporativos"];

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.home__header}>
        <Link className={styles.home__brand} href="#inicio" aria-label="Ir al inicio">
          <span className={styles.home__monogram} aria-hidden="true">GB</span>
          <span>
            Gersom Bahena
            <small>Diseño y desarrollo web</small>
          </span>
        </Link>

        <nav className={styles.home__nav} aria-label="Navegación principal">
          <Link href="#proyectos">Proyectos</Link>
          <Link href="#proceso">Proceso</Link>
          <Link className={styles.home__navCta} href="#contacto">Hablemos</Link>
        </nav>
      </header>

      <section className={styles.home__hero} id="inicio">
        <div className={styles.home__heroCopy}>
          <p className={styles.home__eyebrow}>
            <span aria-hidden="true" />
            Desarrollo web independiente · México
          </p>
          <h1 className={styles.home__title}>
            Tu trabajo ya tiene valor.
            <span>Hagamos que se vea.</span>
          </h1>
          <p className={styles.home__intro}>
            Diseño y desarrollo sitios web con personalidad, pensados para que
            profesionales y negocios conviertan visitas en oportunidades reales.
          </p>
          <div className={styles.home__actions}>
            <Link className={styles.home__primaryAction} href="#proyectos">
              Explorar proyectos <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.home__secondaryAction} href="#contacto">
              Cuéntame tu idea
            </Link>
          </div>
          <ul className={styles.home__services} aria-label="Servicios principales">
            {services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>

        <HeroScene />

        <a className={styles.home__scrollCue} href="#proyectos">
          <span>Scroll para descubrir</span><i aria-hidden="true" />
        </a>
      </section>

      <section className={styles.home__projectTeaser} id="proyectos">
        <div>
          <p className={styles.home__sectionIndex}>01 / Trabajo seleccionado</p>
          <h2>Proyectos que combinan estrategia, diseño y código.</h2>
        </div>
        <p>
          Cada caso tendrá su propio deep dive: el reto, las decisiones y el
          resultado, no sólo una captura bonita.
        </p>
      </section>

      <section className={styles.home__projects} aria-label="Proyectos seleccionados">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </section>

      <section className={styles.home__process} id="proceso">
        <div className={styles.home__processIntro}>
          <p className={styles.home__darkSectionIndex}>02 / Cómo trabajo</p>
          <h2>Una página bonita es el inicio. Tiene que entenderse y funcionar.</h2>
        </div>
        <ol className={styles.home__processSteps}>
          <li>
            <span>01</span>
            <div><h3>Entender</h3><p>Tu negocio, tu cliente y la acción que quieres provocar.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Diseñar</h3><p>Jerarquía, contenido y una dirección visual propia para tu proyecto.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Construir</h3><p>Desarrollo responsive, pruebas y detalles listos para publicar.</p></div>
          </li>
        </ol>
      </section>

      <section className={styles.home__contact} id="contacto">
        <div className={styles.home__contactHeading}>
          <p className={styles.home__darkSectionIndex}>03 / Empecemos</p>
          <h2>¿Tienes una idea que merece verse más profesional?</h2>
          <p>
            Cuéntame qué estás construyendo. Podemos empezar con una landing,
            un portafolio o el sitio de tu negocio.
          </p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email} <span aria-hidden="true">↗</span></a>
        </div>
        <ContactForm />
      </section>

      <SiteFooter />
    </main>
  );
}
