# گزارش فنی تحویل — برنامه خوشه محتوایی SEO در Prompt 11

| مشخصه | مقدار |
| --- | --- |
| پروژه | application عمومی بازاریابی `rookhposh.ir` |
| نوع گزارش | گزارش فنی |
| زبان | فارسی |
| تاریخ شمسی | ۱۴۰۵/۰۷/۰۸ |
| تاریخ میلادی | ۲۰۲۶/۰۹/۳۰ |
| revision repository | `d0a78f2` به‌همراه تغییرات working tree |
| محدوده | آمادگی Search Console، کش نسخه‌دار انیمیشن، شواهد regression نهایی و برنامه‌ریزی محتوای فارسی مبتنی بر شواهد |
| وضعیت | SOURCE_QA_COMPLETE؛ CONTENT_PLAN_ONLY؛ EXTERNAL_DEPLOYMENT_PENDING |

## معماری و مرز اعتماد

سایت عمومی همچنان یک application مستقل Next.js 16 App Router است و کد CMS، database، authentication، session، editor، routeهای خصوصی یا API نوشتن را وارد نمی‌کند. `cms.rookhposh.ir` یک application مستقل Next.js/Prisma/Auth.js است و `dash.rookhposh.ir` خارج از هر دو repository باقی می‌ماند.

## تغییرات سایت عمومی

| بخش | پیاده‌سازی |
| --- | --- |
| `lib/blog/client.ts` | تشخیص server-only آدرس CMS، اجازه HTTP فقط برای loopback، timeout چهارثانیه‌ای، سقف پاسخ ۵ مگابایت، cache tag و revalidation داخلی Next. |
| `lib/blog/repository.ts` | projection رکوردهای منتشرشده، سقف طول فیلدها، بررسی status/date/publication، اعتبارسنجی canonical روی origin اصلی، resolve امن media و نرمال‌سازی category/author/tag و Tiptap JSON. |
| `lib/blog/rich-document.ts` | parser allowlist برای heading، فهرست، لینک، mark، blockquote، code block، تصویر و hard break. |
| `components/blog/BlogContent.tsx` | renderer بازگشتی server برای Tiptap معتبر؛ مسیر legacy Markdown با `rehype-sanitize`، `skipHtml` و حذف تصویرهای Markdown باقی مانده است. |
| `app/api/revalidate/blog/route.ts` | POST dynamic با محدودیت stream بدنه ۱۰۰ کیلوبایت، بررسی timestamp/event ID، HMAC-SHA256، اعتبارسنجی slug/status، پاسخ‌های ۴۰۱/۴۱۳/۵۰۳ و invalidation با `revalidateTag`/`revalidatePath`. |
| `scripts/smoke-blog-fixture.mjs` | fixture قابل تغییر برای بررسی انتشار، رد امضای نامعتبر، حذف پس از unpublish از مقاله/index/sitemap/feed و مشاهده پس از publish مجدد. |
| `scripts/smoke-revalidation.mjs` | smoke احراز هویت برای server زنده. |
| `.env.example` و مستندات | تنظیمات server-only و قرارداد عملیاتی CMS/revalidation. |

## تغییرات CMS مورد استفاده در اتصال

| بخش | پیاده‌سازی |
| --- | --- |
| `src/app/api/public/posts` | API فقط منتشرشده با page/limit محدود، شرط `publishedAt <= now`، projection عمومی، Tiptap نرمال‌شده و پاسخ `private, no-store` برای جلوگیری از ماندن وضعیت انتشار در intermediary. |
| `src/lib/public-post.ts` | projection امن بدنه و media عمومی. |
| `src/lib/public-revalidation.ts` | فرستنده HMAC-SHA256 برای رویداد `post.changed`، event ID تصادفی، timeout سه‌ثانیه‌ای، الزام HTTPS در production و خطای non-fatal. |
| routeهای mutation مقاله | ارسال event پس از create/update/publish/unpublish/archive/تغییر slug و ارسال previous slug هنگام تغییر. |
| editor/media/preview Prompt 06 | serialization امن Tiptap، بررسی signature تصویر و optimization، storage abstraction، alt text، audit/revision و preview کوتاه‌مدت noindex فعال باقی مانده‌اند. |
| `package.json`/lockfile | وابستگی‌های pinned و override `fast-uri@3.1.7` پس از شناسایی advisory انتقالی. |

## بررسی امنیتی

