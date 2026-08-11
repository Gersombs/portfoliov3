# Gersom Bahena — Portfolio V3

Portafolio comercial para presentar servicios de diseño y desarrollo web. La experiencia combina un hero inmersivo en azul con secciones editoriales claras, casos de estudio individuales y un contacto directo.

## Experiencia

- Hero 3D interactivo en escritorio y visual limpio a pantalla completa en móvil.
- Proyectos editoriales con deep dives para DCA Travel, Brandway y Portfolio V3.
- Sección de proceso, formulario de contacto por correo y footer accesible.
- Diseño mobile first, reducción de movimiento, navegación por teclado y metadatos SEO.
- Componentes TypeScript reutilizables y estilos CSS Modules con nomenclatura BEM.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules con nomenclatura BEM
- Fuentes Geist locales para un build reproducible

## Desarrollo local

Requiere Node.js 24.

```bash
npm ci
npm run dev
```

La URL canónica usa `https://gersombahena.dev`. Para probar otro dominio, define `NEXT_PUBLIC_SITE_URL` antes de compilar.

## Calidad

```bash
npm run lint
npm test
```

`npm test` genera el build nativo de Next.js, inicia el servidor de producción y
verifica la home, las rutas de proyectos, el hero móvil, la paleta azul, el
formulario, robots y sitemap.

## Producción

El repositorio usa el flujo estándar de Next.js:

```bash
npm run build
npm start
```

Vercel detecta el framework automáticamente y publica el artefacto `.next`.
