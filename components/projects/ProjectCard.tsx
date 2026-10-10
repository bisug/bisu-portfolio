import Image from "next/image";
import Link from "next/link";
import type { Project } from "types";
import { projectSlug, projectThumb } from "@/data/content/projects";
import FadeImage from "../utility/FadeImage";
import TagChips from "./TagChips";

function ProjectCard({ project }: { project: Project }) {
  const slug = projectSlug(project);
  return (
    <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-fun-accent/60 hover:shadow-2xl hover:shadow-fun-accent/10">
      <Link
        href={`/projects/${slug}`}
        className="relative block aspect-[2/1] overflow-hidden bg-fun-navy-darkest"
        tabIndex={-1}
        aria-hidden="true"
      >
        <FadeImage
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          shellClassName="block h-full w-full"
          src={project.img}
          srcSet={`${projectThumb(project.img)} 600w, ${project.img} 1200w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={project.title}
          width={1200}
          height={600}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2.5">
          <Link
            href={`/projects/${slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-fun-accent transition-colors leading-snug">
              {project.title}
            </h3>
          </Link>
          <div className="relative z-10 flex items-center gap-2 shrink-0 pt-0.5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="opacity-60 transition hover:opacity-100 p-2 -m-2 text-fun-accent"
              >
                <Image
                  src="/static/icons/external-link.svg"
                  width={15}
                  height={15}
                  alt=""
                  aria-hidden="true"
                  className="icon-accent-light"
                />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="opacity-60 transition hover:opacity-100 p-2 -m-2 text-fun-gray-light"
              >
                <Image
                  src="/static/icons/github.svg"
                  width={15}
                  height={15}
                  alt=""
                  aria-hidden="true"
                  className="icon-accent-light"
                />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-left text-xs sm:text-sm leading-relaxed text-fun-gray flex-1">
          {project.desc}
        </p>
        <TagChips tags={project.tags} className="relative z-10 mt-3.5 pt-1" />
      </div>
    </div>
  );
}

export default ProjectCard;
