import PageHeading from "@/components/global/PageHeading";
import Skills from "@/components/home/Skills";
import Page from "@/components/utility/Page";

export default function TechStackPage() {
  return (
    <Page
      currentPage="Tech Stack"
      path="/tech-stack"
      meta={{
        title: "Tech Stack",
        desc: "Languages and tools I use: Python, Go, TypeScript, Next.js, Docker, and more.",
      }}
    >
      <PageHeading
        title="Tech Stack"
        doodle="/static/doodles/hero/code.svg"
        subtitle="Languages, frameworks, databases, and systems I reach for when building and securing applications."
      />
      <Skills />
    </Page>
  );
}
