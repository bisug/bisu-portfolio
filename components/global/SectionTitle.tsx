type SectionTitleProps = {
  title: string;
  /** Sections that are the whole page pass "h1"; nested sections stay "h2". */
  as?: "h1" | "h2";
};

function SectionTitle({ title, as: Heading = "h2" }: SectionTitleProps) {
  return (
    <div className="w-full">
      <p className="font-mono text-sm text-fun-accent mb-2" aria-hidden="true">
        {"//"}
      </p>
      <Heading className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">{title}</Heading>
    </div>
  );
}

export default SectionTitle;
