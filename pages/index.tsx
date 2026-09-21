import CTA from "@/components/home/CTA";
import Education from "@/components/home/Education";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Testimonials from "@/components/home/Testimonials";
import Page from "@/components/utility/Page";

export default function Home() {
  return (
    <Page
      currentPage="Home"
      meta={{
        desc: "I'm Bisu Ghalan, a CS student and security researcher from Nepal building bots, CLIs, and full-stack apps.",
      }}
    >
      <Hero />
      <div className="mt-16 sm:mt-20 space-y-20 sm:space-y-24 w-full">
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Testimonials />
      </div>
      <CTA />
    </Page>
  );
}
