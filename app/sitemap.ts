import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/visibility/`, lastModified: new Date() },
    { url: `${base}/privacy/`, lastModified: new Date() },
    { url: `${base}/consent/`, lastModified: new Date() },
  ];
}
