import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const requiredFiles = [
  "app/layout.tsx",
  "app/manifest.ts",
  "app/robots.ts",
  "app/sitemap.ts",
  "components/seo/StructuredData.tsx",
  "components/sections/AnimationRuntime.tsx",
  "components/sections/LoaderSection.tsx",
  "components/marketing/PublicHeader.tsx",
  "components/marketing/MobileNav.tsx",
  "components/marketing/PublicFooter.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "components/blog/BlogContent.tsx",
  "app/not-found.tsx",
  "lib/site.ts",
  "scripts/smoke-seo.mjs",
];

const requiredSnippets = new Map([
  ["app/layout.tsx", ["metadataBase", "alternates", "openGraph", "twitter", "robots"]],
  ["app/robots.ts", ["MetadataRoute.Robots", "sitemap", "allow"]],
  ["app/sitemap.ts", ["MetadataRoute.Sitemap", "PUBLIC_INDEXABLE_ROUTES", "publicUrl"]],
  ["components/seo/StructuredData.tsx", ["application/ld+json", '"@graph"', '"@type": "Organization"']],
  ["components/sections/OctabootExperience.tsx", ["aria-labelledby=\"journey-title\"", "scene--fallback", "AnimationRuntime", "id=\"faq\""]],
  ["components/sections/AnimationRuntime.tsx", ["\"use client\"", "MAX_CONCURRENT_DOWNLOADS", "prefers-reduced-motion: reduce", "image.onerror", "image.src = \"\""]],
  ["components/sections/LoaderSection.tsx", ["loaderStatus", "role=\"status\"", "rookhposh-mark.webp"]],
  ["components/marketing/PublicHeader.tsx", ["/how-it-works", "/for-online-stores", "/pricing", "/blog", "MobileNav", "dash.rookhposh.ir"]],
  ["components/marketing/MobileNav.tsx", ["\"use client\"", "aria-expanded", "aria-controls", "Escape", "hidden={!isOpen}"]],
  ["components/marketing/PublicFooter.tsx", ["/faq", "/for-online-stores", "/blog", "مقالات", "aria-disabled=\"true\"", "rookhposh-mark.webp"]],
  ["app/blog/page.tsx", ["getPublishedPosts", "generateMetadata", "BlogProductCta", "noindex"]],
  ["app/blog/[slug]/page.tsx", ["getPublishedPostBySlug", "notFound()", "BlogContent"]],
  ["components/blog/BlogContent.tsx", ["react-markdown", "rehype-sanitize", "skipHtml"]],
  ["app/not-found.tsx", ["/how-it-works", "/for-online-stores", "/pricing", "/blog", "/faq", "صفحه مورد نظر پیدا نشد"]],
  ["next.config.ts", ["poweredByHeader: false", "X-Content-Type-Options", "Referrer-Policy"]],
]);

const forbiddenSnippets = new Map([
  ["components/sections/OctabootExperience.tsx", ["\"use client\"", "<noscript>"]],
  ["components/marketing/PublicHeader.tsx", ["blog.rookhposh.ir"]],
  ["components/marketing/PublicFooter.tsx", ["blog.rookhposh.ir"]],
]);

const failures = [];

for (const relativePath of requiredFiles) {
  try {
    await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Missing required SEO file: ${relativePath}`);
  }
}

for (const [relativePath, snippets] of forbiddenSnippets) {
  let source;

  try {
    source = await readFile(join(root, relativePath), "utf8");
  } catch {
    continue;
  }

  for (const snippet of snippets) {
    if (source.includes(snippet)) {
      failures.push(`Unexpected SEO marker "${snippet}" in ${relativePath}`);
    }
  }
}

for (const [relativePath, snippets] of requiredSnippets) {
  let source;

  try {
    source = await readFile(join(root, relativePath), "utf8");
  } catch {
    continue;
  }

  for (const snippet of snippets) {
    if (!source.includes(snippet)) {
      failures.push(`Missing SEO marker "${snippet}" in ${relativePath}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("SEO source validation passed.");
}
