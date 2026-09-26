import { FAQ_ITEMS } from "@/lib/marketing";

export default function FaqList() {
  return (
    <div className="faq__list">
      {FAQ_ITEMS.map((item) => (
        <details className="faq__item" key={item.question}>
          <summary className="fa-copy">{item.question}</summary>
          <p className="fa-copy">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
