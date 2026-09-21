import { testimonials } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col text-left max-w-md md:max-w-full w-full m-auto">
      <SectionTitle title="Why people love my work!" />
      <div className="max-w-5xl m-auto grid grid-cols-1 gap-10 md:grid-cols-3 items-start">
        {testimonials.map((item, index) => {
          return (
            <div
              key={item.name}
              className="relative bg-white/[0.02] border border-white/10 p-5 rounded-lg h-full flex flex-col justify-between"
            >
              {index === 0 && (
                <img
                  className="absolute -top-12 left-0 md:top-auto md:-bottom-12 md:left-auto md:-right-6 w-20 -z-10"
                  src="/static/doodles/testimonials/yay.svg"
                  alt=""
                />
              )}
              <p className="text-base italic relative">"{item.quote}"</p>
              <p className="mt-4 text-xs text-fun-gray">
                <b className="text-fun-accent font-mono font-medium">{item.name}</b> - {item.job}
              </p>
              {index === 2 && (
                <img
                  className="absolute -top-8 -right-4 w-11"
                  src="/static/doodles/testimonials/squiggle2.svg"
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Testimonials;
