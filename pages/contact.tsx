import Contact from "@/components/home/Contact";
import Page from "@/components/utility/Page";
import Reveal from "@/components/utility/Reveal";

// Q&As must match the on-page Contact content — answer engines quote
// structured data only when the visible page supports it.
const faqSchema = [
  {
    "@type": "FAQPage",
    "@id": "https://bisu.com.np/contact#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I contact Bisu Ghalan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email bisu.ghlan@gmail.com or reach out on GitHub (@bisug), LinkedIn (in/bisug), or Instagram (@oyeee.bisu).",
        },
      },
      {
        "@type": "Question",
        name: "Where is Bisu Ghalan based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bhaktapur, Nepal (UTC+5:45), studying at Lincoln International College in Kathmandu.",
        },
      },
      {
        "@type": "Question",
        name: "Is Bisu Ghalan available for internships or freelance work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. He is open to internships, freelance projects, and security-related work, especially Telegram bots, command-line tools, and full-stack web apps.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Bisu Ghalan use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Primarily Python, TypeScript, Rust, and Go, with FastAPI, React, Next.js, MongoDB, PostgreSQL, and Redis.",
        },
      },
    ],
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
