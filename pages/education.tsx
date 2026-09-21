import Education from "@/components/home/Education";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function EducationPage() {
  return (
    <Page
      currentPage="Education"
      path="/education"
      meta={{
        title: "Education",
        desc: "My education — BCS in Cyber Security & Network Technology, and +2 Management.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Education />
      </Reveal>
    </Page>
  );
}
