import type { MetadataRoute } from "next";
import { SITE } from "@/data/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date() },
    { url: `${SITE.url}/projects`, lastModified: new Date() },
  ];
}
