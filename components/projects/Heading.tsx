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
        className="pt-10 pb-4 sm:pt-24 sm:pb-20"
        titleClassName="text-3xl sm:text-4xl inline-block w-auto mx-auto mb-8 relative font-bold"
        title={
          <>
            Projects built with <b>{tag}</b>
          </>
        }
        doodle="/static/doodles/hero/code.svg"
        doodleClassName="w-8 sm:w-10 -top-6 -right-2 sm:-right-8 sm:-top-8 absolute"
        subtitle={subtitle}
        subtitleClassName="text-fun-gray text-base sm:text-lg max-w-3xl md:max-w-4xl lg:max-w-5xl m-auto"
      />
    );
  }

  return (
    <PageHeading
      title="Projects"
      doodle="/static/doodles/hero/code.svg"
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
      subtitleClassName="text-fun-gray text-xl sm:text-2xl max-w-3xl md:max-w-4xl lg:max-w-5xl m-auto"
    />
  );
}

export default Heading;
