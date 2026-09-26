import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const routeFiles = [
  ["app/for-online-stores/page.tsx", "/for-online-stores"],
  ["app/how-it-works/page.tsx", "/how-it-works"],
  ["app/pricing/page.tsx", "/pricing"],
  ["app/faq/page.tsx", "/faq"],
];

for (const [relativePath, path] of routeFiles) {
  let source;

  try {
    source = await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Missing R3 route: ${relativePath}`);
    continue;
  }

  for (const marker of ["createPageMetadata", "MarketingPageShell", `path: \"${path}\"`]) {
    if (!source.includes(marker)) {
      failures.push(`Missing R3 marker "${marker}" in ${relativePath}`);
    }
  }

  if (!source.includes("<h1") && !source.includes("title=")) {
    failures.push(`Route does not define or delegate a clear page heading: ${relativePath}`);
  }
}

const readRequired = async (relativePath) => {
  try {
    return await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Missing R3 architecture file: ${relativePath}`);
    return "";
  }
};

const marketing = await readRequired("lib/marketing.ts");
const sitemap = await readRequired("app/sitemap.ts");
const header = await readRequired("components/marketing/PublicHeader.tsx");
const footer = await readRequired("components/marketing/PublicFooter.tsx");
const shell = await readRequired("components/marketing/MarketingPageShell.tsx");

for (const [source, marker] of [
  [marketing, "PUBLIC_INDEXABLE_ROUTES"],
  [marketing, "createPageMetadata"],
  [marketing, "FAQ_ITEMS"],
  [sitemap, "PUBLIC_INDEXABLE_ROUTES"],
  [sitemap, "publicUrl"],
  [header, "/how-it-works"],
  [header, "/pricing"],
  [footer, "/for-online-stores"],
  [footer, "/faq"],
  [shell, "Breadcrumbs"],
  [shell, "<h1"],
]) {
  if (!source.includes(marker)) {
    failures.push(`Missing R3 architecture marker "${marker}"`);
  }
}

for (const relativePath of ["app/privacy/page.tsx", "app/terms/page.tsx"]) {
  try {
    await access(join(root, relativePath));
    failures.push(`Unapproved legal route exists: ${relativePath}`);
  } catch {
    // Legal pages intentionally remain unpublished until approved copy exists.
  }
}

if (marketing.includes('"/privacy"') || marketing.includes('"/terms"')) {
  failures.push("Legal routes must not be included in the indexable route registry without approved copy.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R3 information architecture validation passed.");
}
