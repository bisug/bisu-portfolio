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
        desc: "Roles, projects, and hackathons — freelance Telegram bots, web apps, and cybersecurity hackathons.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Experience />
      </Reveal>
    </Page>
  );
}
