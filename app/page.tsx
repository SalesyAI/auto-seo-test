import Link from "next/link";
import Button from "@/src/components/core/button";
import { siteContent, projectsContent } from "@/src/lib/content";

export default function Home() {
  const featuredProjects = projectsContent.items.filter(p => p.featured).slice(0, 3);

  return (
    <div className="home-container">
      <section className="hero-section animate-fade-in">
        <p className="text-label mb-4">{siteContent.title}</p>
        <h1 className="text-display mb-6">
          {siteContent.tagline}
        </h1>
        <p className="text-body-lg text-secondary mb-8 hero-description">
          {siteContent.description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link href="/audit">
            <Button variant="primary" size="lg">
              {siteContent.cta.primary}
            </Button>
          </Link>
          <Link href="/work">
            <Button variant="outline" size="lg">
              {siteContent.cta.secondary}
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-16 pt-16 border-t border-light animate-fade-in animate-delay-2">
        <p className="text-label mb-6">Selected Infrastructure</p>
        <div className="grid grid-3">
          {featuredProjects.map((project) => (
            <Link 
              key={project.id} 
              href={`/work/${project.slug}`}
              className="project-card"
            >
              <span className="project-icon">{project.thumbnail}</span>
              <h3 className="text-h3 mb-2">{project.title}</h3>
              <p className="text-secondary text-small mb-4">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}