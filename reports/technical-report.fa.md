# گزارش فنی تحویل — اصلاح سئوی سورس‌کد رخ پوش

| مشخصه | مقدار |
| --- | --- |
| پروژه | رخ پوش / Rookhposh |
| نوع گزارش | گزارش فنی |
| زبان | فارسی |
| تاریخ جلالی | ۱۴۰۵-۰۷-۰۴ |
| تاریخ میلادی | 2026-09-26 |
| انتشار | `seo-source-fix-r4-verification-2026-09-26` |
| نسخه مخزن | در فضای کاری ارائه‌شده متادیتای Git موجود نبود |
| وضعیت تحویل | سورس کامل؛ اعتبارسنجی زنده مسدود |

## محدوده

بهبودهای سئوی سورس‌کد در صفحه فعلی Next.js 16 App Router پیاده‌سازی شد. داشبورد، وبلاگ، سرویس نماد اعتماد، backend، database، authentication و انتشار خارجی عمداً خارج از این مخزن و این محدوده هستند.

## فاز تکمیلی R1

در پیگیری R1، پایه فنی سئو دوباره اعتبارسنجی شد و بدون بازطراحی تجربه متحرک، یک مقصد FAQ محلی و واقعی به صفحه افزوده شد. در `next.config.ts` خروجی URL با اسلش پایانی فعال شد تا canonical رندرشده صفحه دقیقاً `https://rookhposh.ir/` باشد. اسکریپت `scripts/smoke-seo.mjs` سرور production را اجرا و metadata، canonical، robots، sitemap، JSON-LD، وضعیت مسیرها و 404 واقعی را بررسی می‌کند.

آیتم FAQ در footer اکنون به `#faq` اشاره می‌کند. قوانین استفاده و حریم خصوصی به دلیل ارائه نشدن متن و مسیر رسمی، غیرقابل‌کلیک باقی مانده‌اند؛ هیچ تعهد حقوقی یا مقصد گمراه‌کننده‌ای در ریشه وبلاگ ساخته نشد. لینک خارجی وبلاگ بدون تغییر حفظ شده، اما سلامت زنده آن و مسیرهای احتمالی حقوقی از محیط فعلی قابل بررسی نبود.

## معماری پایه

- Next.js 16.3.5 App Router، React 19 و TypeScript 5.9.3.
- یک مسیر عمومی `/`.
- کامپوننت کلاینت صفحه مسئول loader، تعداد 535 فریم WebP، canvas، GSAP و ScrollTrigger است.
- رابط فارسی راست‌به‌چپ شامل فصل‌های داستان، سه کارت قیمت، لینک‌های خارجی، نماد اعتماد، اطلاعات تماس و footer موجود است.
- API، database، authentication یا داده متغیر سروری محلی وجود ندارد.

## معماری پیاده‌سازی‌شده

| حوزه | پیاده‌سازی |
| --- | --- |
| هویت سایت | `lib/site.ts` مقدار `NEXT_PUBLIC_SITE_URL` را اعتبارسنجی می‌کند، فقط HTTP(S) را می‌پذیرد و در حالت نامعتبر به `https://rookhposh.ir` برمی‌گردد. |
| متادیتا | `app/layout.tsx` شامل metadata base، title template، description، canonical، نویسنده، Open Graph، Twitter، robots و application name است. |
| viewport | `app/layout.tsx` مقادیر تم تیره و color scheme را صادر می‌کند. |
| داده ساختاریافته | `components/seo/StructuredData.tsx` داده JSON-LD ثابت برای Organization، WebSite و Service تولید می‌کند. |
| خزنده | `app/robots.ts` دسترسی عمومی را مجاز و sitemap را معرفی می‌کند؛ `app/sitemap.ts` فقط صفحه canonical را فهرست می‌کند. |
| manifest | `app/manifest.ts` متادیتای نصب/اشتراک‌گذاری فارسی و راست‌به‌چپ دارد. |
| معناشناسی | برای story heading قابل‌دسترسی، alt تصاویر هویتی/نماد اعتماد و fallback بدون JavaScript افزوده شد. |
| امنیت | `next.config.ts` هدر `X-Powered-By` را حذف و هدرهای nosniff، referrer، frame و permissions را اضافه می‌کند. |
| تست رگرسیون | `scripts/validate-seo.mjs` بدون افزودن وابستگی، فایل‌ها و markerهای ضروری را بررسی می‌کند. |