- token مدیریت CMS یا secret revalidation به کد browser ارسال نمی‌شود.
- پاسخ عمومی CMS شامل authentication، audit، review، اطلاعات خصوصی کاربر یا secret ذخیره‌سازی نیست.
- receiver رویدادهای قدیمی، malformed، بزرگ یا با امضای نادرست را رد می‌کند.
- replay در پنجره پنج‌دقیقه‌ای فقط invalidation idempotent ایجاد می‌کند و mutation محتوایی از receiver در دسترس نیست.
- محتوای rich در مرز write، projection عمومی و render با allowlist کنترل می‌شود؛ URL اجرایی و HTML دلخواه رد می‌شوند.
- configuration ریموت CMS در production به HTTPS نیاز دارد؛ HTTP فقط برای smoke loopback مجاز است.
- نصب تمیز CMS و `npm audit --json` پس از override، صفر آسیب‌پذیری گزارش کردند.

## شواهد اعتبارسنجی

| دستور/بررسی | نتیجه |
| --- | --- |
| `npm run test:seo` عمومی | PASS |
| `npm run test:r2` عمومی | PASS |
| `npm run test:r3` عمومی | PASS |
| `npm run test:r6` عمومی | PASS |
| `npm run test:blog` عمومی | PASS |
| `npm run typecheck` / `npm run lint` عمومی | PASS / PASS |
| `npm run build` عمومی | PASS |
| `npm run test:blog:smoke` عمومی | PASS |
| `npm run test:seo:smoke` عمومی | PASS |
| `npm run test:blog:fixture` عمومی | PASS |
| `npm run test:revalidation` عمومی | PASS؛ invalid برابر ۴۰۱ و valid برابر ۲۰۰ |
| `npm ci` CMS | PASS؛ نصب clean و صفر آسیب‌پذیری audit |
| `npm run typecheck` / `npm run lint` CMS | PASS / PASS |
| `npm run test` CMS | PASS؛ ۹ تست |
| `npm run db:validate` CMS | PASS |
| `npm run build` CMS | PASS |
| standalone smoke CMS | PASS؛ login برابر ۲۰۰، robots برابر ۲۰۰، route محافظت‌شده برابر ۳۰۷ و API عمومی بدون DB برابر ۵۰۳ |
| migration و integration انتشار/لغو انتشار با MySQL | NOT_RUN؛ instance مجاز در دسترس نبود |
| استقرار خارجی و بررسی live hostهای CMS/public | NOT_PERFORMED |

## شواهد کش در Prompt 08

| معیار | قبل | بعد |
| --- | --- | --- |
| مسیر فریم | `public/frames/` | `public/frames/v1/` |
| تعداد فریم | `535` | `535` |
| حجم کل | `11,423,938` بایت | `11,423,938` بایت |
| signature توالی | `739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86` | یکسان |
| هدر cache نمونه | `public, max-age=0` | `public, max-age=31536000, immutable` |
| URL قدیمی فریم | در دسترس | `404` |

این signature، SHA-256 ورودی UTF-8 شامل خطوط LF و مرتب‌شده با قالب `filename:sha256(file)` است. hash فریم اول، میانی و آخر نیز قبل و بعد یکسان بود. در `AnimationRuntime.tsx` فقط مقدار `FRAME_ROOT` تغییر کرد؛ ترتیب فریم، صف بارگذاری، concurrency، readiness، reduced-motion، GSAP، ScrollTrigger، رسم canvas، layout و timing تغییر نکرد.

`npm run test:r7:smoke` روی production server محلی، وضعیت HTTP 200، نوع WebP و هدر cache immutable را برای `frame_00001.webp`، `frame_00268.webp` و `frame_00535.webp` تأیید کرد. مسیر قدیمی فریم اول HTTP 404 برگرداند.

## وضعیت regression و استقرار

هیچ رفتار انیمیشن، محتوای فریم، قیمت، route یا URL dashboard حذف یا تغییر داده نشد. Prompt 08 تنها تغییر مجاز مسیر asset و تنظیم cache را انجام داد. در production باید مسیر `public/frames/v1/` در artifact استقرار وجود داشته باشد؛ تغییر آینده محتوای فریم نیازمند مسیر نسخه‌دار جدید است. استقرار CMS همچنان به secretهای یکسان و server-only `PUBLIC_REVALIDATION_SECRET` و `BLOG_REVALIDATION_SECRET`، API عمومی در دسترس، migration روی MySQL، object storage و پایش/retry نیاز دارد.

اولین اجرای sandbox شده `npm run build` هنگام اجرای worker مربوط به TypeScript با `spawn EPERM` متوقف شد؛ اجرای مجاز elevated همان build را با موفقیت تکمیل کرد. اسکریپت نامرتبط `npm run test:r6:smoke` همچنان به دلیل انتظار قدیمی H1 صفحه اصلی شکست می‌خورد و در این کار cache تغییر داده نشد.

## آمادگی Search Console در Prompt 09

