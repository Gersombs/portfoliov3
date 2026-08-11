"use client";

import { useState } from "react";
import { siteConfig } from "../config/site";
import styles from "./contact-form.module.css";

export function ContactForm() {
  const [prepared, setPrepared] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const service = String(form.get("service") ?? "Proyecto web").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Nuevo proyecto: ${service} — ${name}`);
    const body = encodeURIComponent(
      `Hola Gersom,\n\nSoy ${name} (${email}).\nMe interesa: ${service}.\n\n${message}`,
    );

    setPrepared(true);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className={styles.contactForm}
      aria-describedby="contact-form-help"
      onSubmit={handleSubmit}
    >
      <div className={styles.contactForm__row}>
        <label className={styles.contactForm__field}>
          <span>Tu nombre</span>
          <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamas?" required />
        </label>
        <label className={styles.contactForm__field}>
          <span>Tu correo</span>
          <input name="email" type="email" autoComplete="email" placeholder="hola@tuempresa.com" required />
        </label>
      </div>

      <label className={styles.contactForm__field}>
        <span>¿Qué necesitas?</span>
        <select name="service" defaultValue="Landing page">
          <option>Landing page</option>
          <option>Portafolio profesional</option>
          <option>Sitio para mi negocio</option>
          <option>Otro proyecto web</option>
        </select>
      </label>

      <label className={styles.contactForm__field}>
        <span>Cuéntame un poco</span>
        <textarea
          name="message"
          rows={5}
          minLength={10}
          placeholder="Qué haces, qué quieres conseguir y si tienes una fecha en mente."
          required
        />
      </label>

      <div className={styles.contactForm__footer}>
        <p id="contact-form-help" aria-live="polite">
          {prepared
            ? "Listo. Abrí tu aplicación de correo con el mensaje preparado."
            : "El botón abrirá tu correo con el mensaje listo para enviar."}
        </p>
        <button type="submit">
          Preparar mensaje <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
