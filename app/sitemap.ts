import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog/repository";
import { PUBLIC_INDEXABLE_ROUTES, publicUrl } from "@/lib/marketing";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: publicUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const posts = await getPublishedPosts();
  const blogRoutes = posts.some((post) => !post.noindex)
    ? [
        {
          url: publicUrl("/blog"),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
      ]
    : [];
  const postRoutes = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: publicUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...blogRoutes, ...postRoutes];
}
