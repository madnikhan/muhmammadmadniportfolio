import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madnikhan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/about", "/cv", "/contact"];
  const projects = [
    "/projects/restaurant-food-ops",
    "/projects/vendora-retail-pos",
    "/projects/commerce-business-systems",
  ];

  return [...routes, ...projects].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
