import Image from "next/image";
import Link from "next/link";
import type { Project } from "types";
import { projectSlug, projectThumb } from "@/data/content/projects";
import FadeImage from "../utility/FadeImage";
import TagChips from "./TagChips";

function ProjectCard({ project }: { project: Project }) {
  const slug = projectSlug(project);
  return (
    <div className="group relative flex flex-col h-full card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 focus-within:border-accent/80 focus-within:ring-2 focus-within:ring-accent/80">
      <Link
        href={`/projects/${slug}`}
        className="relative block aspect-[2/1] overflow-hidden bg-surface"
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
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-ink group-hover:text-accent transition-colors leading-snug">
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
                className="flex h-11 w-11 items-center justify-center opacity-60 transition hover:opacity-100 text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:opacity-100"
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
                className="flex h-11 w-11 items-center justify-center opacity-60 transition hover:opacity-100 text-muted rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:opacity-100"
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
        <p className="mt-2 text-left text-sm leading-relaxed text-muted flex-1">
          {project.desc}
        </p>
        <TagChips tags={project.tags} className="relative z-10 mt-3.5 pt-1" />
      </div>
    </div>
  );
}

export default ProjectCard;
