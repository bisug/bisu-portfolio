import Contact from "@/components/home/Contact";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

export default function ContactPage() {
  return (
    <Page
      currentPage="Contact"
      path="/contact"
      meta={{
        title: "Contact",
        desc: "Get in touch — I'm always open to discussing new projects, creative ideas, or new opportunities.",
      }}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Contact />
      </Reveal>
    </Page>
  );
}
