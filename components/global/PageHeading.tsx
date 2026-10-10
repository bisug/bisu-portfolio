import type { ReactNode } from "react";

type PageHeadingProps = {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  doodle?: string;
  doodleAlt?: string;
  doodleClassName?: string;
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

function PageHeading({
  title,
  subtitle,
  doodle,
  doodleAlt = "",
  doodleClassName = "w-8 sm:w-10 -top-6 -right-4 sm:-top-8 sm:-right-8 absolute select-none pointer-events-none",
  as: Component = "h1",
  className = "py-10 sm:py-16 md:py-20",
  titleClassName = "text-3xl sm:text-5xl md:text-6xl inline-block w-auto mx-auto mb-5 sm:mb-7 relative font-bold tracking-tight text-balance leading-[1.1]",
  subtitleClassName = "text-fun-gray text-base sm:text-lg md:text-xl max-w-2xl md:max-w-3xl m-auto leading-relaxed text-balance",
}: PageHeadingProps) {
  return (
    <div className={`w-full text-center relative ${className}`}>
      <Component className={titleClassName}>
        {title}
        {doodle && (
          <img className={doodleClassName} src={doodle} alt={doodleAlt} aria-hidden="true" />
        )}
      </Component>
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </div>
  );
}

export default PageHeading;
