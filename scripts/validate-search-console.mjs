import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

async function read(relativePath) {
  try {
    return await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Missing Search Console source file: ${relativePath}`);
    return "";
  }
}

const layout = await read("app/layout.tsx");
const site = await read("lib/site.ts");
const envExample = await read(".env.example");
const sitemap = await read("app/sitemap.ts");
const marketing = await read("lib/marketing.ts");
const setup = await read("docs/search-console-setup.md");

for (const [source, relativePath, markers] of [
  [layout, "app/layout.tsx", ["getGoogleSiteVerification", "verification"]],
  [site, "lib/site.ts", ["GOOGLE_SITE_VERIFICATION", "GOOGLE_SITE_VERIFICATION_PATTERN"]],
  [envExample, ".env.example", ["GOOGLE_SITE_VERIFICATION="]],
  [sitemap, "app/sitemap.ts", ["PUBLIC_INDEXABLE_ROUTES", "getPublishedPosts", "noindex"]],
  [setup, "docs/search-console-setup.md", ["https://rookhposh.ir/sitemap.xml", "GOOGLE_SITE_VERIFICATION", "NOT_AVAILABLE"]],
]) {
  for (const marker of markers) {
    if (!source.includes(marker)) {
      failures.push(`Missing Search Console marker "${marker}" in ${relativePath}`);
    }
  }
}

const envLine = envExample.match(/^GOOGLE_SITE_VERIFICATION=(.*)$/m);
if (!envLine || envLine[1].trim() !== "") {
  failures.push(".env.example must keep GOOGLE_SITE_VERIFICATION empty.");
}

for (const forbidden of ["dash.rookhposh.ir", "cms.rookhposh.ir", "/api/", "not-found"]) {
  if (sitemap.includes(forbidden)) {
    failures.push(`Sitemap source must not contain private or non-indexable marker: ${forbidden}`);
  }
}

if (marketing.includes("dash.rookhposh.ir") || marketing.includes("cms.rookhposh.ir")) {
  failures.push("The public marketing route registry must not contain dashboard or CMS hosts.");
}

if (!site.includes("const GOOGLE_SITE_VERIFICATION_PATTERN = /^[A-Za-z0-9_-]{8,256}$/;")) {
  failures.push("Google verification input must use the documented conservative token validation.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Search Console source validation passed; verification is optional and sitemap boundaries are documented.");
}
