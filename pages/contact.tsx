import Contact from "@/components/home/Contact";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";
import { contactFaqs } from "@/data/content/home";

// Q&As must match the on-page Contact content — answer engines quote
// structured data only when the visible page supports it.
const faqSchema = [
  {
    "@type": "FAQPage",
    "@id": "https://bisu.com.np/contact#faq",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function ContactPage() {
  return (
    <Page
      currentPage="Contact"
      path="/contact"
      meta={{
        title: "Contact",
        desc: "Get in touch — I'm always open to discussing new projects, creative ideas, or new opportunities.",
      }}
      schema={faqSchema}
    >
      <Reveal className="mt-16 sm:mt-20 w-full">
        <Contact />
      </Reveal>
    </Page>
  );
}
