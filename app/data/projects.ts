export type ProjectVisual = "dca" | "brandway" | "portfolio";

export type Project = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  cardCopy: string;
  year: string;
  type: string;
  role: string;
  status: string;
  visual: ProjectVisual;
  tags: string[];
  challenge: string;
  opportunity: string;
  decisions: Array<{
    index: string;
    title: string;
    copy: string;
  }>;
  outcome: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
  };
  palette: string[];
};

export const projects: Project[] = [
  {
    slug: "dca-travel",
    index: "01",
    title: "DCA Travel",
    eyebrow: "Portal B2B · Turismo",
    summary:
      "Una plataforma para que agencias de viajes exploren itinerarios, encuentren materiales y trabajen con una operación más clara.",
    cardCopy:
      "De un catálogo disperso a una experiencia digital que organiza la oferta y facilita el trabajo comercial.",
    year: "2026",
    type: "Producto digital B2B",
    role: "Estrategia · UX/UI · Frontend",
    status: "En evolución",
    visual: "dca",
    tags: ["React", "TypeScript", "Tailwind", "CMS"],
    challenge:
      "La información comercial vivía en archivos y conversaciones separadas. Para una agencia, encontrar el itinerario correcto y solicitar material implicaba demasiados pasos.",
    opportunity:
      "Convertir esa operación en un catálogo B2B claro, filtrable y preparado para crecer, sin perder la identidad cálida y cercana de DCA.",
    decisions: [
      {
        index: "01",
        title: "Orden antes que ornamento",
        copy: "La navegación se organizó alrededor de las tareas reales de una agencia: explorar, comparar, revisar y descargar.",
      },
      {
        index: "02",
        title: "Contenido listo para escalar",
        copy: "Los itinerarios se modelaron como contenido estructurado para que nuevos destinos no exigieran rediseñar la interfaz.",
      },
      {
        index: "03",
        title: "Confianza en cada pantalla",
        copy: "Jerarquía, filtros y llamados a la acción reducen la incertidumbre y mantienen visible el siguiente paso.",
      },
    ],
    outcome: {
      eyebrow: "Resultado",
      title: "Una base digital más útil para vender y operar.",
      copy: "El proyecto reúne catálogo, materiales y contexto comercial en una experiencia coherente que puede crecer junto con la oferta de DCA.",
      points: [
        "Catálogo centralizado y fácil de explorar",
        "Arquitectura preparada para nuevos itinerarios",
        "Experiencia consistente en móvil y escritorio",
      ],
    },
    palette: ["#ed6a20", "#056099", "#f6f2e9", "#101820"],
  },
  {
    slug: "brandway",
    index: "02",
    title: "Brandway",
    eyebrow: "Marca · Experiencias móviles",
    summary:
      "Una dirección de marca para transformar autobuses en escenarios donde las empresas pueden activar, exhibir y conectar.",
    cardCopy:
      "Identidad, narrativa y presencia digital para una propuesta BTL que convierte movilidad en experiencia.",
    year: "2026",
    type: "Concepto de marca",
    role: "Estrategia · Dirección visual · Concepto UX",
    status: "Concepto en desarrollo",
    visual: "brandway",
    tags: ["Brand strategy", "Art direction", "UX concept"],
    challenge:
      "La propuesta era poderosa, pero difícil de explicar con palabras: no se trataba sólo de rotular un autobús, sino de convertirlo por dentro y por fuera en una activación completa.",
    opportunity:
      "Crear una identidad capaz de hablar con agencias BTL y marcas corporativas, mostrando la transformación como un producto premium y tangible.",
    decisions: [
      {
        index: "01",
        title: "Movimiento como sistema",
        copy: "La dirección visual usa recorridos, diagonales y secuencias para comunicar que la experiencia comienza antes de abordar.",
      },
      {
        index: "02",
        title: "Rojo con intención",
        copy: "El acento conecta con el origen de Turibús y aporta energía sin perder el tono corporativo de la propuesta.",
      },
      {
        index: "03",
        title: "Mostrar la transformación",
        copy: "La narrativa visual contrasta exterior e interior para que el valor de la intervención se entienda de inmediato.",
      },
    ],
    outcome: {
      eyebrow: "Resultado",
      title: "Una idea compleja convertida en una historia comercial clara.",
      copy: "Brandway cuenta con una base de identidad y una narrativa visual que permiten presentar el servicio, imaginar activaciones y abrir conversaciones con marcas.",
      points: [
        "Posicionamiento creativo con tono corporativo",
        "Sistema visual adaptable a distintos sectores",
        "Narrativa enfocada en la experiencia completa",
      ],
    },
    palette: ["#e52922", "#111111", "#f2eee6", "#8b8d91"],
  },
  {
    slug: "portfolio-v3",
    index: "03",
    title: "Portfolio V3",
    eyebrow: "Identidad digital · Creative development",
    summary:
      "Un portafolio que equilibra una atmósfera 3D inmersiva con la claridad que necesita una propuesta profesional.",
    cardCopy:
      "Una identidad personal más madura: experimental donde aporta valor y editorial donde debe comunicar.",
    year: "2026",
    type: "Portfolio personal",
    role: "Dirección creativa · UX/UI · Desarrollo",
    status: "Sitio actual",
    visual: "portfolio",
    tags: ["Next.js", "TypeScript", "CSS", "3D art"],
    challenge:
      "El portafolio anterior demostraba conocimiento técnico, pero su lenguaje cyberpunk hablaba más con desarrolladores que con los negocios que podrían contratar el servicio.",
    opportunity:
      "Conservar una personalidad vinculada al anime y gaming, elevándola hacia una dirección de arte sobria que también transmita confianza comercial.",
    decisions: [
      {
        index: "01",
        title: "Inmersión con propósito",
        copy: "El escenario 3D protagoniza la entrada y funciona como metáfora de construir espacios digitales, no como decoración aislada.",
      },
      {
        index: "02",
        title: "Contraste editorial",
        copy: "Después del hero oscuro, las secciones claras hacen que los proyectos y el proceso sean fáciles de leer y comparar.",
      },
      {
        index: "03",
        title: "Mobile como experiencia propia",
        copy: "En pantallas pequeñas el primer viewport elimina texto y navegación para permitir que el universo visual respire por completo.",
      },
    ],
    outcome: {
      eyebrow: "Resultado",
      title: "Una presencia digital con carácter, enfoque y espacio para crecer.",
      copy: "El nuevo sistema presenta el trabajo como casos de estudio y orienta cada decisión visual hacia una conversación comercial más clara.",
      points: [
        "Hero inmersivo adaptado específicamente a móvil",
        "Casos de estudio con contexto y decisiones",
        "Sistema reusable para incorporar nuevos proyectos",
      ],
    },
    palette: ["#347dff", "#08090d", "#f3f0e9", "#ff6b4a"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}