| بررسی | نتیجه |
| --- | --- |
| verification اختیاری Metadata API | PASS؛ `GOOGLE_SITE_VERIFICATION` به‌صورت configuration معتبر server/build استفاده می‌شود و در حالت معتبر یک meta tag می‌سازد |
| رفتار نبود token | PASS؛ در حالت unset یا invalid هیچ metadata verification تولید نمی‌شود |
| الگوی امن environment | PASS؛ متغیر در `.env.example` خالی است و token واقعی ندارد |
| عدم افشای token عمومی | PASS؛ متغیر `NEXT_PUBLIC_*` نیست و analytics/tag-management اضافه نشد |
| build بدون token | PASS |
| build با token آزمایشی | PASS؛ فقط token محلی غیرتولیدی |
| smoke حذف verification | PASS |
| smoke حذف با token نامعتبر | PASS |
| smoke تولید verification | PASS؛ دقیقاً یک tag تنظیم‌شده |
| smoke مرز robots/sitemap | PASS؛ pointer canonical و حذف hostهای خصوصی تأیید شد |
| fixture انتشار CMS | PASS؛ مقاله منتشرشده و indexable وارد شد و draft/noindex حذف شد |
| verification واقعی Search Console | NOT_RUN؛ دسترسی property یا export مالک ارائه نشده است |

فایل `docs/search-console-setup.md` نوع Domain property پیشنهادی، روش HTML-tag برای URL-prefix، configuration استقرار، آدرس sitemap، بررسی‌های پس از استقرار و مراحل export داده‌های Queries/Pages را توضیح می‌دهد. این مستند همه metricهای واقعی Search Console را تا زمان ارائه دسترسی یا export مالک، unavailable اعلام می‌کند. طراحی/انیمیشن homepage و مرز حذف CMS/dashboard از sitemap حفظ شدند.

## QA نهایی Prompt 10

سایت عمومی و CMS مستقل، gate قابل اجرای source-level را با موفقیت گذراندند: نصب lockfile، lint، typecheck، تست‌های SEO/Blog/security، build تولیدی، smoke مسیرهای HTTP محلی، بررسی metadata و مرز crawl، revalidation امضاشده و audit وابستگی‌ها. build عمومی برای پنج route بازاریابی، Blog، robots، sitemap، feed و manifest پاسخ ۲۰۰ داد و slug ناموجود Blog پاسخ واقعی ۴۰۴ برگرداند. smoke مستقل CMS routeهای محافظت‌شده را برای کاربر ناشناس رد کرد، API تغییر وضعیت بدون credential کد ۴۰۱ داد، registration وجود نداشت و API عمومی بدون database با ۵۰۳ کنترل‌شده degrade شد.

توالی ۵۳۵ فریمی با حجم ۱۱٬۴۲۳٬۹۳۸ بایت و signature ثبت‌شده بدون تغییر باقی ماند. بررسی desktop در browser کنترل‌شده، hero/ناوبری/sectionهای RTL و نبود warning/error کنسول را نشان داد. مقایسه screenshot قبل/بعد، viewport موبایل/تبلت و emulation مربوط به reduced-motion به‌دلیل نبود baseline ذخیره‌شده یا کنترل viewport/emulation، NOT_RUN هستند. migration و apply روی MySQL، استقرار خارجی، انتشار واقعی از CMS و دسترسی Search Console همچنان پیش‌نیاز خارجی‌اند.

## برنامه خوشه محتوایی SEO در Prompt 11

فایل `docs/seo-content-cluster-01.md` به‌عنوان artifact پژوهشی و بدون انتشار اضافه شد. این فایل معماری فعلی source، drift نسخه قدیمی host عمومی (نبود `/blog/`، `/robots.txt`، `/sitemap.xml` و routeهای محتوایی جدید در deployment مشاهده‌شده)، نبود موجودی مقاله، مشاهده کیفی SERP فارسی، تفکیک intent، هشت brief مقاله، نیازهای evidence، فرصت‌های لینک داخلی، تصمیم‌های لازم از owner و ترتیب اولویت انتشار را ثبت می‌کند. هیچ مقاله‌ای ساخته یا منتشر نشد، sitemap تغییر نکرد و کد محصول تغییر داده نشد.

در plan، Search Console با وضعیت `SEARCH CONSOLE ACCESS REQUIRED` و همه metricهای ابزار keyword با `DATA NOT AVAILABLE` ثبت شده‌اند. نتایج SERP فقط observation زمان‌مند هستند، نه ranking یا forecast؛ intent فروشگاه‌دار B2B از B2C تأییدنشده جدا شده و ادعاهای AI، fit و size تا ارائه شواهد فنی و تأیید owner در حالت hold هستند.
