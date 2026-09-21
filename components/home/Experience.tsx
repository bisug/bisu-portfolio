import { experience } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Experience() {
  return (
    <div className="flex flex-col text-left justify-between relative">
      <SectionTitle title="Where I've worked." />
      <div className="max-w-3xl w-full space-y-8">
        {experience.map((item) => (
          <div key={item.org} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
            <p className="text-fun-gray text-sm font-mono whitespace-nowrap sm:w-32 shrink-0 pt-1">
              {item.period}
            </p>
            <div>
              <h3 className="text-lg font-bold">
                {item.role} <span className="text-fun-pink">@ {item.org}</span>
              </h3>
              <p className="text-fun-gray text-sm mt-1">{item.desc}</p>
              <ul className="flex flex-wrap items-center mt-2 -ml-1 list-none">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="m-1 rounded-lg text-xs bg-fun-pink-dark py-1 px-2 text-fun-gray-light"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
