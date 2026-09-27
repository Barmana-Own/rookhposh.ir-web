# گزارش فنی تحویل — پوسته ناوبری Prompt 01

| مشخصه | مقدار |
| --- | --- |
| پروژه | رخ پوش / Rookhposh |
| نوع گزارش | گزارش فنی |
| زبان | فارسی |
| تاریخ جلالی | ۱۴۰۵-۰۷-۰۵ |
| تاریخ میلادی | 2026-09-27 |
| revision مخزن | `f19b774e883043d7cc6d8707298a96ba95003765` |
| branch | `feature/r5-prompt-01-navigation` |
| وضعیت تحویل | IMPLEMENTED؛ انتشار خارجی انجام نشده است |

## محدوده

Prompt 01 به‌عنوان تغییری متمرکز در header، ناوبری موبایل، ورودی Blog، 404 سفارشی و پوسته معنایی پیاده‌سازی شد. این تغییر authentication، قابلیت CMS، محتوای حقوقی، کد dashboard یا زیرساخت خارجی اضافه نمی‌کند.

## تغییرات دقیق سورس

| فایل | تغییر |
| --- | --- |
| `components/marketing/PublicHeader.tsx` | لینک خارجی Blog با ناوبری داخلی جایگزین شد؛ لینک برای فروشگاه‌ها اضافه شد و URL دقیق CTA داشبورد حفظ شد. داده ناوبری با کامپوننت موبایل به‌اشتراک گذاشته می‌شود. |
| `components/marketing/MobileNav.tsx` | منوی disclosure کوچک و client-only با وضعیت قابل‌دسترسی دکمه، بستن با Escape، بازگردانی focus و لینک‌های route/dashboard اضافه شد. |
| `components/marketing/PublicFooter.tsx` | لینک مقاله به `/blog` با برچسب فارسی `مقالات` تغییر کرد. |
| `components/sections/OctabootExperience.tsx` | `PublicFooter` بدون تغییر markup انیمیشن یا قیمت‌ها، از بخش تعرفه‌ها و `<main>` خارج شد. |
| `app/blog/page.tsx` | مقصد موقت server-rendered برای Blog با canonical خود صفحه، `noindex` و بدون ورودی sitemap اضافه شد. جایگزینی آن در Prompt 02 به‌صراحت مشخص شده است. |
| `app/not-found.tsx` | صفحه 404 فارسی و هم‌راستا با برند با شش مقصد داخلی لازم اضافه شد. |
| `app/globals.css` | فقط قواعد disclosure موبایل، focus، چیدمان لینک‌های 404 و breakpoint اضافه شد. token برند، typography، قیمت‌ها و قواعد انیمیشن تغییر نکردند. |
| `scripts/validate-seo.mjs` | markerهای ناوبری جدید، دسترسی موبایل، Blog موقت و 404 سفارشی به‌روزرسانی شد. |
| `scripts/validate-r3.mjs` | assertionهای سورس Prompt 01 و nesting معنایی اضافه شد. |
| `scripts/smoke-seo.mjs` | assertionهای محتوای 404 سفارشی اضافه شد. |
| `scripts/smoke-r3.mjs` و `scripts/smoke-r4.mjs` | بررسی لینک‌های ناوبری، CTA داشبورد، حذف لینک خارجی Blog و مقصد موقت Blog اضافه شد. |

## تصمیم ناوبری و دسترسی‌پذیری

چیدمان دسکتاپ header فعلی حفظ شده و چهار مسیر داخلی به‌علاوه CTA خارجی dashboard نمایش داده می‌شود. در عرض‌های حداکثر ۹۰۰ پیکسل، گروه لینک دسکتاپ مخفی و دکمه منوی کوچک نمایش داده می‌شود. دکمه `aria-expanded`، `aria-controls` و برچسب فارسی قابل‌دسترسی دارد. پنل هنگام بسته‌بودن از رفتار native `hidden` استفاده می‌کند، هنگام بازبودن با صفحه‌کلید قابل‌دسترسی است، با Escape بسته می‌شود و focus را به toggle برمی‌گرداند. هیچ library انیمیشن یا وابستگی runtime جدیدی اضافه نشد.

