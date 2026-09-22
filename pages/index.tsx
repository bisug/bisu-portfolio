import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";
import { testimonials } from "@/data/content/home";

export default function Home() {
  return (
    <Page
      currentPage="Home"
      meta={{
        desc: "I'm Bisu Ghalan, a CS student and security researcher from Nepal building bots, CLIs, and full-stack apps.",
      }}
    >
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      {testimonials.length > 0 && (
        <Reveal>
          <Testimonials />
        </Reveal>
      )}
      <Reveal>
        <Contact />
      </Reveal>
    </Page>
  );
}
