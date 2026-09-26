import { STORY_STEPS } from "@/lib/marketing";

export default function StorySteps() {
  return (
    <ol className="content-page__steps">
      {STORY_STEPS.map((step) => (
        <li className="content-page__step" key={step.number}>
          <span className="content-page__step-number">{step.number}</span>
          <div>
            <h3 className="fa-copy">{step.title}</h3>
            <p className="fa-copy">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
