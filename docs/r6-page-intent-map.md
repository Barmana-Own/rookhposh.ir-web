# R6 Page Intent Map

## Scope

This map records the distinct purpose of the existing public marketing routes after the Prompt 04 refinement. The implementation uses existing product facts, keeps the approved visual system, and does not add legal or unsupported capability claims.

| Page | Primary intent | Primary audience | Conversion action | Content unique to the page | Overlap detected and treatment |
| --- | --- | --- | --- | --- | --- |
| `/` | Brand/category overview and first product introduction | Visitors evaluating virtual clothing try-on | Enter the dashboard or continue to a factual route from the shared navigation/footer | Hero experience, high-level seven-step story, plan preview, and short FAQ | Shares the core workflow with the informational pages; copy remains high-level and the page title is now category-led rather than store-page-led. |
| `/for-online-stores/` | B2B commercial understanding for online clothing stores | Store owners/operators | Review plans, enter the dashboard, or read relevant articles | Store context, image-to-preview workflow, and store-oriented next actions | Shares the preview workflow with `/` and `/how-it-works/`; repeated generic language was reduced and the page now uses a store-specific title/H1. |
| `/how-it-works/` | Informational workflow explanation | Visitors who need to understand the sequence before acting | Learn the workflow, then visit the store page or Blog | The seven ordered story steps and process explanation | Shares step concepts with the homepage animation; the lead now explains the sequence without repeating size/fit or outcome language. |
| `/pricing/` | Commercial plan comparison and selection | Store decision-makers comparing plans | Open the dashboard after reviewing exact plan values | Plan duration, credits, prices, unit rates, and package comparison | Shares commercial CTAs with the store page; the title/H1 and supporting copy now focus on plan details rather than a generic growth promise. |
| `/faq/` | Support and objection resolution | Visitors with practical product questions | Read factual answers, then view the workflow or Blog | Four factual questions and answers about input image, clothing choice, preview, and purchase decision | Shares basic workflow language with `/how-it-works/`; hero and section copy now avoid repeating the same sentence. |
| `/blog/` | Editorial/informational discovery hub | Visitors seeking published product-related articles | Read a published article or move to the store page | Provider-backed published article index and article-level discovery | Links to product context through restrained CTAs; it is not used as a replacement for the commercial route. |

## Final metadata and heading map

All five marketing pages use the existing Metadata API helper, absolute trailing-slash canonicals, and one visible H1 supplied by `MarketingPageShell`.

| Page | Metadata title before site template | Visible H1 | Canonical |
| --- | --- | --- | --- |
| `/` | `رخ پوش \| اتاق پرو دیجیتال لباس` | `پرو مجازی را پیش از خرید امتحان کنید` | `https://rookhposh.ir/` |
| `/for-online-stores/` | `راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین` | `راهکار پرو مجازی برای فروشگاه‌های آنلاین` | `https://rookhposh.ir/for-online-stores/` |
| `/how-it-works/` | `مراحل استفاده از پرو مجازی لباس` | `مراحل پرو مجازی، از تصویر تا انتخاب` | `https://rookhposh.ir/how-it-works/` |
| `/pricing/` | `انتخاب پلن رخ پوش برای فروشگاه‌ها` | `تعرفه و پلن‌های رخ پوش` | `https://rookhposh.ir/pricing/` |
| `/faq/` | `پاسخ پرسش‌های رایج درباره رخ پوش` | `پاسخ به پرسش‌های رایج` | `https://rookhposh.ir/faq/` |

The rendered titles are unique after the root template is applied. No two pages intentionally use the same exact primary title/H1 phrase.

## Explicit wording changes

