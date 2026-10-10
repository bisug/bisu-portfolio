import PageHeading from "@/components/global/PageHeading";

type HeadingProps = {
  tag?: string;
  /** One-line summary rendered under the heading; only used on tag pages. */
  subtitle?: string;
};

function Heading({ tag, subtitle }: HeadingProps) {
  if (tag) {
    return (
      <PageHeading
        className="py-10 sm:py-16 md:py-20"
        titleClassName="text-2xl sm:text-4xl md:text-5xl inline-block w-auto mx-auto mb-5 sm:mb-7 relative font-bold tracking-tight text-balance leading-[1.1]"
        title={
          <>
            Projects built with <span className="text-fun-accent">{tag}</span>
          </>
        }
        doodle="/static/doodles/hero/code.svg"
        doodleClassName="w-8 sm:w-10 -top-6 -right-4 sm:-top-8 sm:-right-8 absolute select-none pointer-events-none"
        subtitle={subtitle}
        subtitleClassName="text-fun-gray text-base sm:text-lg max-w-2xl md:max-w-3xl m-auto leading-relaxed text-balance"
      />
    );
  }

  return (
    <PageHeading
      title="Projects"
      doodle="/static/doodles/hero/code.svg"
      doodleClassName="w-8 sm:w-10 -top-6 -right-4 sm:-top-8 sm:-right-8 absolute select-none pointer-events-none"
      subtitle={
        <>
          A selection of things I&apos;ve built:{" "}
          <strong className="text-white font-medium">security tooling</strong> and{" "}
          <strong className="text-white font-medium">CLIs</strong>,{" "}
          <strong className="text-white font-medium">Telegram bots</strong>, and{" "}
          <strong className="text-white font-medium">full-stack apps</strong>. Most of them started
          as an excuse to learn something new.
        </>
      }
      subtitleClassName="text-fun-gray text-base sm:text-lg md:text-xl max-w-2xl md:max-w-3xl m-auto leading-relaxed text-balance"
    />
  );
}

export default Heading;
