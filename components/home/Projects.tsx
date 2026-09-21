import Link from "next/link";
import projects from "@/data/content/projects";
import SectionTitle from "../global/SectionTitle";

import ProjectCard from "../projects/ProjectCard";

function Projects() {
  return (
    <div className="flex flex-col text-left justify-between relative">
      <div id="learnmore" className="scroll-mt-24">
        <SectionTitle title="A few of my favorite projects." />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {projects.slice(0, 3).map((item) => {
          return <ProjectCard key={item.id} project={item} />;
        })}
      </div>
      <div className="relative w-full mt-8">
        <Link href="/projects">
          <div className="max-w-xs border border-fun-pink mx-auto text-center w-full px-8 py-3 rounded-full text-fun-pink bg-fun-pink-darker hover:bg-fun-pink hover:text-fun-pink-darkest transition cursor-pointer font-semibold">
            View all projects
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Projects;
