import Projects from "@/components/projects/Projects";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function ProjectsPage() {
  return (
    <Page
      currentPage="Projects"
      path="/projects"
      meta={{
        title: "Projects",
        desc: "A selection of things I've built: security tooling, CLIs, Telegram bots, and full-stack apps.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Projects />
      </Reveal>
    </Page>
  );
}
