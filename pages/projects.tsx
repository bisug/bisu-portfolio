import Heading from "@/components/projects/Heading";
import Projects from "@/components/projects/Projects";
import Page from "@/components/utility/Page";

function projects() {
  return (
    <Page
      currentPage="Projects"
      path="/projects"
      meta={{
        title: "Projects",
        desc: "I love building with Rust, Go, Python, TypeScript, and more! Here are some of my favorite projects.",
      }}
    >
      <Heading />
      <Projects />
    </Page>
  );
}

export default projects;
