import type { Project } from "types";
import projects from "@/data/content/projects";
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
        {projectsList.map((item) => {
          return <ProjectCard key={item.id} project={item} />;
        })}
      </div>
    </>
  );
}

export default Projects;
