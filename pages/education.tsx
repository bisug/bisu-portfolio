import PageHeading from "@/components/global/PageHeading";
import Education from "@/components/home/Education";
import Page from "@/components/utility/Page";

export default function EducationPage() {
  return (
    <Page
      currentPage="Education"
      path="/education"
      meta={{
        title: "Education",
        desc: "My education: BCS in Cyber Security & Network Technology, and +2 Management.",
      }}
    >
      <PageHeading
        title="Education"
        doodle="/static/doodles/testimonials/yay.svg"
        doodleClassName="w-10 sm:w-12 -top-8 -right-8 absolute"
        subtitle="My academic path: from management studies to cyber security and network engineering."
      />
      <Education />
    </Page>
  );
}