## تغییرات وابستگی و پیکربندی

- هیچ وابستگی runtime یا development اضافه نشد.
- `.env.example` مقدار عمومی و غیرمحرمانه `NEXT_PUBLIC_SITE_URL` را مستند می‌کند.
- اسکریپت `npm run test:seo` به `package.json` اضافه شد.
- اسکریپت `npm run test:seo:smoke` به `package.json` اضافه شد.
- هدرهای پاسخ و حذف fingerprint فریم‌ورک در `next.config.ts` اضافه شد.
- خروجی URL با اسلش پایانی در `next.config.ts` برای canonical صفحه اصلی فعال شد.

## API، database و authentication

قابل اعمال نیست. سه مسیر metadata، endpoint تجاری محسوب نمی‌شوند و از قراردادهای فایل Next.js تولید می‌شوند. هیچ migration یا سیستم auth ساختگی ایجاد نشد.

## بررسی امنیت

- JSON-LD فقط از مقادیر کنترل‌شده مخزن استفاده می‌کند.
- تنظیم origin سایت پروتکل‌های غیر HTTP(S) و مقدارهای malformed را رد می‌کند.
- secret، token، credential، ورودی SQL/query، upload، redirect، SSRF یا سطح auth جدیدی اضافه نشد.
- درخواست‌های نماد اعتماد همچنان HTTPS و دارای `referrerPolicy="origin"` هستند.
- در محدوده مخزن، هیچ یافته حل‌نشده Critical یا High شناخته نشد.
- HSTS و TLS termination مسئولیت hosting است و برای subdomainهای خارج از کنترل مخزن hardcode نشد.

## تست‌ها و اعتبارسنجی

| فرمان/بررسی | نتیجه |
| --- | --- |
| `npm ci --ignore-scripts` | PASS؛ نصب 374 بسته |
| `npm audit --omit=dev` | PASS؛ گزارش 0 آسیب‌پذیری |
| `npm run test:seo` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS؛ مسیرهای metadata به‌صورت static تولید شدند |
| `npm run test:seo:smoke` | PASS؛ canonical، metadata، robots، sitemap، JSON-LD، وضعیت مسیرها و 404 واقعی در برابر `next start` بررسی شد |
| parse داده JSON-LD و بررسی نوع graph | PASS؛ Organization، WebSite و Service موجود هستند |
| دسترسی وبلاگ/مسیرهای حقوقی خارجی | NOT_RUN/UNAVAILABLE از محیط فعلی؛ هیچ تغییر DNS یا سروری انجام نشد |
| تست زنده Search Console/rich-result | NOT_RUN؛ نیازمند دسترسی خارجی |
| انتشار خارجی | NOT_PERFORMED؛ مقصد و اعتبارنامه ارائه نشد |

اولین build در sandbox پس از compile هنگام اجرای worker TypeScript با `spawn EPERM` متوقف شد. همان فرمان در محیط elevated تأییدشده با موفقیت انجام شد. این مورد محدودیت محیط اجرا بود و defect برنامه محسوب نشد.

شواهد اصلاح R1: اولین smoke test نشان داد Next.js canonical ریشه را بدون اسلش پایانی serializes می‌کند؛ `trailingSlash: true` اضافه و build/smoke با موفقیت تکرار شد. در بازبینی بعدی داده ساختاریافته، ادعای کشور پشتیبانی‌نشده حذف و lint، typecheck، build و smoke دوباره با موفقیت اجرا شدند.

## بررسی رگرسیون و یکپارچگی

