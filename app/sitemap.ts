import type { MetadataRoute } from "next";
import { PUBLIC_INDEXABLE_ROUTES, publicUrl } from "@/lib/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: publicUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
