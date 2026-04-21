import ContactForm from "@/src/components/features/contact-form";
import { auditContent } from "@/src/lib/content";

export default function Audit() {
  return (
    <div className="audit-page">
      <header className="audit-header">
        <h1 className="text-h1 font-display mb-4">{auditContent.title}</h1>
        <p className="text-body-lg text-secondary">{auditContent.subtitle}</p>
      </header>

      <div className="audit-form-section">
        <p className="text-small text-tertiary mb-6">{auditContent.cta}</p>
        <ContactForm source="audit-page" />
      </div>

      <div className="audit-cta">
        <p className="text-small text-secondary">
          Or book directly on my calendar —{" "}
          <a
            href={auditContent.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="audit-cta-link"
          >
            Book a Free Systems Audit
          </a>
        </p>
      </div>
    </div>
  );
}