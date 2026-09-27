import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robotism.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/visibility/`, lastModified: new Date() },
  ];
}
