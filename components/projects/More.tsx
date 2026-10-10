import Image from "next/image";

function More() {
  return (
    <a
      href="https://github.com/bisug"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center transition hover:-translate-y-1 hover:border-fun-accent/60 hover:shadow-xl hover:shadow-fun-accent/10"
    >
      <Image
        src="/static/icons/github.svg"
        width={24}
        height={24}
        alt=""
        aria-hidden="true"
        className="icon-accent-light opacity-70 transition group-hover:opacity-100"
      />
      <h3 className="text-base font-bold transition-colors group-hover:text-fun-accent">
        More on GitHub
      </h3>
      <p className="text-xs sm:text-sm text-fun-gray-light">
        Experiments, forks & works-in-progress
      </p>
    </a>
  );
}

export default More;
