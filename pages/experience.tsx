import Experience from "@/components/home/Experience";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function ExperiencePage() {
  return (
    <Page
      currentPage="Experience"
      path="/experience"
      meta={{
        title: "Experience",
        desc: "Where I've worked — lead developer roles, bot creators, and hackathons.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Experience />
      </Reveal>
    </Page>
  );
}
