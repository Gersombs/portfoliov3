import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "../../components/project-visual";
import { SiteFooter } from "../../components/site-footer";
import { absoluteUrl } from "../../config/site";
import { getNextProject, getProject, projects } from "../../data/projects";
import styles from "./case-study.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Caso de estudio`,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.title} — Caso de estudio`,
      description: project.summary,
      url: absoluteUrl(`/proyectos/${project.slug}`),
      type: "article",
      images: [absoluteUrl("/images/hero-digital-forge.webp")],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  return (
    <main className={styles.caseStudy} id="inicio">
      <header className={styles.caseStudy__header}>
        <Link className={styles.caseStudy__brand} href="/#inicio" aria-label="Volver al inicio">
          <span aria-hidden="true">GB</span>
          <strong>Gersom Bahena</strong>
        </Link>
        <Link className={styles.caseStudy__back} href="/#proyectos">
          <span aria-hidden="true">←</span> Todos los proyectos
        </Link>
      </header>

      <section className={styles.caseStudy__hero}>
        <p className={styles.caseStudy__eyebrow}>{project.index} / {project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className={styles.caseStudy__summary}>{project.summary}</p>
        <dl className={styles.caseStudy__facts}>
          <div><dt>Año</dt><dd>{project.year}</dd></div>
          <div><dt>Proyecto</dt><dd>{project.type}</dd></div>
          <div><dt>Mi aportación</dt><dd>{project.role}</dd></div>
          <div><dt>Estado</dt><dd>{project.status}</dd></div>
        </dl>
      </section>

      <section className={styles.caseStudy__visual} aria-label={`Vista del proyecto ${project.title}`}>
        <ProjectVisual variant={project.visual} />
      </section>

      <section className={styles.caseStudy__brief}>
        <div>
          <p className={styles.caseStudy__sectionLabel}>El reto</p>
          <h2>Dar forma a lo que todavía no era evidente.</h2>
        </div>
        <div className={styles.caseStudy__briefCopy}>
          <article>
            <span>01</span>
            <div><h3>Contexto</h3><p>{project.challenge}</p></div>
          </article>
          <article>
            <span>02</span>
            <div><h3>Oportunidad</h3><p>{project.opportunity}</p></div>
          </article>
        </div>
      </section>

      <section className={styles.caseStudy__decisions}>
        <div className={styles.caseStudy__decisionsHeading}>
          <p className={styles.caseStudy__lightLabel}>Decisiones clave</p>
          <h2>Diseñar también es decidir qué no necesita estar ahí.</h2>
        </div>
        <ol>
          {project.decisions.map((decision) => (
            <li key={decision.index}>
              <span>{decision.index}</span>
              <div><h3>{decision.title}</h3><p>{decision.copy}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.caseStudy__system}>
        <div>
          <p className={styles.caseStudy__sectionLabel}>Sistema visual</p>
          <h2>Una paleta que ayuda a reconocer el proyecto.</h2>
        </div>
        <ul className={styles.caseStudy__palette} aria-label="Paleta de color">
          {project.palette.map((color) => (
            <li key={color} style={{ backgroundColor: color }}>
              <span>{color}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.caseStudy__outcome}>
        <p className={styles.caseStudy__lightLabel}>{project.outcome.eyebrow}</p>
        <div className={styles.caseStudy__outcomeGrid}>
          <h2>{project.outcome.title}</h2>
          <div>
            <p>{project.outcome.copy}</p>
            <ul>
              {project.outcome.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.caseStudy__next}>
        <p>Siguiente proyecto</p>
        <Link href={`/proyectos/${nextProject.slug}`}>
          <span>{nextProject.title}</span>
          <i aria-hidden="true">↗</i>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
