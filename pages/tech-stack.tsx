import Skills from "@/components/home/Skills";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function TechStackPage() {
  return (
    <Page
      currentPage="Tech Stack"
      path="/tech-stack"
      meta={{
        title: "Tech Stack",
        desc: "Languages and tools I use — Python, Go, Rust, TypeScript, Next.js, Docker, and more.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Skills />
      </Reveal>
    </Page>
  );
}
