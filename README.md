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
- CSS Modules y Tailwind CSS 4
- Vinext para el despliegue actual en Cloudflare Workers

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La URL canónica usa `https://gersombahena.dev`. Para probar otro dominio, define `NEXT_PUBLIC_SITE_URL` antes de compilar.

## Calidad

```bash
npm run lint
npm test
```

Las pruebas verifican la home, las rutas de proyectos, el hero móvil, la paleta azul, el formulario y el contenido publicado.
