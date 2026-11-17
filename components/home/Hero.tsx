import Link from "next/link";

function Hero() {
  return (
    <div className="hero-section relative w-full m-auto flex justify-center text-center flex-col items-center pt-10 pb-14 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
      <p
        className="rise-in font-mono text-sm sm:text-base text-muted mb-4 tracking-wide font-medium"
        style={{ animationDelay: "0ms" }}
      >
        Hey, I&apos;m Bisu Ghalan
      </p>
      <h1
        className="rise-in heading-display max-w-4xl mb-6 leading-[1.06]"
        style={{ animationDelay: "90ms" }}
      >
        I build tools that <span className="text-accent">break things</span>,
        then fix them.
      </h1>
      <p
        className="rise-in lead max-w-2xl mb-10"
        style={{ animationDelay: "180ms" }}
      >
        CS student and security researcher from Nepal. I build CLI tools, crypto
        libraries, and web apps.
      </p>
      <div
        className="rise-in flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        style={{ animationDelay: "270ms" }}
      >
        <Link
          href="/projects"
          className="btn btn-primary w-full sm:w-auto text-base whitespace-nowrap shadow-lg shadow-accent/20"
        >
          View projects
        </Link>
        <a
          href="mailto:bisu.ghlan@gmail.com"
          className="btn btn-outline w-full sm:w-auto text-base whitespace-nowrap"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}

export default Hero;
