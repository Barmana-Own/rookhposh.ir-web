import { createHash } from "node:crypto";
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
const nextConfig = await readSource("next.config.ts");

const requiredMarkers = [
  [runtime, "MAX_CONCURRENT_DOWNLOADS"],
  [runtime, 'const FRAME_ROOT = "/frames/v1";'],
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
  [nextConfig, "public, max-age=31536000, immutable"],
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

const frameDirectory = join(root, "public", "frames", "v1");
let frameNames = [];
try {
  frameNames = await readdir(frameDirectory);
} catch {
  failures.push("Missing versioned animation frame directory: public/frames/v1");
}

const frameFiles = frameNames
  .filter((name) => /^frame_\d{5}\.webp$/.test(name))
  .sort();
const frameCount = frameFiles.length;
if (frameCount !== 535) {
  failures.push(`Expected 535 animation frames, found ${frameCount}.`);
}

const expectedFrameNames = Array.from(
  { length: 535 },
  (_, index) => `frame_${String(index + 1).padStart(5, "0")}.webp`,
);
if (
  frameFiles.length !== expectedFrameNames.length ||
  frameFiles.some((name, index) => name !== expectedFrameNames[index])
) {
  failures.push("Versioned animation frames must be contiguous from frame_00001.webp through frame_00535.webp.");
}

let legacyFrameCount = 0;
try {
  const legacyFrameNames = await readdir(join(root, "public", "frames"));
  legacyFrameCount = legacyFrameNames.filter((name) => /^frame_\d{5}\.webp$/.test(name)).length;
} catch {
  failures.push("Missing public/frames directory.");
}
if (legacyFrameCount !== 0) {
  failures.push(`Unversioned public/frames directory still contains ${legacyFrameCount} frame files.`);
}

if (frameFiles.length === 535) {
  const frameEntries = [];
  for (const name of frameFiles) {
    const contents = await readFile(join(frameDirectory, name));
    const hash = createHash("sha256").update(contents).digest("hex");
    frameEntries.push(`${name}:${hash}`);
  }
  const sequenceSignature = createHash("sha256")
    .update(frameEntries.join("\n"), "utf8")
    .digest("hex");
  const expectedSequenceSignature =
    "739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86";
  if (sequenceSignature !== expectedSequenceSignature) {
    failures.push(
      `Animation frame content signature changed: expected ${expectedSequenceSignature}, found ${sequenceSignature}.`,
    );
  }
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
  console.log(`R2 source validation passed (${frameCount} versioned animation frames and content signature verified).`);
}
