import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/src/components/core/button";
import { projectsContent } from "@/src/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsContent.items.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsContent.items.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-container">
      <Link href="/work" className="back-link mb-8">
        ← Back to Work
      </Link>

      <header className="project-header mb-8">
        <span className="text-label mb-3">{project.year}</span>
        <h1 className="text-h1 font-display mb-4">{project.title}</h1>
        <p className="text-body-lg text-secondary">{project.subtitle}</p>
      </header>

      <div className="project-content">
        <div className="project-hero">
          <span className="project-hero-symbol">{project.thumbnail}</span>
        </div>

        <div className="project-description">
          <p className="text-body-lg text-secondary leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>

          <Button variant="outline" href={project.link}>
            {project.linkLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}