import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madnikhan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/about", "/cv", "/contact"];
  const projectPaths = projects.map((p) => `/projects/${p.slug}`);

  return [...routes, ...projectPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
