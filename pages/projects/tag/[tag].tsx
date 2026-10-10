import type { GetStaticPaths, GetStaticProps } from "next";
import type { Project } from "types";
import Projects from "@/components/projects/Projects";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";
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
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Projects
          overwriteProjects={filteredProjects}
          tag={capsTag}
          subtitle={`${count} of my ${projects.length} featured projects ${count === 1 ? "uses" : "use"} ${capsTag}: ${names}. Each one is open source.`}
        />
      </Reveal>
    </Page>
  );
}

export default PostPage;
