import Image from "next/image";

function More() {
  return (
    <a
      href="https://github.com/bisug"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-[220px] flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line-strong bg-surface p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-surface-raised hover:shadow-xl hover:shadow-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div className="rounded-full bg-surface-raised p-3.5 group-hover:bg-accent/10 transition-colors">
        <Image
          src="/static/icons/github.svg"
          width={26}
          height={26}
          alt=""
          aria-hidden="true"
          className="icon-accent-light opacity-75 transition group-hover:opacity-100"
        />
      </div>
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
        More on GitHub
      </h3>
      <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[220px]">
        Experiments, forks, and works in progress
      </p>
    </a>
  );
}

export default More;
