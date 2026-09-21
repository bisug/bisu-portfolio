import { testimonials } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col text-left max-w-md md:max-w-full w-full m-auto">
      <SectionTitle title="Why people love my work!" />
      <div className="max-w-5xl m-auto md:max-h-[200px] grid grid-cols-1 gap-10 md:gap-10 md:grid-cols-3 items-start">
        {testimonials.map((item, index) => {
          return (
            <div
              key={item.name}
              className="relative bg-fun-navy-dark border border-fun-accent-dark p-5 rounded-lg h-full flex flex-col justify-between"
            >
              {index === 0 && (
                <img
                  className="sqD top-[-50px] left-0 bottom-auto right-auto md:bottom-[-50px] md:top-auto md:right-[-25px] md:left-auto w-20 z-[-100]"
                  src="/static/doodles/testimonials/yay.svg"
                  alt=""
                />
              )}
              <p className="text-base italic relative">"{item.quote}"</p>
              <p className="mt-4 text-xs text-fun-gray">
                <b className="text-fun-accent font-mono">{item.name}</b> - {item.job}
              </p>
              {index === 2 && (
                <img
                  className="sqD top-[-30px] right-[-15px] w-11"
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
