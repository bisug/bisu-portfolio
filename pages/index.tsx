import Link from "next/link";
import PageHeading from "@/components/global/PageHeading";
import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/projects/ProjectCard";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";
import projects from "@/data/content/projects";

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <Page
      currentPage="Home"
      meta={{
        desc: "I'm Bisu Ghalan, a CS student and security researcher from Nepal. I build Telegram bots, CLIs, and full-stack web apps, and break them to learn to defend them.",
      }}
    >
      <Hero />
      <Reveal className="w-full my-12">
        <div className="flex flex-col items-center">
          <PageHeading
            as="h2"
            title="Featured Work"
            doodle="/static/doodles/hero/code.svg"
            subtitle="A few highlights from my recent projects in security tooling, Telegram bots, and web apps."
            className="py-8 sm:py-12"
          />
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch w-full max-w-5xl">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-10 inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full text-fun-accent border border-fun-accent/40 bg-fun-navy-dark hover:bg-fun-accent hover:text-fun-navy-darkest transition shadow-lg shadow-fun-accent/10"
          >
            Explore all projects →
          </Link>
        </div>
      </Reveal>
      <Reveal className="w-full my-8">
        <About />
      </Reveal>
    </Page>
  );
}
