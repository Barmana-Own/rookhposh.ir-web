const origin = process.env.SEO_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";

const publicRoutes = [
  ["/", "رخ پوش | اتاق پرو دیجیتال لباس", "پرو مجازی را پیش از خرید امتحان کنید"],
  [
    "/for-online-stores",
    "راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین | رخ پوش",
    "راهکار پرو مجازی برای فروشگاه‌های آنلاین",
  ],
  [
    "/how-it-works",
    "مراحل استفاده از پرو مجازی لباس | رخ پوش",
    "مراحل پرو مجازی، از تصویر تا انتخاب",
  ],
  ["/pricing", "انتخاب پلن رخ پوش برای فروشگاه‌ها | رخ پوش", "تعرفه و پلن‌های رخ پوش"],
  ["/faq", "پاسخ پرسش‌های رایج درباره رخ پوش | رخ پوش", "پاسخ به پرسش‌های رایج"],
];

const failures = [];
const titles = new Set();
const pages = new Map();

for (const [pathname, expectedTitle, expectedH1] of publicRoutes) {
  const response = await fetch(new URL(pathname, origin));
  const html = await response.text();

  if (response.status !== 200) {
    failures.push(`${pathname}: expected 200, received ${response.status}`);
  }

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1Text = h1Matches[0]?.[1]
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const description = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  )?.[1];
  const canonical = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  )?.[1];

  if (title !== expectedTitle) {
    failures.push(`${pathname}: expected title "${expectedTitle}", received "${title ?? "missing"}"`);
  }

  if (titles.has(title)) {
    failures.push(`${pathname}: title is duplicated across the marketing route set`);
  }
  titles.add(title);

  if (h1Matches.length !== 1 || !h1Text?.includes(expectedH1)) {
    failures.push(`${pathname}: expected exactly one H1 containing "${expectedH1}"`);
  }

  if (!description) {
    failures.push(`${pathname}: missing description`);
  }

  const expectedCanonical = new URL(pathname === "/" ? "/" : `${pathname}/`, "https://rookhposh.ir").toString();
  if (canonical !== expectedCanonical) {
    failures.push(`${pathname}: canonical is not ${expectedCanonical}`);
  }

  pages.set(pathname, html);
}

for (const [pathname, html] of pages) {
  if (!html.includes('href="/blog/"')) {
    failures.push(`${pathname}: missing Blog discovery link`);
  }

  for (const phrase of [
    "رنگ و اندازه را دقیق‌تر کنید",
    "متناسب با تصویر شما",
    "مقایسه مدل، رنگ و تناسب",
    "محبوب‌ترین",
    "کم‌ریسک",
    "اطمینان واقعی",
  ]) {
    if (html.includes(phrase)) {
      failures.push(`${pathname}: superseded or unsupported wording is still rendered: ${phrase}`);
    }
  }
}

const pricingHtml = pages.get("/pricing") ?? "";
for (const value of ["۹۰۰,۰۰۰", "۳,۲۰۰,۰۰۰", "۸,۴۰۰,۰۰۰", "۷۵۰ تومان", "۶۴۰ تومان", "۶۰۰ تومان"]) {
  if (!pricingHtml.includes(value)) {
    failures.push(`/pricing: pricing value missing: ${value}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R6 page-intent production smoke passed.");
}
