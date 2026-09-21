import { education } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Education() {
  return (
    <div className="flex flex-col text-left justify-between relative">
      <SectionTitle title="Where I studied." />
      <div className="max-w-3xl w-full space-y-8">
        {education.map((item) => (
          <div
            key={item.school}
            className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6"
          >
            <p className="text-fun-gray text-sm font-mono whitespace-nowrap sm:w-32 shrink-0 pt-1">
              {item.period}
            </p>
            <div>
              <h3 className="text-lg font-bold">{item.degree}</h3>
              <div className="flex items-center gap-3 mt-1">
                {item.logo && (
                  <img src={item.logo} alt={`${item.school} logo`} className="h-10 w-auto" />
                )}
                <p className="text-fun-pink text-sm">{item.school}</p>
              </div>
              {item.desc && <p className="text-fun-gray text-sm mt-1">{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
