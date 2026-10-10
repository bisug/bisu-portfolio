import Link from "next/link";
import type { Project } from "types";
import SectionTitle from "@/components/global/SectionTitle";
import Reveal from "@/components/utility/Reveal";
import projects from "@/data/content/projects";
import More from "./More";
import ProjectCard from "./ProjectCard";

type ProjectProps = {
  overwriteProjects?: Project[];
  tag?: string;
  subtitle?: string;
};

function Projects({ overwriteProjects, tag, subtitle }: ProjectProps) {
  const projectsList = overwriteProjects ?? projects;
  const isTagPage = Boolean(tag);

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-12 w-full">
      <div className="md:max-w-xs lg:max-w-sm xl:max-w-md md:shrink-0">
        <SectionTitle title={tag ? `${tag} projects.` : "Things I've built."} as="h1" />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          {subtitle ??
            "A selection of things I've built: security tooling, CLIs, Telegram bots, and full-stack apps."}
        </p>
        {isTagPage && (
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fun-accent hover:underline"
            >
              ← View all projects
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1 w-full">
        <h2 className="sr-only">{tag ? `${tag} projects` : "All projects"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          {projectsList.map((item, index) => {
            return (
              <Reveal key={item.id} delay={(index % 2) * 60} className="h-full">
                <ProjectCard project={item} />
              </Reveal>
            );
          })}
          {!overwriteProjects && (
            <Reveal delay={(projectsList.length % 2) * 60} className="h-full sm:col-span-2">
              <More />
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
