import Reveal from "@/components/utility/Reveal";
import { education } from "@/data/content/home";
import FadeImage from "../utility/FadeImage";

function Education() {
  return (
    <div className="max-w-4xl mx-auto w-full pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {education.map((item, index) => {
          const Card = (
            <div className="h-full flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fun-accent/60 hover:shadow-xl hover:shadow-fun-accent/10">
              {item.logo && (
                <div className="shrink-0 rounded-xl bg-[#ffffff] p-2.5 self-start shadow-sm">
                  <FadeImage
                    src={item.logo}
                    alt={`${item.school} logo`}
                    width={320}
                    height={120}
                    className="h-12 sm:h-14 w-auto max-w-[120px] object-contain"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold tracking-tight leading-snug text-white">
                  {item.degree}
                </h2>
                <p className="text-fun-accent text-sm mt-1 flex items-center gap-1.5 font-medium">
                  {item.school}
                  {item.link && (
                    <img
                      src="/static/icons/external-link.svg"
                      width={14}
                      height={14}
                      alt=""
                      aria-hidden="true"
                      className="icon-accent-light opacity-70 shrink-0"
                    />
                  )}
                </p>
                <p className="text-fun-gray text-xs font-mono mt-1 tracking-wide">{item.period}</p>
                {item.desc && (
                  <p className="text-fun-gray text-xs sm:text-sm mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          );
          return (
            <Reveal key={item.school} delay={index * 100} className="h-full">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus-visible:outline-none"
                >
                  {Card}
                </a>
              ) : (
                Card
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default Education;
