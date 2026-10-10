import Image from "next/image";

function More() {
  return (
    <a
      href="https://github.com/bisug"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 sm:px-5 sm:py-4 transition hover:-translate-y-0.5 hover:border-fun-accent/60 hover:shadow-xl hover:shadow-fun-accent/10 w-full text-left"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/static/icons/github.svg"
          width={24}
          height={24}
          alt=""
          aria-hidden="true"
          className="icon-accent-light opacity-70 transition group-hover:opacity-100"
        />
        <div>
          <h3 className="text-base font-bold transition-colors group-hover:text-fun-accent">
            More on GitHub
          </h3>
          <p className="text-xs sm:text-sm text-fun-gray-light">
            Experiments, forks &amp; works-in-progress
          </p>
        </div>
      </div>
      <span className="font-mono text-xs text-fun-accent flex items-center gap-1 group-hover:underline">
        github.com/bisug →
      </span>
    </a>
  );
}

export default More;
