import { experienceContent } from "@/src/lib/content";

export default function Experience() {
  return (
    <div className="page-container">
      <header className="page-header mb-12">
        <h1 className="text-h1 font-display mb-4">{experienceContent.title}</h1>
        <p className="text-body-lg text-secondary">{experienceContent.subtitle}</p>
      </header>

      <div className="experience-list">
        {experienceContent.items.map((item, index) => (
          <article key={index} className="experience-card">
            <div className="experience-header">
              <div>
                <span className="text-label mb-2">0{index + 1}</span>
                <h2 className="text-h2">{item.company}</h2>
                <p className="text-secondary mt-1">{item.title}</p>
              </div>
              <span className="text-small text-tertiary experience-period">{item.period}</span>
            </div>
            <p className="text-body text-secondary mt-4 mb-4">{item.description}</p>
            <ul className="highlights-list">
              {item.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="text-small text-secondary">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}