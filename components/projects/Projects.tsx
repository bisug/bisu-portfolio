import Link from "next/link";
import type { Project } from "types";
import Reveal from "@/components/utility/Reveal";
import projects from "@/data/content/projects";
import More from "./More";
import ProjectCard from "./ProjectCard";

type ProjectProps = {
  overwriteProjects?: Project[];
};

function Projects({ overwriteProjects }: ProjectProps) {
  const projectsList = overwriteProjects ?? projects;
  return (
    <>
      <h2 className="sr-only">All projects</h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl mx-auto pb-12 sm:pb-16">
        {projectsList.map((item, index) => {
          return (
            <Reveal key={item.id} delay={(index % 3) * 75} className="h-full">
              <ProjectCard project={item} />
            </Reveal>
          );
        })}
        {!overwriteProjects && (
          <Reveal delay={(projectsList.length % 3) * 75} className="h-full">
            <More />
          </Reveal>
        )}
        {projectsList.length === 0 && (
          <div className="card col-span-full mx-auto max-w-md p-8 text-center">
            <p className="font-bold text-ink">
              No projects found for this tag.
            </p>
            <p className="mt-2 text-sm text-muted">
              Browse the full list to find something else.
            </p>
            <Link href="/projects" className="btn btn-outline mt-5">
              View all projects
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;
