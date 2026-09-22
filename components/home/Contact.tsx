import SocialIcons from "../global/SocialIcons";

function Contact() {
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
      <p className="text-fun-gray max-w-md mx-auto mb-10 text-sm sm:text-base">
        I&apos;m always open to discussing new projects, creative ideas, or new opportunities.
      </p>
      <a
        href="mailto:bisu.ghlan@gmail.com"
        className="inline-block cursor-pointer font-bold whitespace-nowrap px-10 py-4 rounded-full text-fun-navy-darkest bg-fun-accent hover:brightness-110 hover:-translate-y-0.5 transition shadow-lg shadow-fun-accent/25"
      >
        Say hello
      </a>
      <p className="mt-6 font-mono text-xs text-fun-gray">
        <a href="mailto:bisu.ghlan@gmail.com" className="transition-colors hover:text-white">
          bisu.ghlan@gmail.com
        </a>
      </p>
      <div className="mt-6">
        <SocialIcons />
      </div>
    </section>
  );
}

export default Contact;
