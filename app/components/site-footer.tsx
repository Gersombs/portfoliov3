import Link from "next/link";
import { siteConfig } from "../config/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooter__top}>
        <Link className={styles.siteFooter__brand} href="/#inicio">
          <span aria-hidden="true">GB</span>
          <strong>Gersom Bahena</strong>
        </Link>
        <p>Diseño y desarrollo web con estrategia, claridad y personalidad.</p>
      </div>

      <div className={styles.siteFooter__bottom}>
        <p>© {new Date().getFullYear()} · México</p>
        <nav aria-label="Enlaces del footer">
          <Link href="/#proyectos">Proyectos</Link>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <a className={styles.siteFooter__back} href="#inicio">
          Volver arriba <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
