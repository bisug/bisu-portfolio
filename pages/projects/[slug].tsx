import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "types";
import Page from "@/components/utility/Page";
import projects, { projectSlug } from "@/data/content/projects";
import { SITE_URL } from "@/data/global";
import { kebabCase } from "@/utils/utils";

type ProjectPageProps = {
  project: Project;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: projects.map((project) => ({ params: { slug: projectSlug(project) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps, { slug: string }> = async ({
  params,
}) => {
  const project = projects.find((item) => projectSlug(item) === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};

function ProjectPage({ project }: ProjectPageProps) {
  const path = `/projects/${projectSlug(project)}`;
  return (
    <Page
      currentPage="Projects"
      path={path}
      meta={{ title: project.title, desc: project.desc, image: project.img }}
      schema={[
        {
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.desc,
          url: `${SITE_URL}${path}`,
          codeRepository: project.github,
          sameAs: project.link,
          keywords: project.tags.join(", "),
          author: { "@type": "Person", name: "Bisu Ghalan", url: SITE_URL },
        },
      ]}
    >
      <article className="w-full pt-10 sm:pt-16">
        <Link
          href="/projects"
          className="font-mono text-xs uppercase tracking-widest text-fun-accent hover:underline"
        >
          ← All projects
        </Link>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-fun-gray text-base sm:text-lg">{project.desc}</p>

        <Image
          src={project.img}
          alt={`${project.title} — repository preview`}
          width={1200}
          height={600}
          className="mt-8 w-full rounded-xl border border-white/10"
        />

        <ul className="mt-6 flex flex-wrap items-center gap-1.5 list-none">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/projects/tag/${kebabCase(tag)}`}>
                <div className="rounded-md bg-fun-navy px-2.5 py-1.5 text-xs text-fun-gray-light cursor-pointer transition hover:bg-fun-accent hover:text-fun-navy-darkest">
                  {tag}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="font-bold whitespace-nowrap rounded-full border border-fun-accent bg-fun-navy-dark px-8 py-3 text-fun-accent transition-colors hover:bg-fun-accent hover:text-fun-navy-darkest"
            >
              Live site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="font-bold whitespace-nowrap rounded-full border border-white/20 px-8 py-3 text-fun-gray-light transition hover:border-fun-accent hover:text-white"
            >
              Source code
            </a>
          )}
        </div>
      </article>
    </Page>
  );
}

export default ProjectPage;
