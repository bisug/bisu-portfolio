import { skills } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Skills() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
      <div className="lg:max-w-sm lg:shrink-0">
        <SectionTitle title="My toolbelt for success." />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          The languages, frameworks, and tools I reach for when building and securing things.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {skills.map((item) => {
          return (
            <div
              title={item.title}
              key={item.title}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-4 transition hover:-translate-y-1 hover:border-fun-pink/60"
            >
              <img src={item.icon} style={item.style} alt="" className="h-9 w-9 object-contain" />
              <p className="text-xs text-fun-gray font-semibold">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
