import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const readSource = async (relativePath) => {
  try {
    return await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Missing R2 source file: ${relativePath}`);
    return "";
  }
};

const runtime = await readSource("components/sections/AnimationRuntime.tsx");
const experience = await readSource("components/sections/OctabootExperience.tsx");
const loader = await readSource("components/sections/LoaderSection.tsx");
const header = await readSource("components/marketing/PublicHeader.tsx");
const footer = await readSource("components/marketing/PublicFooter.tsx");
const styles = await readSource("app/globals.css");

const requiredMarkers = [
  [runtime, "MAX_CONCURRENT_DOWNLOADS"],
  [runtime, "CRITICAL_FRAME_COUNT"],
  [runtime, "INITIAL_PREFETCH_COUNT"],
  [runtime, "enqueueRange"],
  [runtime, "image.fetchPriority"],
  [runtime, "prefers-reduced-motion: reduce"],
  [runtime, "image.onerror"],
  [runtime, "image.src = \"\""],
  [experience, "scene--fallback"],
  [experience, "<AnimationRuntime />"],
  [loader, "role=\"status\""],
  [header, "rookhposh-mark.webp"],
  [footer, "rookhposh-mark.webp"],
  [styles, ".scene--fallback"],
  [styles, ".loader.is-loading"],
  [styles, "prefers-reduced-motion: reduce"],
];

for (const [source, marker] of requiredMarkers) {
  if (!source.includes(marker)) {
    failures.push(`Missing R2 implementation marker: ${marker}`);
  }
}

if (experience.includes('"use client"') || experience.includes("<noscript>")) {
  failures.push("Static experience must remain a Server Component without SEO-only duplicate markup.");
}

if ((runtime.match(/new Image\(\)/g) ?? []).length !== 1) {
  failures.push("Animation runtime must use one controlled image creation path.");
}

const frameNames = await readdir(join(root, "public", "frames"));
const frameCount = frameNames.filter((name) => /^frame_\d{5}\.webp$/.test(name)).length;
if (frameCount !== 535) {
  failures.push(`Expected 535 animation frames, found ${frameCount}.`);
}

for (const relativePath of ["public/images/octaboot.png", "public/images/rookhposh-mark.webp"]) {
  try {
    await readFile(join(root, relativePath));
  } catch {
    failures.push(`Missing required brand asset: ${relativePath}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`R2 source validation passed (${frameCount} animation frames verified).`);
}
