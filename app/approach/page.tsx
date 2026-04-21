import { approachContent } from "@/src/lib/content";

export default function Approach() {
  return (
    <div className="page-container">
      <header className="page-header mb-12">
        <h1 className="text-h1 font-display mb-4">{approachContent.title}</h1>
        <p className="text-body-lg text-secondary">{approachContent.subtitle}</p>
      </header>

      <div className="grid grid-2">
        {approachContent.sections.map((section, index) => (
          <article key={index} className="approach-card">
            <span className="text-label mb-3">0{index + 1}</span>
            <h2 className="text-h2 mb-4">{section.title}</h2>
            <p className="text-body text-secondary leading-relaxed">
              {section.description}
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-light">
        <p className="text-body text-tertiary">
          Every system I build is designed to reduce operational burden, not add complexity.
        </p>
      </footer>
    </div>
  );
}