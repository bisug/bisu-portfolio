import { experience } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Experience() {
  return (
    <div className="flex flex-col text-left justify-between relative">
      <SectionTitle title="Where I've worked." />
      <div className="max-w-3xl w-full space-y-4">
        {experience.map((item) => (
          <div
            key={item.org}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition hover:border-fun-accent/60"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base sm:text-lg font-bold">
                {item.role} <span className="text-fun-accent">@ {item.org}</span>
              </h3>
              <p className="text-fun-gray text-xs font-mono whitespace-nowrap shrink-0">
                {item.period}
              </p>
            </div>
            <p className="text-fun-gray text-sm mt-1.5 leading-relaxed">{item.desc}</p>
            <ul className="flex flex-wrap items-center mt-3 gap-1.5 list-none">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-fun-navy px-2 py-1 text-xs text-fun-gray-light"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
