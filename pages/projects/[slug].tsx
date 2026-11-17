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
    paths: projects.map((project) => ({
      params: { slug: projectSlug(project) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProjectPageProps,
  { slug: string }
> = async ({ params }) => {
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
          className="inline-flex items-center gap-1.5 py-1.5 font-mono text-xs uppercase tracking-widest text-accent hover:underline decoration-accent/40 underline-offset-4"
        >
          ← All projects
        </Link>
        <h1 className="heading-h1 mt-4 leading-tight">{project.title}</h1>
        <p className="lead mt-3 max-w-2xl">{project.desc}</p>

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
          className="w-full rounded-card border border-line shadow-xl"
        />

        <TagChips tags={project.tags} className="mt-6" />

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-accent text-accent hover:bg-accent hover:text-on-accent shadow-lg shadow-accent/10 whitespace-nowrap"
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
              className="btn btn-outline whitespace-nowrap"
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
