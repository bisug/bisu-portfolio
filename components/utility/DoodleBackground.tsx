type Doodle = {
  id: string;
  src: string;
  /** Position + size utilities for the wrapper. */
  className: string;
  rotate: string;
  float: string;
  delay?: string;
};

const DOODLES: Doodle[] = [
  {
    id: "burst-top-left",
    src: "/static/doodles/testimonials/yay.svg",
    // Positioned below the navbar so it never overlaps the logo
    className: "top-24 sm:top-28 left-3 sm:left-8 xl:left-14 w-14 sm:w-20 xl:w-24",
    rotate: "-10deg",
    float: "doodle-float-a",
  },
  {
    id: "squiggle-top-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "top-24 sm:top-28 right-3 sm:right-8 xl:right-14 w-9 sm:w-12 xl:w-14",
    rotate: "18deg",
    float: "doodle-float-b",
  },
  {
    id: "line-mid-left",
    src: "/static/doodles/lineBreak.svg",
    className: "hidden md:block top-[45%] left-2 sm:left-6 xl:left-10 w-28 sm:w-36 xl:w-44",
    rotate: "82deg",
    float: "doodle-float-c",
  },
  {
    id: "code-bottom-right",
    src: "/static/doodles/hero/code.svg",
    className: "bottom-10 right-3 sm:right-8 xl:right-14 w-14 sm:w-18 xl:w-20",
    rotate: "6deg",
    float: "doodle-float-b",
    delay: "-4s",
  },
  {
    id: "burst-bottom-left",
    src: "/static/doodles/testimonials/yay.svg",
    className: "hidden sm:block bottom-16 left-3 sm:left-8 xl:left-14 w-10 sm:w-12 xl:w-14",
    rotate: "150deg",
    float: "doodle-float-c",
    delay: "-7s",
  },
  {
    id: "squiggle-mid-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "hidden sm:block top-[58%] right-3 sm:right-8 xl:right-14 w-9 sm:w-11 xl:w-12",
    rotate: "-25deg",
    float: "doodle-float-a",
    delay: "-2s",
  },
];

function DoodleBackground() {
  return (
    <div aria-hidden="true" className="doodle-bg">
      <div className="relative w-full h-full pointer-events-none">
        {DOODLES.map((doodle) => (
          <div
            key={doodle.id}
            className={`doodle ${doodle.className}`}
            style={{ rotate: doodle.rotate }}
          >
            <img
              src={doodle.src}
              alt=""
              decoding="async"
              // Decorative background: never let it compete with text or fonts.
              fetchPriority="low"
              className={doodle.float}
              style={doodle.delay ? { animationDelay: doodle.delay } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoodleBackground;
