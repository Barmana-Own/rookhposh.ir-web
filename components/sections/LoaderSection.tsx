import Image from "next/image";

export default function LoaderSection() {
  return (
    <>
      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader__mark">
          <Image
            src="/images/rookhposh-mark.webp"
            alt=""
            width={70}
            height={47}
          />
        </div>
        <div className="loader__bar" aria-hidden="true">
          <span id="loaderFill" style={{ width: "0%" }} />
        </div>
        <div className="loader__pct" aria-hidden="true">
          <span id="loaderPct">۰</span>
          <i>٪</i>
        </div>
        <div className="loader__label fa-copy">در حال آماده‌سازی اتاق پرو</div>
      </div>
      <p id="loaderStatus" className="visually-hidden" role="status" aria-live="polite">
        در حال آماده‌سازی اتاق پرو
      </p>
    </>
  );
}
