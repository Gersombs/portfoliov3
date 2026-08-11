import Image from "next/image";
import type { ProjectVisual as ProjectVisualName } from "../data/projects";
import styles from "./project-visual.module.css";

type ProjectVisualProps = {
  variant: ProjectVisualName;
  compact?: boolean;
};

export function ProjectVisual({ variant, compact = false }: ProjectVisualProps) {
  const className = [
    styles.projectVisual,
    styles[`projectVisual--${variant}`],
    compact ? styles["projectVisual--compact"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "dca") {
    return (
      <div className={className} role="img" aria-label="Vista conceptual del portal B2B de DCA Travel">
        <div className={styles.projectVisual__browser}>
          <div className={styles.projectVisual__browserBar} aria-hidden="true">
            <span /><span /><span />
            <i>dcatravel.com / explora</i>
          </div>
          <div className={styles.projectVisual__dcaNav}>
            <strong>DCA</strong>
            <span>Explora</span><span>Itinerarios</span><span>Material</span>
          </div>
          <div className={styles.projectVisual__dcaBody}>
            <p>Descubre Latinoamérica</p>
            <h3>Viajes que se sienten.</h3>
            <div className={styles.projectVisual__dcaCards} aria-hidden="true">
              <span><b>Guatemala</b><i>8 días</i></span>
              <span><b>Colombia</b><i>3 joyas</i></span>
              <span><b>Brasil</b><i>Expreso</i></span>
            </div>
          </div>
        </div>
        <span className={styles.projectVisual__orbit} aria-hidden="true">LATAM / B2B / 2026</span>
      </div>
    );
  }

  if (variant === "brandway") {
    return (
      <div className={className} role="img" aria-label="Concepto visual de un autobús intervenido por Brandway">
        <p className={styles.projectVisual__brandwayWord} aria-hidden="true">BRANDWAY</p>
        <div className={styles.projectVisual__bus} aria-hidden="true">
          <div className={styles.projectVisual__busGlass} />
          <div className={styles.projectVisual__busBrand}>
            <small>YOUR BRAND</small>
            <strong>IN MOTION</strong>
          </div>
          <span className={styles.projectVisual__wheelOne} />
          <span className={styles.projectVisual__wheelTwo} />
        </div>
        <p className={styles.projectVisual__brandwayNote}>Exterior identity / Interior experience</p>
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label="Escenario tridimensional del portafolio de Gersom Bahena">
      <Image
        className={styles.projectVisual__portfolioImage}
        src="/images/hero-digital-forge.webp"
        alt=""
        fill
        unoptimized
        sizes="(max-width: 767px) 100vw, 65vw"
      />
      <div className={styles.projectVisual__portfolioGrid} aria-hidden="true" />
      <p className={styles.projectVisual__portfolioLabel}>
        <span>Creative development</span>
        <strong>Digital space / 001</strong>
      </p>
    </div>
  );
}
