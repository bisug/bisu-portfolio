import Image from "next/image";

function More() {
  return (
    <a
      href="https://github.com/bisug"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-fun-accent/60 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-fun-accent/10"
    >
      <div className="rounded-full bg-white/5 p-3.5 group-hover:bg-fun-accent/10 transition-colors">
        <Image
          src="/static/icons/github.svg"
          width={26}
          height={26}
          alt=""
          aria-hidden="true"
          className="icon-accent-light opacity-75 transition group-hover:opacity-100"
        />
      </div>
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white transition-colors group-hover:text-fun-accent">
        More on GitHub
      </h3>
      <p className="text-xs sm:text-sm text-fun-gray leading-relaxed max-w-[220px]">
        Experiments, forks, and works in progress
      </p>
    </a>
  );
}

export default More;
