import Link from "next/link";
import type { Project } from "../data/projects";
import { ProjectVisual } from "./project-visual";
import styles from "./project-card.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.projectCard}>
      <Link
        className={styles.projectCard__visualLink}
        href={`/proyectos/${project.slug}`}
        aria-label={`Ver caso de estudio: ${project.title}`}
      >
        <ProjectVisual variant={project.visual} compact />
      </Link>

      <div className={styles.projectCard__content}>
        <p className={styles.projectCard__meta}>
          <span>{project.index}</span>
          {project.eyebrow}
        </p>
        <h3>
          <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className={styles.projectCard__copy}>{project.cardCopy}</p>
        <ul className={styles.projectCard__tags} aria-label="Tecnologías y disciplinas">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <Link className={styles.projectCard__link} href={`/proyectos/${project.slug}`}>
          Ver deep dive <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
