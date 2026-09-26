const DEFAULT_SITE_ORIGIN = "https://rookhposh.ir";

function resolveSiteOrigin(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_ORIGIN;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_ORIGIN;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export const SITE_ORIGIN = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_URL = new URL(SITE_ORIGIN);
export const SITE_HOMEPAGE_URL = `${SITE_ORIGIN}/`;

export const SITE_NAME = "رخ پوش";
export const SITE_DESCRIPTION =
  "رخ پوش، پرو مجازی لباس برای فروشگاه‌ها؛ تصویر و لباس را پیش از خرید کنار هم ببینید و با اطمینان بیشتری انتخاب کنید.";