| Location | Previous wording | Current wording | Reason |
| --- | --- | --- | --- |
| Root metadata | `رخ پوش \| پرو مجازی لباس برای فروشگاه‌ها` | `رخ پوش \| اتاق پرو دیجیتال لباس` | Gives the root a brand/category role without duplicating the store-page title. |
| Store page metadata/H1 | `پرو مجازی لباس برای فروشگاه‌ها` | `راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین` / `راهکار پرو مجازی برای فروشگاه‌های آنلاین` | Makes the B2B/store purpose explicit and distinct. |
| How-it-works metadata/H1 | `نحوه کار پرو مجازی لباس` / `از تصویر تا انتخاب نهایی` | `مراحل استفاده از پرو مجازی لباس` / `مراحل پرو مجازی، از تصویر تا انتخاب` | Clarifies the informational process role. |
| Pricing metadata/H1 | `تعرفه پرو مجازی لباس برای فروشگاه‌ها` / `برای هر مرحله از رشد شما` | `انتخاب پلن رخ پوش برای فروشگاه‌ها` / `تعرفه و پلن‌های رخ پوش` | Makes plan comparison the page purpose without changing values. |
| FAQ metadata/H1 | `سؤالات متداول پرو مجازی لباس` / `درباره پرو مجازی رخ پوش` | `پاسخ پرسش‌های رایج درباره رخ پوش` / `پاسخ به پرسش‌های رایج` | Separates support intent from workflow and commercial pages. |
| Store page cards | `انتخاب مدل و رنگ`; `پیش‌نمایش پیش از خرید` | `انتخاب گزینه‌های لباس`; `دیدن پیش‌نمایش انتخاب` | Reduces repeated exact phrasing while retaining the visible workflow. |
| Workflow copy | `مقایسه مدل، رنگ و اندازه`; `تجربه‌ای که از انتخاب شروع می‌شود` | `تصویر واضح، انتخاب لباس و پیش‌نمایش نتیجه در چند گام کنار هم قرار می‌گیرند.` | Removes unsupported fit/size-imprecision implication from the summary. |
| Homepage story | `لباس، متناسب با تصویر شما`; `رنگ و اندازه را دقیق‌تر کنید`; `مقایسه مدل، رنگ و تناسب` | `لباس روی تصویر شما`; `جزئیات لباس را بررسی کنید`; `مقایسه مدل و رنگ` | Keeps the visual try-on meaning while avoiding a claim of real-world fit prediction or sizing accuracy. |
| Homepage/footer claims | `با اطمینان سفارش دهید`; `تجربه هوشمند ... اطمینان واقعی` | `انتخاب نهایی‌تان را انجام دهید`; `تجربه پرو مجازی لباس برای دیدن نتیجه انتخاب روی تصویر.` | Removes outcome and intelligence claims that are not independently evidenced in the repository. |
| Pricing badge/copy | `محبوب‌ترین`; `شروعی کم‌ریسک ...` | `انتخاب متعادل`; `برای شروع تجربه پرو مجازی در فروشگاه شما.` | Removes an unsupported popularity claim and subjective risk claim. Pricing numbers are unchanged. |

## Internal discovery additions

- Store page → Pricing: `مشاهده تعرفه‌های رخ پوش`
- Store page → Blog: `مطالعه مقالات`
- How It Works → Store page: `آشنایی با کاربرد برای فروشگاه‌ها`
- How It Works → Blog: `مطالعه مقالات رخ پوش`
- Pricing → FAQ: `مشاهده سؤالات متداول`
- Pricing → Blog: `مطالعه مقالات رخ پوش`
- FAQ → How It Works: `مشاهده نحوه کار`
- FAQ → Blog: `مطالعه مقالات رخ پوش`
- Shared header/footer and Blog product CTA continue to provide the existing broader discovery paths.

## Invariants

- Plan price, duration, credit, and unit-rate values are unchanged.
- No Privacy Policy or Terms of Use content was added.
- `AnimationRuntime.tsx`, GSAP/ScrollTrigger, canvas behavior, frame files/order/count, and animation timing are unchanged.
- The external dashboard URL remains `https://dash.rookhposh.ir`.

See [`docs/product-claims-needing-owner-verification.md`](product-claims-needing-owner-verification.md) for claims that remain owner-input items.
