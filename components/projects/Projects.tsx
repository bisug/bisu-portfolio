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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
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
      </div>
    </>
  );
}

export default Projects;
