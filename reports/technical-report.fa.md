# گزارش فنی تحویل — زیرساخت Blog داخلی Prompt 02

| مشخصه | مقدار |
| --- | --- |
| پروژه | رخ پوش / Rookhposh |
| نوع گزارش | گزارش فنی |
| زبان | فارسی |
| تاریخ جلالی | ۱۴۰۵-۰۷-۰۶ |
| تاریخ میلادی | 2026-09-28 |
| revision سورس | `d635b02e6754a35c1fdbfed32eb8c41b052e3177` |
| branch | `feature/r5-prompt-01-navigation` |
| وضعیت تحویل | IMPLEMENTED؛ انتشار خارجی انجام نشده است |

## محدوده و معماری

Prompt 02 مقصد Blog موقت Prompt 01 را با presentation اول‌شخص و server-rendered جایگزین می‌کند، در حالی که repository همچنان frontend-only باقی می‌ماند. authoring مقاله، storage، editor و authentication خارج از این application هستند. مرز اختیاری خواندن محتوای عمومی با `BLOG_CONTENT_API_URL` انتخاب می‌شود.

## فهرست دقیق فایل‌های تغییرکرده

### routeها و componentهای Blog

| فایل | تغییر |
| --- | --- |
| `app/blog/page.tsx` | فهرست server-rendered مقاله، metadata وابسته به provider، empty state واقعی، رفتار noindex بدون post قابل index و CTA محصول. |
| `app/blog/[slug]/page.tsx` | route مقاله server-rendered، metadata، canonical، جزئیات مقاله، breadcrumb، محتوای مرتبط، CTA و `notFound()` برای محتوای ناموجود/منتشرنشده. |
| `app/sitemap.ts` | افزودن URLهای Blog فقط برای postهای منتشرشده، معتبر و قابل index. |
| `components/blog/BlogCard.tsx` | کارت مقاله با لینک داخلی slug، دسته/تاریخ، عنوان، خلاصه و تصویر اختیاری. |
| `components/blog/BlogContent.tsx` | رندر Markdown در سرور با `react-markdown`، `rehype-sanitize`، غیرفعال‌سازی HTML خام و حذف تصویرهای Markdown. |
| `components/blog/BlogDate.tsx` | فرمت تاریخ فارسی انتشار/به‌روزرسانی با `<time>` معنایی. |
| `components/blog/BlogImage.tsx` | رندر تصویر featured با alt، بارگذاری lazy/eager و جعبه layout scoped. |
| `components/blog/BlogProductCta.tsx` | CTA محدود و factual به `/for-online-stores`. |
| `app/globals.css` | فقط styleهای scoped فهرست/کارت/مقاله/CTA/متن/ریسپانسیو Blog. |

### مرز محتوا و پیکربندی

| فایل | تغییر |
| --- | --- |
| `lib/blog/types.ts` | قرارداد typed برای post، تصویر و نویسنده عمومی Blog. |
| `lib/blog/client.ts` | client اختیاری HTTP(S) با query انتشار، بدون auth header، timeout چهارثانیه‌ای، محدودیت اندازه پاسخ، fallback خطای JSON و revalidation tag. |
| `lib/blog/repository.ts` | اعتبارسنجی runtime payload، فیلتر published/future-date، اعتبارسنجی slug، کنترل URLهای asset/canonical، مرتب‌سازی و حذف تکرار. |
| `.env.example` | مستندسازی `BLOG_CONTENT_API_URL` اختیاری و server-only. |
| `package.json` | افزودن dependencyهای دقیق `react-markdown`/`rehype-sanitize` و scriptهای test سورس/HTTP Blog. |
| `package-lock.json` | قفل‌کردن dependency graph مربوط به Markdown و sanitization. |

### تست و مستندات/وضعیت

| فایل | تغییر |
| --- | --- |
| `scripts/validate-blog.mjs` | بررسی contract سورس برای routeها، فیلدهای provider، markerهای sanitizer و نبود raw HTML insertion. |
| `scripts/smoke-blog.mjs` | smoke تولیدی بدون CMS برای empty state، noindex، حذف از sitemap و 404 واقعی slug ناموجود. |
| `scripts/validate-seo.mjs` | به‌روزرسانی contract موجود SEO برای Blog داخلی. |
| `scripts/validate-r3.mjs` | به‌روزرسانی contract موجود R3 برای route مقاله پویا و markerهای provider. |
| `docs/blog-content-provider.md` | contract provider، رفتار خطا، قواعد انتشار و مستندات safety محتوا. |
| `README.md` | به‌روزرسانی setup، validation، route و مرز مالکیت Blog. |
| `docs/01-project-brief.md` | تفکیک presentation داخلی از authoring خارجی در مرز محصول/Integration. |
| `docs/r3-information-architecture.md` | افزودن به‌روزرسانی Prompt 02 برای IA و routeها. |
| `docs/10-known-issues.md` | به‌روزرسانی ریسک‌های provider و availability محتوا. |
| `docs/12-final-review.md` | افزودن final review افزایشی Prompt 02 و شواهد آن. |
| `project-integrity-manifest.md` | افزودن مقایسه یکپارچگی و حفظ Blog. |
| `project-state.json` | افزودن state، artifact، تصمیم، ریسک و validation Prompt 02. |
| `release-manifest.json` | به‌روزرسانی release identifier، layout، commandها، artifactها و validation. |

