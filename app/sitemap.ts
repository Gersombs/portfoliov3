import type { MetadataRoute } from "next";
import { absoluteUrl } from "./config/site";
import { projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/proyectos/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
