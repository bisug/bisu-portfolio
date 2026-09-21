import Image from "next/image";
import Link from "next/link";
import type { Project } from "types";
import { projectSlug, projectThumb } from "@/data/content/projects";
import { kebabCase } from "@/utils/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] transition hover:-translate-y-1 hover:border-fun-accent/60 hover:shadow-xl hover:shadow-fun-accent/10">
      <Link
        href={`/projects/${projectSlug(project)}`}
        className="relative block aspect-[16/9] overflow-hidden bg-fun-navy-darkest"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          className="h-full w-full object-cover object-top transition duration-300 hover:scale-[1.03]"
          src={project.img}
          srcSet={`${projectThumb(project.img)} 600w, ${project.img} 1200w`}
          sizes="(min-width: 768px) 33vw, 100vw"
          alt={project.title}
          width={1200}
          height={600}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/projects/${projectSlug(project)}`}>
            <h3 className="text-lg font-bold hover:text-fun-accent transition-colors">
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="opacity-60 transition hover:opacity-100 p-1.5 -m-1.5"
              >
                <Image
                  src="/static/icons/external-link.svg"
                  width={18}
                  height={18}
                  alt=""
                  aria-hidden="true"
                  className="icon-invert-light"
                />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="opacity-60 transition hover:opacity-100 p-1.5 -m-1.5"
              >
                <Image
                  src="/static/icons/github.svg"
                  width={18}
                  height={18}
                  alt=""
                  aria-hidden="true"
                  className="icon-invert-light"
                />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-left text-sm leading-relaxed text-fun-gray">{project.desc}</p>
        <ul className="mt-3 flex flex-wrap items-center gap-1.5 list-none">
          {project.tags.map((tag) => {
            return (
              <li key={tag}>
                <Link href={`/projects/tag/${kebabCase(tag)}`} prefetch={false}>
                  <div className="rounded-md bg-fun-navy px-2.5 py-1.5 text-xs text-fun-gray-light cursor-pointer transition hover:bg-fun-accent hover:text-fun-navy-darkest">
                    {tag}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProjectCard;
