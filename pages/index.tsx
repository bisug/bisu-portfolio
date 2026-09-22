import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function Home() {
  return (
    <Page
      currentPage="Home"
      meta={{
        desc: "I'm Bisu Ghalan, a CS student and security researcher from Nepal. I build Telegram bots, CLIs, and full-stack web apps — and break them to learn to defend them.",
      }}
    >
      <Hero />
      <Reveal>
        <About />
      </Reveal>
    </Page>
  );
}
