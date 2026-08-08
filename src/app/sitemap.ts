import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getArticleSlugs, getConditionSlugs } from "@/lib/content";

// Generated at build time so it can never drift from the routes that actually
// exist, and so it follows siteConfig.seo.siteUrl if the domain changes.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl.replace(/\/$/, "");
  const url = (path: string) => `${base}${path}`;

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/accessibility/", priority: 0.3 },
    { path: "/privacy-policy/", priority: 0.3 },
    { path: "/cookie-policy/", priority: 0.3 },
    { path: "/terms/", priority: 0.3 },
  ];

  return [
    ...staticPages.map((p) => ({ url: url(p.path), priority: p.priority })),
    ...getConditionSlugs().map((slug) => ({
      url: url(`/conditions/${slug}/`),
      priority: 0.8,
    })),
    ...getArticleSlugs().map((slug) => ({
      url: url(`/articles/${slug}/`),
      priority: 0.6,
    })),
  ];
}
