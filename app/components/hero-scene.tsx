"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "../page.module.css";

export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--scene-x", `${x * 8}deg`);
      sceneRef.current.style.setProperty("--scene-y", `${y * -5}deg`);
    }
  };

  const resetScene = () => {
    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--scene-x", "0deg");
      sceneRef.current.style.setProperty("--scene-y", "0deg");
    }
  };

  return (
    <div
      className={styles.scene}
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetScene}
      role="img"
      aria-label="Espacio digital tridimensional que representa el proceso de diseño y desarrollo web"
    >
      <div className={styles.scene__frame}>
        <Image
          className={styles.scene__image}
          src="/images/hero-digital-forge.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 1023px) 100vw, 55vw"
        />
        <div className={styles.scene__veil} aria-hidden="true" />
        <span className={styles.scene__corner} aria-hidden="true" />
        <p className={styles.scene__caption}>
          <span>Creative development</span>
          <strong>Digital space / 001</strong>
        </p>
      </div>
      <span className={styles.scene__status}>Diseño · Código · Movimiento</span>
    </div>
  );
}
