type HeadingProps = {
  tag?: string;
  /** One-line summary rendered under the heading; only used on tag pages. */
  subtitle?: string;
};

function Heading({ tag, subtitle }: HeadingProps) {
  return (
    <div
      className={`${tag ? "pt-10 pb-4 sm:pt-24 sm:pb-20" : "py-12 sm:py-20"} w-full text-center relative`}
    >
      {tag ? (
        <h1 className="text-3xl sm:text-4xl inline-block w-auto mx-auto mb-8 relative">
          Projects built with <b>{tag}</b>
          <img
            className="w-8 sm:w-10 -top-6 -right-2 sm:-right-8 sm:-top-8 absolute"
            src="/static/doodles/hero/code.svg"
            alt=""
          />
        </h1>
      ) : (
        <h1 className="text-4xl sm:text-6xl inline-block w-auto mx-auto mb-8 relative">
          Projects
          <img
            className="w-10 -top-8 -right-8 absolute"
            src="/static/doodles/hero/code.svg"
            alt=""
          />
        </h1>
      )}
      {tag ? (
        subtitle && (
          <p className="text-fun-gray text-base sm:text-lg max-w-3xl m-auto">{subtitle}</p>
        )
      ) : (
        <p className="text-fun-gray text-xl sm:text-2xl max-w-3xl m-auto">
          A selection of things I&apos;ve built — security tooling and CLIs, Telegram bots, and
          full-stack apps. Most of them started as an excuse to learn something new.
        </p>
      )}
    </div>
  );
}

export default Heading;
