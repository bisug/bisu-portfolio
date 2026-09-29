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
    className: "top-24 sm:top-20 left-2 sm:left-4 xl:-left-12 w-16 sm:w-24",
    rotate: "-10deg",
    float: "doodle-float-a",
  },
  {
    id: "squiggle-top-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "top-24 sm:top-20 right-2 sm:right-4 xl:-right-10 w-10 sm:w-14",
    rotate: "18deg",
    float: "doodle-float-b",
  },
  {
    id: "line-mid-left",
    src: "/static/doodles/lineBreak.svg",
    className: "hidden md:block top-[45%] -left-6 xl:-left-16 w-32 sm:w-40",
    rotate: "82deg",
    float: "doodle-float-c",
  },
  {
    id: "code-bottom-right",
    src: "/static/doodles/hero/code.svg",
    className: "bottom-10 right-2 sm:right-6 xl:-right-10 w-16 sm:w-20",
    rotate: "6deg",
    float: "doodle-float-b",
    delay: "-4s",
  },
  {
    id: "burst-bottom-left",
    src: "/static/doodles/testimonials/yay.svg",
    className: "hidden sm:block bottom-16 left-2 sm:left-6 xl:-left-8 w-12 sm:w-14",
    rotate: "150deg",
    float: "doodle-float-c",
    delay: "-7s",
  },
  {
    id: "squiggle-mid-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "hidden sm:block top-[58%] right-2 sm:right-4 xl:-right-12 w-10 sm:w-12",
    rotate: "-25deg",
    float: "doodle-float-a",
    delay: "-2s",
  },
];

function DoodleBackground() {
  return (
    <div aria-hidden="true" className="doodle-bg">
      <div className="relative w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto h-full px-4 sm:px-6 pointer-events-none">
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
