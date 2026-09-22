import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

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
    </Page>
  );
}