### artifactهای گزارش

| فایل | تغییر |
| --- | --- |
| `reports/customer-report.en.md` | گزارش تحویل انگلیسی برای مشتری درباره Prompt 02. |
| `reports/customer-report.fa.md` | گزارش تحویل فارسی برای مشتری درباره Prompt 02. |
| `reports/technical-report.en.md` | گزارش فنی انگلیسی، شواهد و فهرست دقیق فایل‌های Prompt 02. |
| `reports/technical-report.fa.md` | گزارش فنی فارسی، شواهد و فهرست دقیق فایل‌های Prompt 02. |

## رفتار provider

client نسبت به base URL پیکربندی‌شده درخواست‌های `/posts?status=published&limit=100` و `/posts/{slug}?status=published` می‌فرستد. configuration ناموجود/نامعتبر، timeout، پاسخ non-2xx، JSON نامعتبر، پاسخ بزرگ‌تر از حد، یا record نامعتبر به‌جای crash شدن build/runtime به نبود post عمومی تبدیل می‌شود. recordهایی که صراحتاً منتشرنشده یا دارای تاریخ آینده باشند رد می‌شوند. endpoint عمومی باید محتوای از قبل منتشرشده را ارائه کند و repository در صورت وجود فیلدهای status فیلتر اضافه اعمال می‌کند.

canonical ارائه‌شده از content فقط وقتی پذیرفته می‌شود که به origin سایت اصلی resolve شود. URL asset باید relative یا HTTPS باشد. slug با حروف/اعداد Unicode و ادامه `_`/`-` محدود شده است. تاریخ‌ها به ISO string نرمال می‌شوند.

## رفتار render و index

فهرست و route مقاله Blog، pageهای پویا و server-rendered در App Router هستند. بدون CMS URL، `/blog/` با status 200 و empty state فارسی مفید، `noindex, follow` و بدون entry در sitemap پاسخ می‌دهد. با محتوای معتبر published، index در صورت وجود post قابل index واجد شرایط index است و فقط articleهایی که `noindex: false` دارند وارد sitemap می‌شوند. slug ناموجود/منتشرنشده/نامعتبر با `notFound()` به 404 واقعی مشترک می‌رسد.

بدنه مقاله با `react-markdown`، `rehype-sanitize` و `skipHtml` رندر می‌شود. برای محتوای CMS از `dangerouslySetInnerHTML` خام استفاده نشده است و تصویرهای Markdown برای تکیه بر field معتبر featured image حذف می‌شوند.

## بررسی حفظ و امنیت

- `components/sections/AnimationRuntime.tsx`: بدون تغییر.
- `public/frames`: بدون تغییر؛ هر ۵۳۵ فایل WebP باقی است.
- timelineهای GSAP/ScrollTrigger، رفتار canvas، الگوریتم بارگذاری فریم، ترکیب hero، قیمت‌ها، style برند و URL dashboard: بدون تغییر.
- database محلی، authentication، editor، write API، مقاله جعلی یا production mock اضافه نشده است.
- برای provider عمومی secret یا authorization header ارسال نمی‌شود.
- ورودی provider محدود و پیش از render اعتبارسنجی می‌شود؛ HTML خام غیرفعال و Markdown sanitize می‌شود.
- مشکل امنیتی Critical یا High ناشی از implementation تغییرکرده مشاهده نشد.

## شواهد اعتبارسنجی

| فرمان / بررسی | نتیجه |
| --- | --- |
| `npm ci` | PASS؛ نصب کامل و گزارش ۰ آسیب‌پذیری توسط npm |
| `npm audit --omit=dev` | PASS؛ ۰ آسیب‌پذیری |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS؛ بررسی ۵۳۵ فریم |
| `npm run test:r3` | PASS |
| `npm run test:blog` | PASS |
| `npm run build` | PASS؛ routeهای `/blog` و `/blog/[slug]` پویا و routeهای قبلی نیز تولید شدند |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| `npm run test:r4:smoke` | PASS |
| `npm run test:blog:smoke` | PASS |
| smoke integration با CMS آزمایشی | PASS؛ post منتشرشده رندر شد، draft به 404 رسید و payload شامل `<script>` در خروجی نیامد |
| بررسی Git diff | PASS؛ خطای whitespace وجود نداشت |
| انتشار خارجی | NOT_PERFORMED |

اولین اجرای install/build در sandbox با محدودیت process/file-lock ویندوزی `spawn EPERM` مواجه شد. اجرای مجاز مجدد `npm ci` و `npm run build` با موفقیت پایان یافت؛ این مورد محدودیت محیط و نه خطای سورس طبقه‌بندی شد.

## انتشار و rollback

Git push، تغییر DNS، تغییر dashboard یا انتشار Production انجام نشد. فقط پس از تنظیم endpoint عمومی CMS تأییدشده deploy و سپس بررسی زنده SEO/Blog تکرار شود. checkpoint قبلی `c3552cb` و revision پیاده‌سازی Prompt 02 برابر است با `d635b02e6754a35c1fdbfed32eb8c41b052e3177`.
