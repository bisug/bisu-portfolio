import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
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
        <Testimonials />
      </Reveal>
      <Reveal>
        <CTA />
      </Reveal>
    </Page>
  );
}
