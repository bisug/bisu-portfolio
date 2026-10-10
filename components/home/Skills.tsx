import Reveal from "@/components/utility/Reveal";
import { CATEGORY_ORDER, skills } from "@/data/content/home";
import FadeImage from "../utility/FadeImage";

function Skills() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 w-full pb-16">
      {CATEGORY_ORDER.map((category) => {
        const items = skills.filter((skill) => skill.category === category);
        return (
          <section
            key={category}
            aria-labelledby={`skill-category-${category}`}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <h2
                id={`skill-category-${category}`}
                className="font-mono text-xs sm:text-sm uppercase tracking-widest text-fun-accent font-semibold"
              >
                {category}
              </h2>
              <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
              {items.map((item, index) => {
                return (
                  <Reveal key={item.title} delay={(index % 6) * 40} className="h-full">
                    <div
                      title={item.title}
                      className="group flex h-full flex-col items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:py-4 sm:px-3 transition-all duration-200 hover:-translate-y-1 hover:border-fun-accent/50 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-fun-accent/10"
                    >
                      <FadeImage
                        src={item.icon}
                        alt={`${item.title} icon`}
                        width={36}
                        height={36}
                        className={`${item.mono ? "icon-invert-light " : ""}${item.invertDark ? "icon-invert-dark " : ""}h-8 w-8 sm:h-9 sm:w-9 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                      />
                      <p className="text-xs text-fun-gray-light font-semibold group-hover:text-white transition-colors text-center truncate max-w-full">
                        {item.title}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Skills;
