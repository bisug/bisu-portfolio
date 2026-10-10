import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { Project } from "types";
import TagChips from "@/components/projects/TagChips";
import FadeImage from "@/components/utility/FadeImage";
import Page from "@/components/utility/Page";
import projects, { projectSlug, projectThumb } from "@/data/content/projects";
import { SITE_URL } from "@/data/global";

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
          "@id": `${SITE_URL}${path}#software`,
          name: project.title,
          description: project.desc,
          url: `${SITE_URL}${path}`,
          codeRepository: project.github,
          sameAs: project.link,
          programmingLanguage: project.tags[0],
          keywords: project.tags.join(", "),
          author: { "@id": `${SITE_URL}/#person` },
        },
      ]}
    >
      <article className="w-full max-w-4xl mx-auto pt-8 sm:pt-14 pb-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 py-1.5 font-mono text-xs uppercase tracking-widest text-fun-accent hover:underline decoration-fun-accent/40 underline-offset-4"
        >
          ← All projects
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-fun-gray text-base sm:text-lg leading-relaxed text-balance">
          {project.desc}
        </p>

        <FadeImage
          src={project.img}
          srcSet={`${projectThumb(project.img)} 600w, ${project.img} 1200w`}
          sizes="(min-width: 1024px) 1024px, 100vw"
          alt={`${project.title}: repository preview`}
          width={1200}
          height={600}
          loading="eager"
          fetchPriority="high"
          shellClassName="mt-8 block w-full"
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />

        <TagChips tags={project.tags} className="mt-6" />

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap rounded-full border border-fun-accent bg-fun-navy-dark px-8 py-3.5 text-fun-accent transition-colors hover:bg-fun-accent hover:text-fun-navy-darkest shadow-lg shadow-fun-accent/10 text-center"
            >
              Live site
              <img
                src="/static/icons/external-link.svg"
                width={14}
                height={14}
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
              className="inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap rounded-full border border-white/20 px-8 py-3.5 text-fun-gray-light transition hover:border-fun-accent hover:text-white text-center"
            >
              Source code
              <img
                src="/static/icons/external-link.svg"
                width={14}
                height={14}
                alt=""
                aria-hidden="true"
                className="icon-invert-light opacity-70"
              />
            </a>
          )}
        </div>
      </article>
    </Page>
  );
}

export default ProjectPage;
