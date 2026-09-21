import { education } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Education() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
      <div className="lg:max-w-sm lg:shrink-0">
        <SectionTitle title="Where I studied." as="h1" />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          My academic path — from management studies to cyber security.
        </p>
      </div>
      <div className="flex-1 w-full space-y-4">
        {education.map((item) => {
          const Card = (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition hover:-translate-y-1 hover:border-fun-accent/60">
              {item.logo && (
                // Literal #fff, not bg-white: --color-white is theme-flipped, logos need a real white backdrop.
                <div className="shrink-0 rounded-lg bg-[#ffffff] p-2">
                  <img
                    src={item.logo}
                    alt={`${item.school} logo`}
                    className="h-12 sm:h-14 w-auto max-w-[120px] object-contain"
                  />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold leading-snug">{item.degree}</h3>
                <p className="text-fun-accent text-sm mt-0.5 flex items-center gap-1.5">
                  {item.school}
                  {item.link && (
                    <img
                      src="/static/icons/external-link.svg"
                      width={14}
                      height={14}
                      alt=""
                      className="opacity-70"
                    />
                  )}
                </p>
                <p className="text-fun-gray text-xs font-mono mt-1">{item.period}</p>
                {item.desc && <p className="text-fun-gray text-sm mt-1.5">{item.desc}</p>}
              </div>
            </div>
          );
          return (
            <div key={item.school}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener" className="block">
                  {Card}
                </a>
              ) : (
                Card
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Education;
