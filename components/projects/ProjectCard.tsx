import Image from "next/image";
import Link from "next/link";
import type { Project } from "types";
import { kebabCase } from "@/utils/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] transition hover:-translate-y-1 hover:border-fun-pink/60 hover:shadow-xl hover:shadow-fun-pink/10">
      <a
        href={project.link || project.github}
        target="_blank"
        className="relative block aspect-[16/9] overflow-hidden bg-fun-pink-darkest"
        rel="noopener"
      >
        <img
          className="h-full w-full object-cover object-top transition duration-300 hover:scale-[1.03]"
          src={project.img}
          alt={project.title}
          loading="lazy"
        />
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <a href={project.link || project.github} target="_blank" rel="noopener">
            <h3 className="text-lg font-bold hover:text-fun-pink transition-colors">
              {project.title}
            </h3>
          </a>
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="opacity-60 transition hover:opacity-100"
              >
                <Image
                  src="/static/icons/external-link.svg"
                  width={18}
                  height={18}
                  alt=""
                  aria-hidden="true"
                />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="opacity-60 transition hover:opacity-100"
              >
                <Image
                  src="/static/icons/github.svg"
                  width={18}
                  height={18}
                  alt=""
                  aria-hidden="true"
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
                <Link href={`/projects/tag/${kebabCase(tag)}`}>
                  <div className="rounded-md bg-fun-pink-dark px-2.5 py-1.5 text-xs text-fun-gray-light cursor-pointer transition hover:bg-fun-pink hover:text-fun-pink-darkest">
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
