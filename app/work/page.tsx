import Link from "next/link";
import { projectsContent } from "@/src/lib/content";

export default function Work() {
  return (
    <div className="page-container">
      <header className="page-header mb-12">
        <h1 className="text-h1 font-display mb-4">{projectsContent.title}</h1>
        <p className="text-body-lg text-secondary">{projectsContent.subtitle}</p>
      </header>

      <div className="grid grid-2">
        {projectsContent.items.map((project) => (
          <Link 
            key={project.id} 
            href={`/work/${project.slug}`}
            className="project-detail-card"
          >
            <div className="project-thumbnail">
              <span className="project-symbol">{project.thumbnail}</span>
            </div>
            <div className="project-info">
              <h2 className="text-h3 mb-2">{project.title}</h2>
              <p className="text-secondary text-small mb-4">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <span className="project-link-label">{project.linkLabel} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}