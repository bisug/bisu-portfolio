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
  doodleClassName = "w-10 -top-8 -right-8 absolute",
  as: Component = "h1",
  className = "py-12 sm:py-20",
  titleClassName = "text-4xl sm:text-6xl inline-block w-auto mx-auto mb-6 sm:mb-8 relative font-bold tracking-tight",
  subtitleClassName = "text-fun-gray text-base sm:text-lg md:text-xl max-w-3xl md:max-w-4xl m-auto leading-relaxed",
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
