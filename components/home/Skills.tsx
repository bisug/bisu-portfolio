import Reveal from "@/components/utility/Reveal";
import { CATEGORY_ORDER, skills } from "@/data/content/home";
import FadeImage from "../utility/FadeImage";
import SectionTitle from "../global/SectionTitle";

function Skills() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
      <div className="lg:max-w-sm lg:shrink-0">
        <SectionTitle title="My toolbelt for success." as="h1" />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          The languages, frameworks, and tools I reach for when building and securing things.
        </p>
      </div>
      <div className="flex-1 w-full space-y-10">
        {CATEGORY_ORDER.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          return (
            <div key={category}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-fun-gray mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                {items.map((item, index) => {
                  return (
                    <Reveal key={item.title} delay={(index % 5) * 50} className="h-full">
                      <div
                        title={item.title}
                        className="group flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-4 transition hover:-translate-y-1 hover:border-fun-accent/60"
                      >
                        <FadeImage
                          src={item.icon}
                          style={item.style}
                          alt={`${item.title} icon`}
                          width={36}
                          height={36}
                          className={`${item.mono ? "icon-invert-light " : ""}h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                        />
                        <p className="text-xs text-fun-gray font-semibold">{item.title}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