فایل `project-integrity-manifest.md` مسیر، قابلیت‌ها، دارایی‌ها، integrationها و سطح اعتبارسنجی پایه را ثبت می‌کند. نسخه نهایی مسیر `/`، loader، همه فریم‌ها، داستان هفت‌مرحله‌ای، پلن‌ها، footer، اطلاعات تماس و لینک‌های dashboard/blog/trust را حفظ کرده است. هیچ تست یا عنصر محافظت‌شده‌ای حذف نشد.

## انتشار و rollback

دستورالعمل provider-neutral در `docs/11-deployment.md` و `docs/11-operations-runbook.md` قرار دارد. این تغییر migration دیتابیس ندارد و rollback آن با بازگردانی build immutable قبلی انجام می‌شود. انتشار واقعی انجام نشد.

## خلاصه مراحل

| مرحله | وضعیت | مدرک |
| --- | --- | --- |
| 01 تحلیل پروژه | PASS | brief، نیازمندی‌ها، فرض‌ها، ریسک‌ها و handoff پرامپت |
| 02 طراحی/UI | PASS | design system، معماری UI، قوانین معنایی/RTL و tokens |
| 03 معماری frontend | PASS | پیاده‌سازی، مرز metadata، build/type/lint |
| 04 معماری backend | PASS / NOT APPLICABLE | frontend-only مستند شد |
| 05 معماری database | PASS / NOT APPLICABLE | persistence وجود ندارد و ساخته نشد |
| 06 API integration | PASS / NOT APPLICABLE | فقط مسیرهای metadata |
| 07 authentication/authorization | PASS / NOT APPLICABLE | صفحه عمومی؛ dashboard خارجی است |
| 08 امنیت برنامه | PASS | validation origin، هدرها و بررسی JSON-LD |
| 09 تست نرم‌افزار | PASS | regression، lint، typecheck، build و smoke |
| 10 QA و debug | PASS | journeyها، defect log و بررسی integrity |
| 11 deployment/production | PASS | runbook provider-neutral؛ انتشار صادقانه انجام نشده |
| 12 بازبینی نهایی | PASS | دروازه مستقل source، build، امنیت و integrity |

## فهرست artifactها

- `app/layout.tsx`، `app/robots.ts`، `app/sitemap.ts`، `app/manifest.ts`
- `components/seo/StructuredData.tsx`، `components/sections/OctabootExperience.tsx`، `components/sections/AnimationRuntime.tsx`، `components/sections/LoaderSection.tsx`، `lib/site.ts`، `scripts/validate-seo.mjs`، `scripts/validate-r2.mjs`، `scripts/smoke-seo.mjs`
- `.env.example`، `README.md`، `project-state.json`، `release-manifest.json`
- `docs/r1-technical-seo-foundation.md`، `docs/r2-before-measurements.md`، `docs/r2-performance-rendering-refactor.md`
- `docs/r3-information-architecture.md`، `lib/marketing.ts`، کامپوننت‌های مشترک marketing، چهار فایل مسیر عمومی جدید، `scripts/validate-r3.mjs` و `scripts/smoke-r3.mjs`
- `docs/r4-production-seo-verification.md`، `scripts/smoke-r4.mjs` و فرمان اعتبارسنجی controlled production در `package.json`
- `docs/01-*` تا `docs/12-*` و `docs/rookhposh-seo-fix-prompts.md`
- `design/tokens.json` و `project-integrity-manifest.md`
- گزارش‌های دوزبانه مشتری و فنی در `reports/`

