import Link from "next/link";

function Hero() {
  return (
    <div className="hero-section relative w-full m-auto flex justify-center text-center flex-col items-center pt-10 pb-14 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
      <p
        className="rise-in text-sm sm:text-base font-mono text-fun-accent mb-4 tracking-wide font-medium"
        style={{ animationDelay: "0ms" }}
      >
        Hey, I&apos;m Bisu Ghalan
      </p>
      <h1
        className="rise-in max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-auto text-4xl sm:text-6xl md:text-7xl tracking-tight mb-6 font-bold text-balance leading-[1.08]"
        style={{ animationDelay: "90ms" }}
      >
        I enjoy <span className="text-fun-accent">building</span> and{" "}
        <span className="text-fun-accent">securing</span> for the web.
      </h1>
      <p
        className="rise-in max-w-xl md:max-w-2xl lg:max-w-3xl text-fun-gray text-base sm:text-lg mb-10 leading-relaxed text-balance"
        style={{ animationDelay: "180ms" }}
      >
        CS student &amp; security researcher from Nepal. I build{" "}
        <strong className="text-white font-medium">Telegram bots</strong>,{" "}
        <strong className="text-white font-medium">CLIs</strong>, and{" "}
        <strong className="text-white font-medium">full-stack apps</strong>, and I break things to
        learn how to defend them.
      </p>
      <div
        className="rise-in flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        style={{ animationDelay: "270ms" }}
      >
        <Link
          href="/projects"
          className="w-full sm:w-auto text-center font-bold whitespace-nowrap px-8 py-3.5 text-base rounded-full text-fun-navy-darkest bg-fun-accent hover:brightness-110 hover:-translate-y-0.5 transition shadow-lg shadow-fun-accent/25"
        >
          See featured work
        </Link>
        <a
          href="mailto:bisu.ghlan@gmail.com"
          className="w-full sm:w-auto text-center font-bold whitespace-nowrap px-8 py-3.5 text-base rounded-full text-fun-gray-light border border-white/20 hover:border-fun-accent hover:text-white transition"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}

export default Hero;
