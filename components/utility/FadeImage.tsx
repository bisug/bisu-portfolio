import { useState } from "react";

type FadeImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  srcSet?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  /** Classes for the shimmer wrapper. Defaults to shrink-to-fit; callers
      that need it to fill a frame (card thumbs, hero) pass their own. */
  shellClassName?: string;
};

/* Image with a shimmer shell behind it and an opacity fade on load.
   No layout shift: callers must pass width/height (already the case). */
function FadeImage({
  src,
  alt,
  width,
  height,
  className = "",
  shellClassName = "inline-block align-middle",
  srcSet,
  sizes,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  style,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`img-shell ${shellClassName}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        style={style}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? "img-loaded" : "img-loading"}`}
      />
    </div>
  );
}

export default FadeImage;
