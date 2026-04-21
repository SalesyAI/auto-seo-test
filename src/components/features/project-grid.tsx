import Link from "next/link";
import Card from "../core/card";
import { Project } from "@/src/types";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid-projects">
      {projects.map((project) => (
        <Link key={project.id} href={`/work/${project.slug}`} className="block">
          <Card elevated className="h-full">
            <div className="aspect-square bg-bg-elevated rounded mb-4 flex items-center justify-center">
              <span className="text-4xl text-muted">{project.thumbnail}</span>
            </div>
            <h3 className="text-body-bold text-white mb-1">{project.title}</h3>
            <p className="text-caption text-muted mb-3">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-badge bg-bg-elevated text-muted px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}