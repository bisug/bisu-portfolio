import Link from "next/link";

function Hero() {
  return (
    <div className="relative w-full m-auto flex justify-center text-center flex-col items-center pt-16 pb-24 sm:pt-20 sm:pb-28">
      <p className="text-sm sm:text-base font-mono text-fun-accent mb-4 tracking-wide">
        Hey, I&apos;m Bisu Ghalan —
      </p>
      <h1 className="max-w-2xl lg:max-w-4xl w-auto text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6 font-bold text-balance">
        I enjoy <span className="text-fun-accent">building</span> and{" "}
        <span className="text-fun-accent">securing</span> for the web.
      </h1>
      <p className="max-w-xl text-fun-gray text-base sm:text-lg mb-10">
        CS student &amp; security researcher from Nepal. I build Telegram bots, CLIs, and full-stack
        apps — and I break things to learn how to defend them.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/projects"
          className="font-bold whitespace-nowrap px-8 py-3.5 text-base rounded-full text-fun-navy-darkest bg-fun-accent hover:brightness-110 hover:-translate-y-0.5 transition shadow-lg shadow-fun-accent/25"
        >
          See featured work
        </Link>
        <a
          href="mailto:bisu.ghlan@gmail.com"
          className="font-bold whitespace-nowrap px-8 py-3.5 text-base rounded-full text-fun-gray-light border border-white/20 hover:border-fun-accent hover:text-white transition"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}

export default Hero;
