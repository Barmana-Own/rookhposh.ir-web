# گزارش تحویل مشتری — SEO مقاله و کشف Blog در Prompt 03

| مشخصه | مقدار |
| --- | --- |
| پروژه | رخ پوش / Rookhposh |
| نوع گزارش | گزارش مشتری |
| زبان | فارسی |
| تاریخ جلالی | ۱۴۰۵-۰۷-۰۶ |
| تاریخ میلادی | 2026-09-28 |
| revision سورس | `800ba8932bddef0c45eaed9a1e2ec6abd987fccf` |
| branch | `feature/r5-prompt-01-navigation` |
| وضعیت تحویل | پیاده‌سازی سورس کامل؛ انتشار خارجی انجام نشده است |

## خلاصه مدیریتی

زیرساخت Blog عمومی first-party و لایه SEO/کشف مقاله روی دامنه `rookhposh.ir` تحویل شد، بدون تغییر در طراحی تأییدشده homepage، قیمت‌ها، مقصد dashboard یا تجربه انیمیشن ۵۳۵ فریمی.

## قابلیت‌های تحویل‌شده

- `/blog/` اکنون فهرست مقالات روی دامنه اصلی است.
- `/blog/[slug]/` مقاله‌های منتشرشده را با عنوان، خلاصه، تصویر، نویسنده، تاریخ‌ها، بدنه، دسته‌بندی، برچسب‌ها، مطالب مرتبط و CTA زمینه‌ای محصول نمایش می‌دهد؛ فقط در صورت وجود این داده‌ها در منبع محتوا.
- منبع محتوای عمومی و اختیاری از طریق `BLOG_CONTENT_API_URL` پشتیبانی می‌شود؛ CMS، ویرایشگر، database، authentication یا API نوشتن در این repository اضافه نشده است.
- تا پیش از اتصال CMS، صفحه Blog حالت خالی واقعی دارد، مقاله جعلی تولید نمی‌کند، `noindex` است و در sitemap قرار نمی‌گیرد.
- slugهای ناموجود، منتشرنشده، نامعتبر یا unavailable با 404 واقعی پاسخ می‌گیرند.
- محتوای Markdown پیش از server rendering sanitize می‌شود و HTML خام غیرفعال است.
- مقصد اصلی Blog در header/footer همچنان `/blog` است و `blog.rookhposh.ir` مقصد اصلی مقاله نیست.

## موارد حفظ‌شده

runtime انیمیشن تأییدشده، رفتار GSAP/ScrollTrigger، منطق canvas، فایل‌ها/ترتیب/تعداد فریم‌ها، ترکیب hero، قیمت‌ها، سبک برند و URL داشبورد تغییر نکردند. موجودی فریم همچنان ۵۳۵ فایل با حجم ۱۱٬۴۲۳٬۹۳۸ بایت است.

## کیفیت و اعتبارسنجی

| بررسی | نتیجه |
| --- | --- |
| نصب dependency | PASS؛ `npm ci` و بدون آسیب‌پذیری گزارش‌شده |
| lint | PASS |
| TypeScript | PASS |
| تست‌های سورس SEO/R2/R3 موجود | PASS |
| تست سورس Blog | PASS |
| build تولیدی | PASS |
| smokeهای تولیدی SEO/R3/R4 موجود | PASS |
| smoke حالت خالی Blog | PASS |
| smoke با CMS آزمایشی | PASS؛ مقاله منتشرشده نمایش داده شد، draft حذف شد و script در خروجی نیامد |
| fixture متادیتا و structured data مقاله | PASS؛ metadata مقاله، JSON-LDهای BlogPosting/BreadcrumbList، canonical و فیلدهای نویسنده/تاریخ بررسی شد |
| fixture sitemap/feed پویا | PASS؛ محتوای published و indexable اضافه و draft/noindex حذف شد |
| smoke RSS و social card | PASS؛ content type مربوط به RSS و PNG قطعی ۱۲۰۰×۶۳۰ بررسی شد |
| پاک‌سازی هویت Organization | PASS؛ Blog قدیمی از `sameAs` حذف شد |
| انتشار خارجی | NOT_PERFORMED |

## نیاز عملیاتی باقی‌مانده

برای نمایش مقاله واقعی و indexable شدن Blog، URL تأییدشده CMS/API و محتوای منتشرشده لازم است. revision تأییدشده سورس نیز باید deploy و سپس روی دامنه واقعی دوباره بررسی شود؛ در این task Git push، تغییر DNS یا انتشار Production انجام نشده است.

## محدوده دقیق پیاده‌سازی

این تغییر شامل routeها و componentهای Blog، boundary محتوای `lib/blog/`، metadata و JSON-LD مقاله، sitemap پویا، RSS escape‌شده در `/feed.xml`، social card قطعی `/opengraph-image` با ابعاد ۱۲۰۰×۶۳۰، لینک‌های داخلی زمینه‌ای، styleهای scoped، template محیطی اختیاری، تست‌های source/HTTP/fixture مربوط به Blog، به‌روزرسانی lockfile و مستندات فنی و وضعیت release است.

## به‌روزرسانی تحویل Prompt 03

- هر مقاله منتشرشده اکنون fallbackهای معتبر SEO، canonical روی دامنه اصلی، فیلدهای Open Graph/Twitter مقاله، تاریخ انتشار/به‌روزرسانی، metadata نویسنده و رفتار `index/follow` یا `noindex` صریح دارد.
- صفحه مقاله JSON-LD نوع `BlogPosting` را با ارجاع به Organization موجود رخ پوش و `BreadcrumbList` منطبق با breadcrumb قابل مشاهده تولید می‌کند.
- `/sitemap.xml` به‌صورت request-time از CMS استفاده می‌کند، هنگام خطای provider routeهای ثابت بازاریابی را حفظ می‌کند و فقط محتوای published و indexable Blog را اضافه می‌کند.
- `/feed.xml` یک RSS عمومی و escape‌شده فقط برای مقاله‌های published و indexable است. `/opengraph-image` یک PNG قطعی با ابعاد ۱۲۰۰×۶۳۰ ارائه می‌دهد.
- صفحه «برای فروشگاه‌ها» اکنون به `/blog` لینک می‌دهد و Blog قدیمی به‌عنوان سیگنال هویت `sameAs` در Organization استفاده نمی‌شود.

revision سورس به‌صورت محلی بررسی شده است. در این کار deploy خارجی، تغییر DNS، پیکربندی CMS یا ادعای index شدن زنده انجام نشده است. دامنه عمومی همچنان باید با این revision deploy و سپس دوباره بررسی شود.
