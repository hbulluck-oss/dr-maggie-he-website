import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

// Generated so the sitemap link follows siteConfig.seo.siteUrl automatically.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.seo.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The content editor is a private admin screen, not a page for search engines.
      disallow: "/admin/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