## رفتار مسیر و index

`/blog/` برای جلوگیری از broken link با status 200 پاسخ می‌دهد، اما metadata آن `noindex, follow` است، در `PUBLIC_INDEXABLE_ROUTES` وجود ندارد و smoke test نبودن آن در `sitemap.xml` را بررسی می‌کند. جایگزینی آن با محتوای تأییدشده Blog/CMS در Prompt 02 انجام می‌شود. `app/not-found.tsx` برای مسیرهای ناموجود رندر می‌شود و smoke تولیدی status واقعی HTTP 404 را تأیید می‌کند.

## اصلاح معنایی

پیش از این `PublicFooter` درون بخش تعرفه‌ها و `<main>` رندر می‌شد. اکنون `<main>` پیش از footer سطح سایت بسته می‌شود. styleهای footer مشترک باقی مانده‌اند و مرز runtime انیمیشن دست‌نخورده است.

## بررسی حفظ یکپارچگی

- `components/sections/AnimationRuntime.tsx`: بدون تغییر.
- `public/frames`: بدون تغییر؛ هر ۵۳۵ فایل WebP باقی است.
- timelineهای GSAP/ScrollTrigger، منطق canvas، الگوریتم فریم، hero، قیمت‌ها، رنگ‌ها، typography و URLهای dashboard: بدون تغییر.
- هیچ dependency جدیدی اضافه یا upgrade نشد.
- هیچ secret، credential، authentication، ورودی کاربر، database path یا سطح انتشار خارجی جدیدی اضافه نشد.

## شواهد اعتبارسنجی

| فرمان / بررسی | نتیجه |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS؛ بررسی ۵۳۵ فریم |
| `npm run test:r3` | PASS |
| `npm run build` در sandbox | ENVIRONMENT FAILURE؛ worker TypeScript Next پس از compile موفق با `spawn EPERM` متوقف شد |
| `npm run build` در اجرای مجاز مجدد | PASS؛ مسیرهای `/blog` و `/_not-found` به‌صورت static ساخته شدند |
| `npm run test:seo:smoke` | PASS؛ metadata homepage، مسیرهای crawl، status/content 404 سفارشی |
| `npm run test:r3:smoke` | PASS؛ routeهای عمومی، noindex بودن `/blog`، حذف از sitemap و لینک‌های ناوبری |
| `npm run test:r4:smoke` | PASS؛ مجموعه regression سئوی Production کنترل‌شده |

خطای اولیه build به‌عنوان محدودیت محیط/سطح دسترسی process طبقه‌بندی شد، زیرا همان فرمان در اجرای مجاز مجدد با موفقیت پایان یافت. پس از اجرای مجدد، خطای source باقی نماند.

## بررسی امنیت

این تغییر فقط state محلی ناوبری را اضافه می‌کند. کامپوننت client فقط هنگام بازبودن منو یک listener برای Escape ثبت و هنگام cleanup حذف می‌کند. مقصد لینک‌ها ثابت و کنترل‌شده توسط سورس هستند؛ URL یا HTML تحت کنترل کاربر، storage، token، upload، API یا عملیات privileged اضافه نشده است. URL dashboard خارجی بدون تغییر باقی مانده است. مشکل امنیتی بااهمیتی از این پیاده‌سازی ایجاد یا حل‌نشده باقی نمانده است.

## انتشار و بازگشت

Git push، تغییر DNS، تغییر dashboard یا انتشار خارجی انجام نشد. پیاده‌سازی روی `feature/r5-prompt-01-navigation` commit شده است؛ در صورت نیاز، rollback به commit پایه Prompt 00 یعنی `8e94c24` انجام می‌شود.
