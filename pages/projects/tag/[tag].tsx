import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { Project } from "types";
import Heading from "@/components/projects/Heading";
import Projects from "@/components/projects/Projects";
import Page from "@/components/utility/Page";
import projects, { allKebabTags, allTags } from "@/data/content/projects";
import { kebabCase } from "@/utils/utils";

type TagPageProps = {
  filteredProjects: Project[];
  tag: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allTags.map((path) => ({
      params: { tag: `${kebabCase(path)}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps, { tag: string }> = async ({ params }) => {
  const tag = params?.tag ?? "";
  const filteredProjects = projects.filter((project) =>
    project.tags.some((projectTag) => kebabCase(projectTag) === tag),
  );
  return {
    props: {
      filteredProjects,
      tag,
    },
  };
};

function PostPage({ filteredProjects, tag }: TagPageProps) {
  const capsTag = allTags[allKebabTags.indexOf(tag)];
  const names = filteredProjects.map((project) => project.title).join(", ");
  const count = filteredProjects.length;
  return (
    <Page
      currentPage="Projects"
      path={`/projects/tag/${tag}`}
      meta={{
        title: `${capsTag} Projects`,
        desc: `${count} open source ${capsTag} project${count === 1 ? "" : "s"} by Bisu Ghalan: ${names}.`,
      }}
    >
      <Heading
        tag={capsTag}
        subtitle={`${count} of my ${projects.length} featured projects ${count === 1 ? "uses" : "use"} ${capsTag}: ${names}. Each one is open source.`}
      />
      <Projects overwriteProjects={filteredProjects} />

      <div className="flex justify-center mt-4 mb-12">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full text-fun-accent border border-fun-accent/40 bg-fun-navy-dark hover:bg-fun-accent hover:text-fun-navy-darkest transition shadow-lg shadow-fun-accent/10 text-center"
        >
          ← View All Projects
        </Link>
      </div>
    </Page>
  );
}

export default PostPage;