## منابع فنی

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [قرارداد robots در Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [قرارداد sitemap در Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [راهنمای داده ساختاریافته Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

## ارزیابی نهایی

تحویل در محدوده مخزن کامل و از نظر داخلی منسجم است. R4 بعداً تأیید کرد که host عمومی نسخه‌ای قدیمی‌تر از سورس تأییدشده را ارائه می‌کند؛ indexing، ranking و عملکرد میدانی همچنان تأیید نشده‌اند. بخش اعتبارسنجی Production در R4 جزئیات را ثبت می‌کند.

## پیگیری عملکرد، رندرینگ و مرز کلاینت در R2

### پیاده‌سازی تغییرکرده

- `components/sections/OctabootExperience.tsx` اکنون Server Component است و صفحه معنایی، قیمت‌ها، FAQ، footer، لینک‌های خارجی و fallback را در خود دارد.
- `components/sections/LoaderSection.tsx` در سمت سرور رندر می‌شود و وضعیت زنده loader را جداگانه ارائه می‌کند.
- `components/sections/AnimationRuntime.tsx` تنها Client Component متمرکز برای canvas، GSAP، ScrollTrigger، زمان‌بندی فریم‌ها و پاک‌سازی مرورگر است.
- runtime از یک مسیر کنترل‌شده ساخت تصویر، حداکثر چهار دانلود هم‌زمان، پنجره بحرانی ۱۸ فریمی، آستانه آمادگی چهار فریم settleشده، پیش‌بارگذاری نزدیک، رندر نزدیک‌ترین فریم موجود، تحمل خطای فریم و پاک‌سازی هنگام unmount استفاده می‌کند.
- فایل `public/images/rookhposh-mark.webp` با اندازه ۷۶۸×۵۱۲ و حجم ۸۰۲۲ بایت اضافه شد. فایل موجود `public/images/octaboot.png` با اندازه ۱۵۳۶×۱۰۲۴ حفظ شده است.
- اسکریپت `scripts/validate-r2.mjs` و smoke تولیدی، قرارداد source و fallback رندرشده در سرور را پوشش می‌دهند و `npm run test:r2` به `package.json` اضافه شده است.

### اندازه‌گیری و محدودیت‌ها

موجودی JavaScript پیش از R2 برابر ۶۹۹۴۶۶ بایت در ۹ chunk و پس از R2 برابر ۶۹۸۴۵۹ بایت در ۹ chunk است؛ کاهش ۱۰۰۷ بایت (۰٫۱۵٪). هر ۵۳۵ فریم با حجم ۱۱۴۲۳۹۳۸ بایت (۱۰٫۸۹ MiB) حفظ شده‌اند. در مشاهده تازه مرورگر محلی، در پنجره تقریبی ۱٫۲ ثانیه ۳۶ دارایی فریم دیده شد. مشاهده پایه پس از سه ثانیه ۲۳۱ فریم را نشان می‌داد. چون زمان‌ها و موجودی مرورگر، trace کنترل‌شده سطح پروتکل نیستند، این اعداد به‌عنوان مشاهده جهت‌دار و نه کاهش دقیق تعداد درخواست گزارش می‌شوند.

### اعتبارسنجی R2

| فرمان/بررسی | نتیجه |
| --- | --- |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS؛ بررسی ۵۳۵ فریم، مرز server/client، صف، fallback و نشانگرهای reduced-motion |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS پس از اجرای elevated؛ اجرای sandbox در مرحله worker با `spawn EPERM` متوقف شد |
| `npm run test:seo:smoke` | PASS؛ metadata، فایل‌های crawl، JSON-LD، نشانگرهای fallback و 404 واقعی |
| Browser smoke | PASS؛ محتوای معنایی اولیه، آمادگی loader، مشاهده ۳۶ فریم و تعامل FAQ |
| شبیه‌سازی مرورگر reduced-motion | NOT_RUN؛ در browser متصل در دسترس نبود |
| Lighthouse / Core Web Vitals میدانی | NOT_RUN؛ ابزار و داده production در دسترس نبود |

شواهد کامل R2 در [`docs/r2-performance-rendering-refactor.md`](../docs/r2-performance-rendering-refactor.md) و اندازه‌گیری پایه در [`docs/r2-before-measurements.md`](../docs/r2-before-measurements.md) قرار دارد.

## پیگیری معماری اطلاعات و لینک‌سازی داخلی R3

### تصمیم intent

سورس هم عبارت‌های پرو مجازی مصرف‌کننده و هم عبارت‌های تجاری مربوط به فروشگاه‌ها را دارد. تکرار اشاره به فروشگاه‌ها در description، کارت‌های تعرفه و CTAهای dashboard، پیشنهاد تمرکز B2B/فروشگاه‌ها را پشتیبانی می‌کند. H1 فعلی و عبارت‌های workflow مصرف‌کننده تا زمان تأیید مالک حفظ شده‌اند و جایگاه محصول به‌صورت پنهانی تغییر نکرده است.

### مسیرها و محتوا

چهار مسیر عمومی واقعی اضافه شد:

- `/for-online-stores/` — توضیح کاربرد برای فروشگاه‌ها بر اساس واقعیت‌های موجود درباره تصویر، انتخاب لباس، پیش‌نمایش، پلن‌ها و dashboard.
- `/how-it-works/` — هفت مرحله موجود workflow در قالب متن قابل index.
- `/pricing/` — پلن‌های آزمایشی، فصلی و سالانه موجود با مدت، اعتبار، قیمت و نرخ‌های ارائه‌شده.
- `/faq/` — چهار پرسش و پاسخ واقعی و موجود.

مسیرهای `/virtual-try-on/`، `/features/`، `/about/` و `/contact/` به دلیل نبود محتوای مستقل یا workflow تأییدشده ساخته نشدند. مسیرهای `/terms/` و `/privacy/` نیز به دلیل نبود متن و مسیر حقوقی تأییدشده منتشر نشدند. وبلاگ همچنان host خارجی است.

### معماری و metadata

`lib/marketing.ts` رجیستری مسیر/محتوا و helper مشترک metadata است. `PublicHeader`، `PublicFooter`، `MarketingPageShell`، `Breadcrumbs`، `StorySteps`، `PlanCards` و `FaqList` صفحات جدید را در سمت سرور و هماهنگ با سیستم بصری موجود نگه می‌دارند. هر صفحه metadata یکتا، canonical با trailing slash، فیلدهای Open Graph/Twitter، robots از نوع `index, follow`، یک H1 از shell مشترک، breadcrumb قابل مشاهده و `BreadcrumbList` JSON-LD متناظر دارد. sitemap دقیقاً پنج مسیر عمومی را منتشر می‌کند.

`FAQPage` JSON-LD اضافه نشد. FAQ واقعی و قابل مشاهده است، اما راهنمای فعلی Google نمایش rich result معمول FAQ را عمدتاً به سایت‌های معتبر دولتی و سلامت محدود می‌کند و هیچ نتیجه rich result تضمین نمی‌شود.

### اعتبارسنجی R3

| فرمان/بررسی | نتیجه |
| --- | --- |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS |
| `npm run test:r3` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS؛ ۱۰ مسیر static ساخته شد |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS؛ metadata، canonical، لینک داخلی، sitemap و 404 مسیرهای حقوقی |
| Browser route smoke | PASS؛ همه مسیرهای جدید، breadcrumb، title و تعامل FAQ |

تصمیم‌های موردنیاز مالک در [`docs/r3-information-architecture.md`](../docs/r3-information-architecture.md) ثبت شده‌اند.

## اعتبارسنجی سئوی Production در R4

### محدوده اعتبارسنجی

در R4 تغییر گسترده‌ای در قابلیت‌ها انجام نشد. مخزن دوباره build شد، smoke test محیط کنترل‌شده اجرا شد، host زنده در مرورگر متصل بررسی شد و تفاوت بین سورس تأییدشده و نسخه deployشده ثبت شد. Search Console، رتبه، indexing، Core Web Vitals میدانی، دریافت raw HTTP، شبیه‌سازی viewport موبایل و شبیه‌سازی reduced-motion فقط در صورت وجود شواهد گزارش شده‌اند.

### نتیجه محیط Production کنترل‌شده

| بررسی | نتیجه |
| --- | --- |
| `npm run build` | PASS؛ پس از خطای `spawn EPERM` در اجرای sandbox، اجرای مجاز با موفقیت پایان یافت |
| `npm run test:r4:smoke` | PASS؛ پنج مسیر عمومی، metadata، canonical، robots، sitemap، syntax داده ساختاریافته، لینک داخلی، RTL و 404 دقیق |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| رندر مرورگر کنترل‌شده | PASS؛ محتوای فارسی RTL، metadata، JSON-LD، canvas، لینک‌های داخلی و محتوای قابل خواندن |
| console مرورگر کنترل‌شده | PASS؛ پس از load هیچ error یا warning ثبت نشد |
| viewport موبایل | NOT_RUN؛ در مرورگر متصل در دسترس نبود |
| شبیه‌سازی reduced-motion | NOT_RUN؛ در مرورگر متصل در دسترس نبود |

### نتیجه Production زنده

host زنده نسخه‌ای قدیمی‌تر از مخزن تأییدشده را ارائه می‌کند. `http://rookhposh.ir/` به `https://rookhposh.ir/` هدایت شد و صفحه اصلی زنده محتوای فارسی قابل خواندن، قیمت‌ها، canvas و وضعیت loader تکمیل‌شده را نشان داد. بااین‌حال در homepage زنده، canonical، metadata مربوط به Open Graph/Twitter، robots و JSON-LD وجود نداشتند. مسیرهای `/robots.txt`، `/sitemap.xml`، `/for-online-stores`، `/how-it-works`، `/pricing` و `/faq` همگی صفحه 404 زنده را نشان دادند. footer deployشده نیز مقصدهای قدیمی ریشه وبلاگ را برای FAQ، Terms و Privacy حفظ کرده است.

host زنده dashboard با عنوان `رخ‌پوش` و لوگوی قابل مشاهده load شد. host وبلاگ با خطای DNS و `ERR_NAME_NOT_RESOLVED` مواجه شد. پس از load homepage زنده، هیچ error یا warning در console برگردانده نشد. HTTP client ترمینال به‌دلیل proxy تنظیم‌شده نتوانست به host عمومی متصل شود؛ بنابراین status پاسخ زنده و raw HTML به‌صورت مستقل capture نشدند.

| بررسی زنده | نتیجه |
| --- | --- |
| redirect به HTTPS | PASS |
| host/tag canonical | FAIL؛ host در دسترس است اما tag canonical وجود ندارد |
| HTTP 200 homepage | NOT_RUN؛ در مرورگر render شد اما status پروتکل در دسترس نبود |
| status واقعی 404 زنده | NOT_RUN؛ صفحه 404 render شد اما status پروتکل در دسترس نبود |
| `robots.txt` | FAIL؛ صفحه 404 زنده |
| `sitemap.xml` | FAIL؛ صفحه 404 زنده |
| Canonical/Open Graph/Twitter/JSON-LD | FAIL؛ در homepage رندرشده وجود نداشت |
| مسیرهای عمومی R3 | FAIL؛ هر چهار مسیر صفحه 404 نشان دادند |
| لینک‌های داخلی | FAIL؛ لینک‌های hash قدیمی و مقصدهای blog-root هنوز deploy شده‌اند |
| وبلاگ | FAIL؛ خطای DNS |
| dashboard | PASS؛ صفحه load شد |
| موبایل/reduced-motion | NOT_RUN؛ شبیه‌سازی در دسترس نبود |
| trace شبکه | NOT_RUN؛ trace سطح پروتکل در دسترس نبود |
| خطاهای console | PASS؛ هیچ error یا warning ثبت نشد |

### verdict انتشار

اعتبارسنجی سورس و محیط Production کنترل‌شده R1 تا R3 با موفقیت انجام شد. اعتبارسنجی سئوی Production زنده با وضعیت `FAIL_WITH_DEPLOYMENT_BLOCKERS` باقی می‌ماند تا build تأییدشده deploy شود، crawl/metadata/routeهای زنده با client سطح پروتکل دوباره بررسی شوند و مشکل DNS وبلاگ برطرف یا صریحاً توسط مالک/اپراتور پذیرفته شود. شواهد کامل در [`docs/r4-production-seo-verification.md`](../docs/r4-production-seo-verification.md) ثبت شده است.
