const defaultSiteUrl = "https://gersombahena.dev";

function normalizeSiteUrl(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteConfig = {
  name: "Gersom Bahena",
  title: "Gersom Bahena — Diseño y desarrollo web",
  description:
    "Diseño y desarrollo de landing pages, portafolios y sitios web profesionales en México.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl),
  email: "gersombs@gmail.com",
  github: "https://github.com/Gersombs",
  linkedin: "https://linkedin.com/in/gersombs",
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${siteConfig.url}/`).toString();
}
