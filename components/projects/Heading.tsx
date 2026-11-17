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
        titleClassName="heading-h2 inline-block w-auto mx-auto mb-5 sm:mb-7 relative leading-[1.1]"
        title={
          <>
            Projects built with <span className="text-accent">{tag}</span>
          </>
        }
        doodle="/static/doodles/hero/code.svg"
        doodleClassName="w-8 sm:w-10 -top-6 -right-4 sm:-top-8 sm:-right-8 absolute select-none pointer-events-none"
        subtitle={subtitle}
        subtitleClassName="lead max-w-2xl md:max-w-3xl m-auto"
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
          <strong className="text-white font-medium">security tooling</strong>{" "}
          and <strong className="text-white font-medium">CLIs</strong>,{" "}
          <strong className="text-white font-medium">Telegram bots</strong>, and{" "}
          <strong className="text-white font-medium">full-stack apps</strong>.
          Most of them started as an excuse to learn something new.
        </>
      }
      subtitleClassName="lead max-w-2xl md:max-w-3xl m-auto"
    />
  );
}

export default Heading;
