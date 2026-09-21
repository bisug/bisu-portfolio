type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="w-full">
      <p className="font-mono text-sm text-fun-accent mb-2" aria-hidden="true">
        {"//"}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">{title}</h2>
    </div>
  );
}

export default SectionTitle;
