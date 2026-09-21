import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { Project } from "types";
import Page from "@/components/utility/Page";
import FadeImage from "@/components/utility/FadeImage";
import projects, { projectSlug, projectThumb } from "@/data/content/projects";
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
  // Display asset is webp; the sibling png is kept for link previews.
  const ogImage = project.img.replace(/\.webp$/, ".png");
  return (
    <Page
      currentPage="Projects"
      path={path}
      meta={{ title: project.title, desc: project.desc, image: ogImage }}
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

        <FadeImage
          src={project.img}
          srcSet={`${projectThumb(project.img)} 600w, ${project.img} 1200w`}
          sizes="(min-width: 1024px) 1024px, 100vw"
          alt={`${project.title} — repository preview`}
          width={1200}
          height={600}
          loading="eager"
          fetchPriority="high"
          shellClassName="mt-8 block w-full"
          className="w-full rounded-xl border border-white/10"
        />

        <ul className="mt-6 flex flex-wrap items-center gap-1.5 list-none">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/projects/tag/${kebabCase(tag)}`}
                prefetch={false}
                className="rounded-md bg-fun-navy px-2.5 py-1.5 text-xs text-fun-gray-light transition hover:bg-fun-accent hover:text-fun-navy-darkest"
              >
                {tag}
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
