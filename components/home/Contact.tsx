import { useState } from "react";
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
          className="font-bold text-sm text-fun-accent underline decoration-fun-accent/40 underline-offset-4 transition hover:decoration-fun-accent"
        >
          Say hello
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="font-mono text-xs text-fun-gray transition-colors hover:text-white"
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block cursor-pointer font-bold whitespace-nowrap px-10 py-4 rounded-full text-fun-navy-darkest bg-fun-accent hover:brightness-110 hover:-translate-y-0.5 transition shadow-lg shadow-fun-accent/25"
        >
          Say hello
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="font-mono text-xs px-5 py-2.5 rounded-full border border-white/20 text-fun-gray-light hover:border-fun-accent hover:text-white transition"
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
      <section aria-labelledby="contact-heading" className="w-full pt-8 pb-2 text-center">
        <h2 id="contact-heading" className="text-lg font-bold tracking-tight mb-4">
          Let&apos;s connect
        </h2>
        <ContactActions small />
      </section>
    );
  }

  return (
    <section aria-labelledby="contact-heading" className="relative w-full pt-24 pb-28 text-center">
      <img className="w-30 m-auto mb-6 opacity-80" src="/static/doodles/lineBreak.svg" alt="" />
      <p className="font-mono text-sm text-fun-accent mb-3">Get in touch</p>
      <h1
        id="contact-heading"
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
      >
        Let&apos;s connect
      </h1>
      <p className="text-fun-gray max-w-md mx-auto mb-2 text-sm sm:text-base">
        I&apos;m always open to discussing new projects, creative ideas, or new opportunities.
      </p>
      <p className="font-mono text-xs text-fun-gray mb-10">
        Bhaktapur, Nepal · usually replies within a few days
      </p>
      <ContactActions />
    </section>
  );
}

export default Contact;
