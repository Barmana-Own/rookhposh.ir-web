import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const requiredFiles = [
  "lib/blog/types.ts",
  "lib/blog/client.ts",
  "lib/blog/repository.ts",
  "components/blog/BlogCard.tsx",
  "components/blog/BlogContent.tsx",
  "components/blog/BlogDate.tsx",
  "components/blog/BlogImage.tsx",
  "components/blog/BlogProductCta.tsx",
  "components/seo/BlogPostingStructuredData.tsx",
  "components/seo/JsonLd.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/feed.xml/route.ts",
  "app/opengraph-image.tsx",
  "scripts/smoke-blog-fixture.mjs",
  "docs/blog-content-provider.md",
];

for (const relativePath of requiredFiles) {
  try {
    await access(join(root, relativePath));
  } catch {
    failures.push(`Missing Blog file: ${relativePath}`);
  }
}

const sources = new Map();
for (const relativePath of [
  "lib/blog/types.ts",
  "lib/blog/client.ts",
  "lib/blog/repository.ts",
  "components/blog/BlogContent.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "components/seo/BlogPostingStructuredData.tsx",
  "components/seo/JsonLd.tsx",
  "app/feed.xml/route.ts",
  "app/opengraph-image.tsx",
  "scripts/smoke-blog-fixture.mjs",
  "app/sitemap.ts",
  ".env.example",
]) {
  try {
    sources.set(relativePath, await readFile(join(root, relativePath), "utf8"));
  } catch {
    sources.set(relativePath, "");
  }
}

const requiredMarkers = new Map([
  ["lib/blog/types.ts", ["id", "slug", "featuredImage", "publishedAt", "seoTitle", "noindex"]],
  ["lib/blog/client.ts", ["BLOG_CONTENT_API_URL", "status", "published", "AbortController", "revalidate"]],
  ["lib/blog/repository.ts", ["getPublishedPosts", "getPublishedPostBySlug", "publishedAt", "noindex", "BLOG_SLUG_PATTERN"]],
  ["components/blog/BlogContent.tsx", ["react-markdown", "rehype-sanitize", "skipHtml"]],
  ["app/blog/page.tsx", ["getPublishedPosts", "generateMetadata", "BLOG_DESCRIPTION", "BlogProductCta"]],
  ["app/blog/[slug]/page.tsx", ["notFound()", "getPublishedPostBySlug", "BlogContent", "relatedPosts"]],
  ["components/seo/BlogPostingStructuredData.tsx", ["BlogPosting", "datePublished", "dateModified", "publisher", "mainEntityOfPage", "fa-IR"]],
  ["components/seo/JsonLd.tsx", ["serializeJsonLd", "application/ld+json", "\\u003c"]],
  ["app/feed.xml/route.ts", ["application/rss+xml", "escapeXml", "getPublishedPosts", "guid", "pubDate"]],
  ["app/opengraph-image.tsx", ["ImageResponse", "width: 1200", "height: 630"]],
  ["scripts/smoke-blog-fixture.mjs", ["BLOG_CONTENT_API_URL", "BlogPosting", "BreadcrumbList", "draft-post", "noindex-post"]],
  ["app/sitemap.ts", ["getPublishedPosts", "noindex", "blogRoutes", "postRoutes"]],
  [".env.example", ["BLOG_CONTENT_API_URL"]],
]);

for (const [relativePath, markers] of requiredMarkers) {
  const source = sources.get(relativePath) ?? "";
  for (const marker of markers) {
    if (!source.includes(marker)) {
      failures.push(`Missing Blog marker "${marker}" in ${relativePath}`);
    }
  }
}

for (const relativePath of [
  "components/blog/BlogContent.tsx",
  "lib/blog/repository.ts",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
]) {
  if ((sources.get(relativePath) ?? "").includes("dangerouslySetInnerHTML")) {
    failures.push(`Unsafe raw HTML rendering marker found in ${relativePath}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Blog source validation passed.");
}
