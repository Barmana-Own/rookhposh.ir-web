import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const requiredFiles = [
  "docs/r6-page-intent-map.md",
  "docs/product-claims-needing-owner-verification.md",
  "app/for-online-stores/page.tsx",
  "app/how-it-works/page.tsx",
  "app/pricing/page.tsx",
  "app/faq/page.tsx",
  "scripts/smoke-r6.mjs",
];

for (const relativePath of requiredFiles) {
  try {
    await access(join(root, relativePath));
  } catch {
    failures.push(`Missing R6 file: ${relativePath}`);
  }
}

const readSource = async (relativePath) => {
  try {
    return await readFile(join(root, relativePath), "utf8");
  } catch {
    failures.push(`Unable to read R6 source: ${relativePath}`);
    return "";
  }
};

const sources = new Map(
  await Promise.all(
    [
      "app/layout.tsx",
      "app/for-online-stores/page.tsx",
      "app/how-it-works/page.tsx",
      "app/pricing/page.tsx",
      "app/faq/page.tsx",
      "components/sections/OctabootExperience.tsx",
      "components/marketing/PublicFooter.tsx",
      "lib/marketing.ts",
      "lib/site.ts",
    ].map(async (relativePath) => [relativePath, await readSource(relativePath)]),
  ),
);

const expectedMarkers = new Map([
  ["app/layout.tsx", ["رخ پوش | اتاق پرو دیجیتال لباس", "SITE_DESCRIPTION"]],
  [
    "app/for-online-stores/page.tsx",
    [
      'title: "راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین"',
      'title="راهکار پرو مجازی برای فروشگاه‌های آنلاین"',
      'href="/blog"',
    ],
  ],
  [
    "app/how-it-works/page.tsx",
    [
      'title: "مراحل استفاده از پرو مجازی لباس"',
      'title="مراحل پرو مجازی، از تصویر تا انتخاب"',
      'href="/blog"',
    ],
  ],
  [
    "app/pricing/page.tsx",
    [
      'title: "انتخاب پلن رخ پوش برای فروشگاه‌ها"',
      'title="تعرفه و پلن‌های رخ پوش"',
      'href="/blog"',
    ],
  ],
  [
    "app/faq/page.tsx",
    [
      'title: "پاسخ پرسش‌های رایج درباره رخ پوش"',
      'title="پاسخ به پرسش‌های رایج"',
      'href="/blog"',
    ],
  ],
  ["components/sections/OctabootExperience.tsx", ["آماده‌سازی تصویر", "لباس روی"]],
  ["components/marketing/PublicFooter.tsx", ["تجربه پرو مجازی لباس برای دیدن نتیجه انتخاب روی تصویر."]],
  ["lib/marketing.ts", ["انتخاب متعادل", "مدل‌ها و رنگ‌های مختلف"]],
]);

for (const [relativePath, markers] of expectedMarkers) {
  const source = sources.get(relativePath) ?? "";
  for (const marker of markers) {
    if (!source.includes(marker)) {
      failures.push(`Missing R6 marker "${marker}" in ${relativePath}`);
    }
  }
}

const forbiddenClaims = [
  "رنگ و اندازه را دقیق‌تر کنید",
  "متناسب با تصویر شما",
  "مقایسه مدل، رنگ و تناسب",
  "محبوب‌ترین",
  "کم‌ریسک",
  "اطمینان واقعی",
];

for (const [relativePath, source] of sources) {
  for (const claim of forbiddenClaims) {
    if (source.includes(claim)) {
      failures.push(`Unsupported or superseded claim remains in ${relativePath}: ${claim}`);
    }
  }
}

const pricingValues = [
  "۹۰۰,۰۰۰",
  "۱,۲۰۰",
  "۷۵۰ تومان",
  "۳,۲۰۰,۰۰۰",
  "۵,۰۰۰",
  "۶۴۰ تومان",
  "۸,۴۰۰,۰۰۰",
  "۱۴,۰۰۰",
  "۶۰۰ تومان",
];

for (const relativePath of ["lib/marketing.ts", "components/sections/OctabootExperience.tsx"]) {
  const source = sources.get(relativePath) ?? "";
  for (const value of pricingValues) {
    if (!source.includes(value)) {
      failures.push(`Pricing value changed or missing in ${relativePath}: ${value}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R6 page-intent and product-claims validation passed.");
}
