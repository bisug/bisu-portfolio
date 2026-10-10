import PageHeading from "@/components/global/PageHeading";
import Experience from "@/components/home/Experience";
import Page from "@/components/utility/Page";

export default function ExperiencePage() {
  return (
    <Page
      currentPage="Experience"
      path="/experience"
      meta={{
        title: "Experience",
        desc: "Where I've worked: freelance developer roles, bot creators, and hackathons.",
      }}
    >
      <PageHeading
        title="Experience"
        doodle="/static/doodles/testimonials/squiggle2.svg"
        subtitle="What I've been up to: freelancing, building Telegram bots and web apps, and competing at hackathons."
      />
      <Experience />
    </Page>
  );
}
