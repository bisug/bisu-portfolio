import { useState } from "react";
import { faqs } from "@/data/content/faq";
import SocialIcons from "../global/SocialIcons";

const EMAIL = "bisu.ghlan@gmail.com";

function ContactActions({ small = false }: { small?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (small) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${EMAIL}`}
          className="font-bold text-sm text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          Say hello
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="font-mono text-xs text-faint transition-colors hover:text-ink"
          aria-live="polite"
        >
          {copied ? "Copied!" : "Copy email"}
        </button>
        <SocialIcons />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full">
        <a
          href={`mailto:${EMAIL}`}
          className="btn btn-primary w-full sm:w-auto text-base whitespace-nowrap shadow-lg shadow-accent/20"
        >
          Say hello
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="btn btn-outline w-full sm:w-auto font-mono text-xs sm:text-sm"
          aria-live="polite"
        >
          {copied ? "Copied!" : "Copy email"}
        </button>
      </div>
      <div className="mt-6">
        <SocialIcons />
      </div>
    </>
  );
}

function Contact({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section
        aria-labelledby="contact-heading"
        className="w-full pt-8 pb-4 text-center"
      >
        <h2 id="contact-heading" className="heading-h3 mb-4">
          Let&apos;s connect
        </h2>
        <ContactActions small />
      </section>
    );
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative w-full pt-20 pb-28 text-center"
    >
      <img
        className="w-30 m-auto mb-6 opacity-80"
        src="/static/doodles/lineBreak.svg"
        alt=""
      />
      <p className="font-mono text-sm text-fun-accent mb-3 font-medium">
        Get in touch
      </p>
      <h1 id="contact-heading" className="heading-h1 mb-4">
        Let&apos;s connect
      </h1>
      <p className="lead max-w-md mx-auto mb-2">
        I&apos;m always open to discussing{" "}
        <strong className="text-ink font-medium">new projects</strong>,{" "}
        <strong className="text-ink font-medium">creative ideas</strong>, or{" "}
        <strong className="text-ink font-medium">new opportunities</strong>.
      </p>
      <p className="font-mono text-xs text-faint mb-10">
        <strong className="text-ink font-medium">Bhaktapur, Nepal</strong> ·
        usually replies within a few days
      </p>
      <ContactActions />

      <div className="mt-20 max-w-3xl mx-auto text-left">
        <h2 className="heading-h2 mb-2 text-center">
          Frequently asked questions
        </h2>
        <p className="text-center text-xs sm:text-sm text-faint mb-8">
          Click any question to view details.
        </p>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-line py-4 transition-colors duration-300 hover:border-accent/50 open:border-accent/60"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-control">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-fun-accent transition-transform duration-200 group-open:rotate-180"
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="mt-3 pt-3 border-t border-line text-sm leading-relaxed text-muted">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
