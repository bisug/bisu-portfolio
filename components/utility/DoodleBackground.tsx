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
    // Below the navbar on mobile so it doesn't clutter the logo.
    className: "top-[15%] sm:top-[6%] left-[3%] w-20 sm:w-28",
    rotate: "-10deg",
    float: "doodle-float-a",
  },
  {
    id: "squiggle-top-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "top-[12%] right-[6%] w-10 sm:w-14",
    rotate: "18deg",
    float: "doodle-float-b",
  },
  {
    id: "line-mid-left",
    src: "/static/doodles/lineBreak.svg",
    className: "hidden md:block top-[42%] left-[-3%] w-40",
    rotate: "82deg",
    float: "doodle-float-c",
  },
  {
    id: "code-bottom-right",
    src: "/static/doodles/hero/code.svg",
    className: "bottom-[10%] right-[5%] w-20 sm:w-24",
    rotate: "6deg",
    float: "doodle-float-b",
    delay: "-4s",
  },
  {
    id: "burst-bottom-left",
    src: "/static/doodles/testimonials/yay.svg",
    className: "hidden sm:block bottom-[16%] left-[7%] w-14",
    rotate: "150deg",
    float: "doodle-float-c",
    delay: "-7s",
  },
  {
    id: "squiggle-mid-right",
    src: "/static/doodles/testimonials/squiggle2.svg",
    className: "hidden sm:block top-[62%] right-[10%] w-12",
    rotate: "-25deg",
    float: "doodle-float-a",
    delay: "-2s",
  },
];

function DoodleBackground() {
  return (
    <div aria-hidden="true" className="doodle-bg">
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
  );
}

export default DoodleBackground;
