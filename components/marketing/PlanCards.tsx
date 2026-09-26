import { PLANS } from "@/lib/marketing";

export default function PlanCards() {
  return (
    <div className="pricing-grid content-page__pricing-grid">
      {PLANS.map((plan) => (
        <article
          className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}
          dir="rtl"
          key={plan.name}
        >
          {plan.badge ? (
            <span
              className={`pricing-card__badge fa-copy${plan.featured ? "" : " pricing-card__badge--dark"}`}
            >
              {plan.badge}
            </span>
          ) : null}
          <div className="pricing-card__header">
            <div>
              <p className="pricing-card__eyebrow fa-copy">پکیج</p>
              <h2 className="pricing-card__title fa-copy">{plan.name}</h2>
            </div>
            <span className="pricing-card__term fa-copy">{plan.term}</span>
          </div>
          <p className="pricing-card__body fa-copy">{plan.description}</p>
          <p className="pricing-card__price fa-copy">
            <strong>{plan.price}</strong>
            <span>تومان</span>
          </p>
          <dl className="pricing-card__details">
            <div>
              <dt className="fa-copy">اعتبار کل</dt>
              <dd className="fa-copy">{plan.credits}</dd>
            </div>
            <div>
              <dt className="fa-copy">نرخ هر پرو</dt>
              <dd className="fa-copy">{plan.unitPrice}</dd>
            </div>
          </dl>
          <a
            className="pricing-card__cta fa-copy"
            href="https://dash.rookhposh.ir"
            target="_blank"
            rel="noopener noreferrer"
          >
            انتخاب پکیج {plan.name}
          </a>
        </article>
      ))}
    </div>
  );
}
